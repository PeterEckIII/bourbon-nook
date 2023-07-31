import { useMemo } from "react";
import SkeletonTable from "~/components/Skeleton/SkeletonTable";
import type { Column } from "~/utils/types";

export default function TestRoute() {
  const columns: Column[] = useMemo(
    () => [
      {
        kind: "bottle",
        header: "Name",
        field: "name",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Status",
        field: "status",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Type",
        field: "type",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Distiller",
        field: "distiller",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Producer",
        field: "producer",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Price",
        field: "price",
        sort: true,
      },
      {
        kind: "bottle",
        header: "ABV",
        field: "alcoholPercent",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Proof",
        field: "proof",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Country",
        field: "country",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Region",
        field: "region",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Color",
        field: "color",
        sort: false,
      },
      {
        kind: "bottle",
        header: "Finishing",
        field: "finishing",
        sort: false,
      },
      {
        kind: "bottle",
        header: "Size",
        field: "size",
        sort: false,
      },
    ],
    []
  );
  return <SkeletonTable columns={columns} numRows={5} />;
}
