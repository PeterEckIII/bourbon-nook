import { Form, redirect } from 'react-router';
import type { Route } from './+types/login';
import {
  createUserSession,
  getUserId,
  verifyCredentials,
} from '~/utils/session';

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const redirectTo = searchParams.get('redirectTo') || '/';
  const userId = await getUserId(request);
  if (userId) {
    return redirect('/');
  }
  return { redirectTo };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = String(formData.get('username'));
  const password = String(formData.get('password'));
  const remember = String(formData.get('remember'));
  const redirectTo = String(formData.get('redirectTo'));

  if (!username || typeof username !== 'string') {
    throw new Error('Invalid credentials');
  }

  if (!password || typeof password !== 'string') {
    throw new Error('Invalid credentials');
  }

  const user = await verifyCredentials(username, password);

  if (!user) {
    throw new Error('Invalid credentials');
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
  return (
    <Form method="post">
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <input
        type="hidden"
        name="redirectTo"
        id="redirectTo"
        value={redirectTo}
      />
      <input type="checkbox" name="remember" id="remember" />
      <button type="submit">Login</button>
    </Form>
  );
}
