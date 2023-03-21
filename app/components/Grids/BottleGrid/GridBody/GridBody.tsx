import { Link } from "@remix-run/react";
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Cell,
  Row,
} from "@table-library/react-table-library";
import type { Pagination } from "@table-library/react-table-library/types/pagination";
import type { Sort } from "@table-library/react-table-library/types/sort";
import ExternalLink from "~/components/Icons/ExternalLink";
import FilterArrowDown from "~/components/Icons/FilterArrowDown";
import FilterArrows from "~/components/Icons/FilterArrows";
import FilterArrowUp from "~/components/Icons/FilterArrowUp";
import type { GridBottle } from "~/models/bottle.server";

type GridBodyProps = {
  data: {
    nodes: GridBottle[] | [];
  };
  pagination: Pagination;
  sort: Sort;
};

export default function GridBody({ data, pagination, sort }: GridBodyProps) {
  function getIcon(sortKey: Uppercase<string>) {
    if (sort.state.sortKey === sortKey && sort.state.reverse) {
      return <FilterArrowDown />;
    }
    if (sort.state.sortKey === sortKey && !sort.state.reverse) {
      return <FilterArrowUp />;
    }
    return <FilterArrows />;
  }

  return (
    <div className="mb-8 overflow-x-scroll">
      <Table
        data={data}
        layout={{ custom: true, horizontalScroll: true }}
        pagination={pagination}
        sort={sort}
      >
        {(tableList) => (
          <>
            <Header>
              <HeaderRow className="border-b-4 border-blue-300">
                <HeaderCell
                  pinLeft
                  className="sticky left-0 w-[400px] min-w-[400px] overflow-hidden bg-white text-left"
                  onClick={() => sort.fns.onToggleSort({ sortKey: "NAME" })}
                >
                  <div className="flex">
                    <div className="mx-2">Name</div>
                    <div>{getIcon("NAME")}</div>
                  </div>
                </HeaderCell>
                <HeaderCell
                  className="min-w-[150px] text-left"
                  onClick={() => sort.fns.onToggleSort({ sortKey: "STATUS" })}
                >
                  <div className="flex">
                    <div className="mx-2">Status</div>
                    <div>{getIcon("STATUS")}</div>
                  </div>
                </HeaderCell>
                <HeaderCell
                  className="min-w-[100px] text-left"
                  onClick={() => sort.fns.onToggleSort({ sortKey: "TYPE" })}
                >
                  <div className="flex">
                    <div className="mx-2">Type</div>
                    <div>{getIcon("TYPE")}</div>
                  </div>
                </HeaderCell>
                <HeaderCell
                  className="min-w-[200px] text-left"
                  onClick={() =>
                    sort.fns.onToggleSort({ sortKey: "DISTILLER" })
                  }
                >
                  <div className="flex">
                    <div className="mx-2">Distiller</div>
                    <div>{getIcon("DISTILLER")}</div>
                  </div>
                </HeaderCell>
                <HeaderCell
                  className="min-w-[200px] text-left"
                  onClick={() => sort.fns.onToggleSort({ sortKey: "PRODUCER" })}
                >
                  <div className="flex">
                    <div className="mx-2">Producer</div>
                    <div>{getIcon("PRODUCER")}</div>
                  </div>
                </HeaderCell>
                <HeaderCell
                  className="min-w-[200px] text-left"
                  onClick={() => sort.fns.onToggleSort({ sortKey: "ABV" })}
                >
                  <div className="flex">
                    <div className="mx-2">ABV</div>
                    <div>{getIcon("ABV")}</div>
                  </div>
                </HeaderCell>
                <HeaderCell
                  className="min-w-[200px] text-left"
                  onClick={() => sort.fns.onToggleSort({ sortKey: "PROOF" })}
                >
                  <div className="flex">
                    <div className="mx-2">Proof</div>
                    <div>{getIcon("PROOF")}</div>
                  </div>
                </HeaderCell>
                <HeaderCell
                  className="min-w-[200px] text-left"
                  onClick={() => sort.fns.onToggleSort({ sortKey: "PRICE" })}
                >
                  <div className="flex">
                    <div className="mx-2">Price</div>
                    <div>{getIcon("PRICE")}</div>
                  </div>
                </HeaderCell>
                <HeaderCell className="min-w-[150px] text-left">Age</HeaderCell>
                <HeaderCell className="min-w-[150px] text-left">
                  Barrel/Batch
                </HeaderCell>
                <HeaderCell
                  className="min-w-[200px] text-left"
                  onClick={() => sort.fns.onToggleSort({ sortKey: "COUNTRY" })}
                >
                  <div className="flex">
                    <div className="mx-2">Country</div>
                    <div>{getIcon("COUNTRY")}</div>
                  </div>
                </HeaderCell>
                <HeaderCell
                  className="min-w-[200px] text-left"
                  onClick={() => sort.fns.onToggleSort({ sortKey: "REGION" })}
                >
                  <div className="flex">
                    <div className="mx-2">Region</div>
                    <div>{getIcon("REGION")}</div>
                  </div>
                </HeaderCell>
                <HeaderCell className="min-w-[100px] text-left">
                  Finishing
                </HeaderCell>
                <HeaderCell className="mx-4 min-w-[100px] text-left">
                  Review
                </HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row
                  key={item.id}
                  item={item}
                  className="h-11 max-h-[50px] border-b-2 border-blue-500"
                >
                  <Cell
                    pinLeft
                    className="sticky left-0 w-[400px] min-w-[400px] overflow-hidden bg-gray-50 pl-4 text-left"
                  >
                    {item.name}
                  </Cell>
                  <Cell className="-ml-4">
                    <span
                      className={
                        item.status === "OPENED"
                          ? "rounded-xl bg-green-500 bg-opacity-60 px-4 py-2 text-green-700"
                          : item.status === "CLOSED"
                          ? "rounded-xl bg-yellow-500 bg-opacity-60 px-4 py-2 text-yellow-700"
                          : item.status === "FINISHED"
                          ? "rounded-xl bg-gray-500 bg-opacity-50 px-4 py-2 text-gray-700"
                          : ""
                      }
                    >
                      {item.status}
                    </span>
                  </Cell>
                  <Cell className="min-w-[100px]">{item.type}</Cell>
                  <Cell className="min-w-[200px]">{item.distiller}</Cell>
                  <Cell className="min-w-[200px]">{item.producer}</Cell>
                  <Cell className="min-w-[100px]">{item.alcoholPercent}%</Cell>
                  <Cell className="min-w-[100px]">{item.proof}pf</Cell>
                  <Cell className="min-w-[100px]">${item.price}</Cell>
                  <Cell className="min-w-[150px]">{item.age}</Cell>
                  <Cell className="min-w-[150px]">{item.batch}</Cell>
                  <Cell className="min-w-[100px]">{item.country}</Cell>
                  <Cell className="min-w-[100px]">{item.region}</Cell>
                  <Cell className="min-w-[100px] whitespace-nowrap">
                    {item.finishing}
                  </Cell>
                  <Cell className="min-w-[100px]">
                    <Link to={`/reviews/${item.reviews?.[0].id}/comments`}>
                      <ExternalLink />
                    </Link>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
}
