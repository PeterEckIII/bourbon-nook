import { getFilteredBottles } from '~/models/bottle';
import type { Route } from './+types/home';
import { requireUserId } from '~/utils/session';
import { Form, useNavigation, useSubmit } from 'react-router';
import BottleCard from '~/components/Cards/BottleCard';
import TextInput from '~/components/Inputs/TextInput';

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const bottles = await getFilteredBottles(userId, q);
  return { bottles, q };
}

export default function Bottles({ loaderData }: Route.ComponentProps) {
  const { bottles, q } = loaderData;
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  return (
    <main className="flex flex-col items-center justify-center mt-8">
      <div>
        <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
          Bottles
        </h1>
      </div>
      <div>
        <Form
          id="search-form"
          role="search"
          onChange={(event) => submit(event.currentTarget)}
        >
          <TextInput
            aria-label="Search bottles"
            name="q"
            label="Search"
            type="search"
            placeholder="Search..."
            defaultValue={q || ''}
            className={searching ? 'loading' : ''}
          />
          <div aria-hidden hidden={!searching} id="search-spinner" />
        </Form>
      </div>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
        {bottles.map((bottle) => (
          <li key={bottle.id}>
            <BottleCard bottle={bottle} />
          </li>
        ))}
      </ul>
    </main>
  );
}
