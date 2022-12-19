import type { ITooltipParams } from "ag-grid-community";
import { useMemo } from "react";

export default function NameTooltip(props: ITooltipParams) {
  const data = useMemo(() => {
    return props!.api!.getDisplayedRowAtIndex(props.rowIndex as number)!.data!;
  }, [props]);

  return (
    <div className="flex rounded-md border-2 bg-yellow-100 p-2">
      {data === undefined ? null : (
        <div className="custom-tooltip">
          <p className="py-2">
            <span className="underline">{data.name}</span>
          </p>
          <p className="py-2">
            <span>Price: </span>${data.price}
          </p>
          <p className="py-2">
            <span>ABV: </span>
            {data.alcoholPercent}%
          </p>
          <p className="py-2">
            <span>Proof: </span>
            {data.proof}pf
          </p>
          <p className="py-2">
            <span>Age: </span>
            {data.age}
          </p>
          <p className="py-2">
            <span>Value: </span>
            {data.value}/5
          </p>
          <p className="py-2">
            <span>Rating: </span>
            {data.rating}/5
          </p>
        </div>
      )}
    </div>
  );
}
