export default function SortUp({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 100 200"
      width="100"
      height="200"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className ?? "h-3 w-3"}
    >
      <polyline points="20 50, 50 20, 80 50"></polyline>
      <line x1="50" y1="20" x2="50" y2="180"></line>
    </svg>
  );
}
