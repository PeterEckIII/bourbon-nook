import { redirect } from 'react-router';
import type { Route } from './+types/destroy-bottle';

import { deleteBottle } from '~/models/bottle';

export async function action({ params }: Route.ActionArgs) {
  await deleteBottle(params.bottleId);
  return redirect('/bottles');
}
