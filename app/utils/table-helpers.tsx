import { bottle, review } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

import ActionRow from "~/components/Table/ActionRow";

const bottleHelper = createColumnHelper<TableBottle>();

export type TableBottle = Pick<
  bottle,
  "id" | "name" | "type" | "distiller" | "price" | "age"
>;

export function useBottleColumns() {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const columns: ColumnDef<TableBottle, any>[] = useMemo(
    () => [
      bottleHelper.accessor("name", {
        id: "name",
        header: "Name",
        cell: (props) => <div>{props.getValue()}</div>,
      }),
      bottleHelper.accessor("type", {
        id: "type",
        header: "Spirit Type",
        cell: (props) => props.renderValue(),
      }),
      bottleHelper.accessor("distiller", {
        id: "distiller",
        header: "Distillery",
        cell: (props) => props.renderValue(),
      }),
      bottleHelper.accessor("price", {
        id: "price",
        header: "Price",
        cell: (props) => <div className="float-right">{props.getValue()}</div>,
      }),
      bottleHelper.accessor("age", {
        id: "age",
        header: "Age",
        cell: (props) => props.renderValue(),
      }),
      bottleHelper.accessor("id", {
        header: "Actions",
        id: "actions",
        cell: (props) => {
          const val = props.getValue() as string;
          return <ActionRow value={val} />;
        },
      }),
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

const reviewHelper = createColumnHelper<TableReview>();

export function useReviewColumns() {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const columns: ColumnDef<TableReview, any>[] = useMemo(
    () => [
      reviewHelper.accessor("name", {
        id: "name",
        header: "Name",
        cell: (row) => row.renderValue(),
      }),
      reviewHelper.accessor("type", {
        id: "type",
        header: "Spirit Type",
        cell: (row) => row.renderValue(),
      }),
      reviewHelper.accessor("distiller", {
        id: "distiller",
        header: "Distillery",
        cell: (row) => row.renderValue(),
      }),
      reviewHelper.accessor("price", {
        id: "price",
        header: "Price",
        cell: (props) => <div className="float-right">{props.getValue()}</div>,
      }),
      reviewHelper.accessor("overallRating", {
        id: "overallRating",
        header: "Rating",
        cell: (row) => row.renderValue(),
      }),
      reviewHelper.accessor("value", {
        id: "value",
        header: "Value",
        cell: (row) => row.renderValue(),
      }),
      reviewHelper.accessor("id", {
        header: "Actions",
        id: "actions",
        cell: (props) => <ActionRow<TableReview> props={props} />,
      }),
    ],
    [],
  );

  return columns;
}
