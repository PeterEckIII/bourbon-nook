import { useMemo } from "react";

export default function useBottleCols() {
  const columns = useMemo(
    () => [
      {
        Header: "Bottle",
        accessor: "imageUrl",
        id: "image",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Name",
        accessor: "name",
        id: "name",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Status",
        accessor: "status",
        id: "status",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Type",
        accessor: "type",
        id: "type",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Distiller",
        accessor: "distiller",
        id: "distiller",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Producer",
        accessor: "producer",
        id: "producer",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "ABV",
        accessor: "alcoholPercent",
        id: "alcoholPercent",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Proof",
        accessor: "proof",
        id: "proof",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Price",
        accessor: "price",
        id: "price",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Age",
        accessor: "age",
        id: "age",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Barrel/Batch #",
        accessor: "batch",
        id: "batch",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Country",
        accessor: "country",
        id: "country",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Region",
        accessor: "region",
        id: "region",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Color",
        accessor: "color",
        id: "color",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Finishing",
        accessor: "finishing",
        id: "finishing",
        canSort: true,
        sortType: "basic",
      },
      {
        Header: "Review",
        accessor: "reviews[0].id",
        id: "review",
        canSort: true,
        sortType: "basic",
      },
    ],
    []
  );

  return columns;
}
