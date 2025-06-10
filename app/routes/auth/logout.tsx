import { redirect } from 'react-router';
import type { Route } from './+types/logout';
import { logout } from '~/utils/session';

export async function loader() {
  return redirect('/login');
}

export async function action({ request }: Route.ActionArgs) {
  return logout(request);
}
