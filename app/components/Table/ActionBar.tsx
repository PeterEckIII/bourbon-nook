export default function ActionBar() {
  return (
    <div className="flex justify-between mt-2 mb-1">
      <div className="flex items-end font-light text-md">
        <div className="rounded-full bg-gray-300 mx-2">
          <button className="px-4 py-1">Mark as</button>
        </div>
        <div className="rounded-full bg-gray-300 mx-2">
          <button className="px-4 py-1">Edit</button>
        </div>
        <div className="rounded-full bg-gray-300 mx-2">
          <button className="px-4 py-1">Delete</button>
        </div>
      </div>
      <div className="mx-6">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="p-2 text-small bg-gray-200 rounded-lg"
        />
      </div>
    </div>
  );
}
