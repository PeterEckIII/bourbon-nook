import { bottle, review } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export type TableBottle = Pick<
  bottle,
  "id" | "name" | "type" | "distiller" | "price" | "age"
>;

export function useBottleColumns() {
  const columns: ColumnDef<TableBottle>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        id: "type",
        header: "Spirit Type",
        cell: (row) => row.renderValue(),
        accessorKey: "type",
      },
      {
        id: "distiller",
        header: "Distillery",
        cell: (row) => row.renderValue(),
        accessorKey: "distiller",
      },
      {
        id: "price",
        header: "Price",
        cell: (row) => row.renderValue(),
        accessorKey: "price",
      },
      {
        id: "age",
        header: "Age",
        cell: (row) => row.renderValue(),
        accessorKey: "age",
      },
    ],
    [],
  );

  return columns;
}

export type TableReview = Pick<
  review & bottle,
  | "id"
  | "name"
  | "type"
  | "distiller"
  | "price"
  | "age"
  | "overallRating"
  | "value"
>;

export function useReviewColumns() {
  const columns: ColumnDef<TableReview>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        id: "type",
        header: "Spirit Type",
        cell: (row) => row.renderValue(),
        accessorKey: "type",
      },
      {
        id: "distiller",
        header: "Distillery",
        cell: (row) => row.renderValue(),
        accessorKey: "distiller",
      },
      {
        id: "price",
        header: "Price",
        cell: (row) => row.renderValue(),
        accessorKey: "price",
      },
      {
        id: "age",
        header: "Age",
        cell: (row) => row.renderValue(),
        accessorKey: "age",
      },
      {
        id: "overallRating",
        header: "Rating",
        cell: (row) => row.renderValue(),
        accessorKey: "overallRating",
      },
      {
        id: "value",
        header: "Value",
        cell: (row) => row.renderValue(),
        accessorKey: "value",
      },
    ],
    [],
  );

  return columns;
}
