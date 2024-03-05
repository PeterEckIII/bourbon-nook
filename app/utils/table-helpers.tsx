import { bottle, review } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { CSSProperties, useMemo } from "react";

import ItemActions from "~/components/Table/ItemActions";

const bottleHelper = createColumnHelper<TableBottle>();

export type TableBottle = Pick<
  bottle,
  | "id"
  | "name"
  | "status"
  | "type"
  | "distiller"
  | "price"
  | "age"
  | "country"
  | "region"
  | "barrel"
  | "batch"
  | "alcoholPercent"
  | "createdAt"
>;

export function useBottleColumns() {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const columns: ColumnDef<TableBottle, any>[] = useMemo(
    () => [
      bottleHelper.accessor("name", {
        id: "name",
        header: "Name",
        cell: (props) => <div className="font-bold">{props.getValue()}</div>,
      }),
      bottleHelper.accessor("createdAt", {
        id: "createdAt",
        header: "Added on",
        cell: (props) => {
          const date = new Intl.DateTimeFormat(props.getValue(), {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          });
          return <span>{date.format()}</span>;
        },
      }),
      bottleHelper.accessor("status", {
        id: "status",
        header: "Status",
        cell: (props) => props.renderValue(),
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
        cell: (props) => <div className="float-right">${props.getValue()}</div>,
      }),
      bottleHelper.accessor("age", {
        id: "age",
        header: "Age",
        cell: (props) => props.renderValue(),
      }),
      bottleHelper.accessor("alcoholPercent", {
        id: "ABV",
        header: "ABV",
        cell: (props) => <div>{props.renderValue()}%</div>,
      }),
      bottleHelper.accessor("country", {
        id: "country",
        header: "Country",
        cell: (props) => props.renderValue(),
      }),
      bottleHelper.accessor("region", {
        id: "region",
        header: "Region",
        cell: (props) => props.renderValue(),
      }),
      bottleHelper.accessor("batch", {
        id: "batch",
        header: "Batch",
        cell: (props) => props.renderValue(),
      }),
      bottleHelper.accessor("barrel", {
        id: "barrel",
        header: "Barrel",
        cell: (props) => props.renderValue(),
      }),
      bottleHelper.accessor("id", {
        header: "Actions",
        id: "actions",
        cell: (props) => {
          const val = props.getValue() as string;
          return <ItemActions value={val} />;
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
        cell: (props) => {
          const val = props.getValue() as string;
          return <ItemActions value={val} />;
        },
      }),
    ],
    [],
  );

  return columns;
}

export const getTableCellStyle = ({
  size,
  minSize,
  maxSize,
}: {
  size?: number | string;
  minSize?: number | string;
  maxSize?: number | string;
}): CSSProperties => ({
  width: size,
  maxWidth: maxSize,
  minWidth: minSize,
});
