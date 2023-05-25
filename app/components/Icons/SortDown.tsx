export default function SortDown({ className }: { className: string }) {
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
      <line x1="50" y1="20" x2="50" y2="180"></line>
      <polyline points="20 150, 50 180, 80 150"></polyline>
    </svg>
  );
}
