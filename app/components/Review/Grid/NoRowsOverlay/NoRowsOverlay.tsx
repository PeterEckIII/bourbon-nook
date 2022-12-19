import type { ICellRendererParams } from "ag-grid-community";
import ErrorIcon from "~/components/Icons/ErrorIcon";

export default function NoRowsOverlay(
  props: ICellRendererParams & { message: string }
) {
  return (
    <div className="flex items-center justify-center">
      <ErrorIcon className="text-red-600" />{" "}
      <span className="ml-2">{props.message}</span>
    </div>
  );
}
