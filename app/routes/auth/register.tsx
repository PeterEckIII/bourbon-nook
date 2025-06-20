import { data, redirect, useActionData } from 'react-router';
import type { Route } from './+types/register';
import { createUserSession, getUserId } from '~/utils/session';
import { createUser, getUserByEmail, getUserByUsername } from '~/models/user';
import { validateEmail } from '~/utils/utils';
import { useEffect, useRef } from 'react';
import RegisterForm from '~/components/Forms/RegisterForm';

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const redirectTo = searchParams.get('redirectTo') || '/bottles';
  const userId = await getUserId(request);
  if (userId) {
    redirect('/');
  }
  return { redirectTo };
}

type ActionData = {
  errors: {
    username: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  };
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const remember = formData.get('remember') as string;
  const redirectTo = formData.get('redirectTo') as string;

  if (!validateEmail(email) || !email || typeof email !== 'string') {
    return data<ActionData>({
      errors: {
        username: null,
        email: 'Please enter a valid email',
        password: null,
        confirmPassword: null,
      },
    });
  }

  if (!username || typeof username !== 'string') {
    return data<ActionData>({
      errors: {
        username: 'Please enter a valid username',
        email: null,
        password: null,
        confirmPassword: null,
      },
    });
  }

  if (!password || typeof password !== 'string') {
    return data<ActionData>({
      errors: {
        username: null,
        email: null,
        password: 'Please enter a valid password',
        confirmPassword: null,
      },
    });
  }

  if (!confirmPassword || typeof confirmPassword !== 'string') {
    return data<ActionData>({
      errors: {
        username: null,
        email: null,
        password: null,
        confirmPassword: 'Please enter a valid password',
      },
    });
  }

  if (password !== confirmPassword) {
    return data<ActionData>({
      errors: {
        username: null,
        email: null,
        password: 'This does not match the confirm password input',
        confirmPassword: 'This does not match the password input',
      },
    });
  }

  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return data<ActionData>({
      errors: {
        username: null,
        email: 'That email address is already registered',
        password: null,
        confirmPassword: null,
      },
    });
  }

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return data<ActionData>({
      errors: {
        username: 'That username is already taken. Please try another.',
        email: null,
        password: null,
        confirmPassword: null,
      },
    });
  }
  const newUser = await createUser(email, username, password);

  return createUserSession({
    redirectTo,
    remember: remember === 'on' ? true : false,
    request,
    userId: newUser.id,
  });
}

export default function Register({ loaderData }: Route.ComponentProps) {
  const { redirectTo } = loaderData;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    } else if (actionData?.errors?.confirmPassword) {
      confirmPasswordRef.current?.focus();
    }
  }, []);

  return (
    <RegisterForm
      emailError={actionData?.errors.email}
      emailRef={emailRef}
      usernameError={actionData?.errors.username}
      usernameRef={usernameRef}
      passwordError={actionData?.errors.password}
      passwordRef={passwordRef}
      confirmPasswordError={actionData?.errors.confirmPassword}
      confirmPasswordRef={confirmPasswordRef}
      redirectTo={redirectTo}
    />
  );
}
