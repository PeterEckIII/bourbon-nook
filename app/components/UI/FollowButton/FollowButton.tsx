export default function FollowButton() {
  return (
    <span className="group relative m-12 flex justify-center">
      <button className="rounded bg-none px-4 py-2 text-sm text-blue-500 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="absolute top-10 scale-0 rounded bg-gray-500 p-2 text-xs text-white transition-all group-hover:scale-100">
          Follow
        </span>
      </button>
    </span>
  );
}
