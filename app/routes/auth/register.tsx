import { Form, redirect } from 'react-router';
import type { Route } from './+types/register';
import { createUserSession, getUserId } from '~/utils/session';
import { createUser, getUserByEmail, getUserByUsername } from '~/models/user';
import { validateEmail } from '~/utils/utils';

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const redirectTo = searchParams.get('redirectTo') || '/bottles';
  const userId = await getUserId(request);
  if (userId) {
    redirect('/');
  }
  return { redirectTo };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const remember = formData.get('remember') as string;
  const redirectTo = formData.get('redirectTo') as string;

  if (!validateEmail(email) || !email || typeof email !== 'string') {
    throw new Error('Invalid email address');
  }

  if (!username || typeof username !== 'string') {
    throw new Error('Invalid username');
  }

  if (!password || typeof password !== 'string') {
    throw new Error('Invalid password');
  }

  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    throw new Error('There is already an account with that email address');
  }

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    throw new Error('That username is already taken');
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
  return (
    <Form method="post">
      <input
        type="hidden"
        name="redirectTo"
        id="redirectTo"
        value={redirectTo}
      />
      <input type="email" name="email" id="email" placeholder="Email" />
      <input
        type="username"
        name="username"
        id="username"
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      Remember?
      <input type="checkbox" name="remember" id="remember" />
      <button type="submit">Join</button>
    </Form>
  );
}
