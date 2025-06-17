import { data, redirect, useActionData } from 'react-router';
import type { Route } from './+types/login';
import {
  createUserSession,
  getUserId,
  verifyCredentials,
} from '~/utils/session';
import { useEffect, useRef } from 'react';
import LoginForm from '~/components/Forms/LoginForm';

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const redirectTo = searchParams.get('redirectTo') || '/';
  const userId = await getUserId(request);
  if (userId) {
    return redirect('/');
  }
  return { redirectTo };
}

type ActionData = {
  errors: {
    username: string | null;
    password: string | null;
  };
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = String(formData.get('username'));
  const password = String(formData.get('password'));
  const remember = String(formData.get('remember'));
  const redirectTo = String(formData.get('redirectTo'));

  if (!username || typeof username !== 'string') {
    return data<ActionData>({
      errors: { username: 'Please enter a valid username', password: null },
    });
  }

  if (!password || typeof password !== 'string') {
    return data<ActionData>({
      errors: { username: null, password: 'Please enter a valid password' },
    });
  }

  const user = await verifyCredentials(username, password);

  if (!user) {
    return data<ActionData>({
      errors: { username: null, password: 'Invalid credentials' },
    });
  }

  return createUserSession({
    redirectTo,
    remember: remember === 'on' ? true : false,
    request,
    userId: user.id,
  });
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const { redirectTo } = loaderData;
  const actionData = useActionData<ActionData>();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors.password) {
      passwordRef.current?.focus();
    }
  }, []);

  return (
    <LoginForm
      usernameError={actionData?.errors.username}
      passwordError={actionData?.errors.password}
      redirectTo={redirectTo}
      usernameRef={usernameRef}
      passwordRef={passwordRef}
    />
  );
}
