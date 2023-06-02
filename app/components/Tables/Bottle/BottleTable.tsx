import type { Column, TableData, Sort, GridBottle } from "~/utils/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { Limit } from "~/utils/types";
import useDebounce from "~/utils/useDebounce";
import { useTypedFetcher } from "remix-typedjson";
import GlobalFilter from "../Common/GlobalFilter";
import Pagination from "../Common/Pagination/Pagination";
import Caption from "../Common/Caption";
import Body from "../Common/Body/Body";
import Head from "../Common/Head";
import Table from "../Common/Table";
import { Link, useFetcher } from "@remix-run/react";
import RightArrowCircle from "~/components/Icons/RightArrowCircle";
import { BottleSearchData } from "~/routes/services/search/bottle";

export default function BottleTable() {
  return <div className="flex flex-col">{/* unimplemented */}</div>;
}
