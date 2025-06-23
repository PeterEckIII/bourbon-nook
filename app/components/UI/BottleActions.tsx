import { Form, Link } from 'react-router';

export default function BottleActions() {
  return (
    <div className="flex justify-around">
      <div className="p-2 text-blue-600 bg-blue-50">
        <Link to={`images`}>Update image</Link>
      </div>
      <div className="p-2 text-blue-600 bg-blue-50">
        <Link to={`edit`}>Edit bottle</Link>
      </div>
      <div className="p-2 text-blue-600 bg-blue-50">
        <Form
          action={`destroy`}
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              'Are you sure you want to delete this bottle?'
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit">Delete bottle</button>
        </Form>
      </div>
    </div>
  );
}
