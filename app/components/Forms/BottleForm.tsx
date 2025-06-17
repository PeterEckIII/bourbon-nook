import { Form } from 'react-router';
import TextInput from '../Inputs/TextInput';

export default function BottleForm({ userId }: { userId: string }) {
  return (
    <Form
      method="post"
      className="space-y-6 grid grid-cols-1 gap-4 rounded-md sm:grid-cols-3"
    >
      <input type="hidden" name="userId" id="userId" value={userId} />
      <TextInput
        name="name"
        type="text"
        label="Bottle Name"
        value=""
        placeholder="Cooper's Craft"
      />
      <TextInput
        name="type"
        type="text"
        label="Liquor Type"
        value=""
        placeholder="Bourbon, Rye, Scotch"
      />
      <TextInput
        name="status"
        type="text"
        label="Bottle Status"
        value=""
        placeholder="SEALED, OPENED, FINISHED"
      />
      <TextInput
        name="distiller"
        type="text"
        label="Distillery"
        value=""
        placeholder="MGP, Buffalo Trace"
      />
      <TextInput
        name="producer"
        type="text"
        label="Producer"
        value=""
        placeholder="Sazerac, Heaven Hill"
      />
      <TextInput
        name="country"
        type="text"
        label="Country of Origin"
        value=""
        placeholder="USA, Japan, Scotland"
      />
      <TextInput
        name="region"
        type="text"
        label="Region"
        value=""
        placeholder="KY, Islay"
      />
      <TextInput
        name="price"
        type="text"
        label="Price"
        value=""
        placeholder="44.99"
      />
      <TextInput
        name="age"
        type="text"
        label="Age"
        value=""
        placeholder="12yr, NAS"
      />
      <TextInput
        name="proof"
        type="text"
        label="Proof"
        value=""
        placeholder="100"
      />
      <TextInput
        name="year"
        type="text"
        label="Release Year"
        value=""
        placeholder="2021"
      />
      <TextInput
        name="barrel"
        type="text"
        label="Barrel Info"
        value=""
        placeholder="C920, OBSK, Binny's"
      />
      <TextInput
        name="finishing"
        type="text"
        label="Finishing Casks"
        value=""
        placeholder="Toasted, Cognac, Port"
      />
      <TextInput
        name="openDate"
        type="text"
        label="Date Opened"
        value=""
        placeholder="5/25/2023"
      />
      <TextInput
        name="killDate"
        type="text"
        label="Date Finished"
        value=""
        placeholder="N/A, 5/25/2023"
      />
      <div className="flex items-center">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Create Bottle
        </button>
      </div>
    </Form>
  );
}
