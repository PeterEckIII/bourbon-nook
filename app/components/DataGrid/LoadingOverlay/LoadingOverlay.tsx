export default function LoadingOverlay({ message }: { message: string }) {
  return <span className="ag-overlay-loading-center">{message}</span>;
}
