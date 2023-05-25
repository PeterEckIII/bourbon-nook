import type { GridBottle, GridItem, GridReview } from "~/utils/types";
import NameCell from "../NameCell";
import StatusCell from "../StatusCell";
import { useMemo } from "react";
import { Link } from "@remix-run/react";
import ExternalLink from "~/components/Icons/ExternalLink";

type BodyProps = {
  items: GridBottle[] | GridReview[] | [];
};

export default function Body({ items }: BodyProps) {
  const isReview = useMemo(() => {
    return (item: GridItem): item is GridReview => {
      return (item as GridReview).date !== undefined;
    };
  }, []);

  return (
    <tbody>
      {items.map((item) => {
        return isReview(item) ? (
          <tr key={item.id} className="h-12">
            <NameCell
              value={item.bottle?.name}
              batch={item.bottle?.batch}
              barrel={item.bottle?.barrel}
            />
            <td className="mx-2 whitespace-nowrap px-4">{item.bottle?.type}</td>
            <td className="mx-2 whitespace-nowrap px-4">{item.date}</td>
            <td className="mx-2 whitespace-nowrap px-4">
              {item.bottle?.distiller}
            </td>
            <td className="mx-2 whitespace-nowrap px-4">
              {item.bottle?.producer}
            </td>
            <td className="mx-2 whitespace-nowrap px-4">
              ${item.bottle?.price}
            </td>
            <td className="mx-2 whitespace-nowrap px-4">
              {item.bottle?.alcoholPercent}%
            </td>
            <td className="mx-2 whitespace-nowrap px-4">
              {item.bottle?.proof}pf
            </td>
            <td className="mx-2 whitespace-nowrap px-4">{item.value}</td>
            <td className="mx-2 whitespace-nowrap px-4">
              {item.overallRating}
            </td>
            <td className="mx-2 whitespace-nowrap px-4">
              <Link to={`/reviews/${item.id}`}>
                <ExternalLink />
              </Link>
            </td>
          </tr>
        ) : (
          <tr key={item.id} className="h-12">
            <NameCell
              value={item.name}
              batch={item.batch}
              barrel={item.barrel}
            />
            <StatusCell status={item.status} />
            <td className="mx-2 whitespace-nowrap px-4">{item.type}</td>
            <td className="mx-2 whitespace-nowrap px-4">{item.distiller}</td>
            <td className="mx-2 whitespace-nowrap px-4">{item.producer}</td>
            <td className="mx-2 whitespace-nowrap px-4">${item.price}</td>
            <td className="mx-2 whitespace-nowrap px-4">
              {item.alcoholPercent}%
            </td>
            <td className="mx-2 whitespace-nowrap px-4">{item.proof}pf</td>
            <td className="mx-2 whitespace-nowrap px-4">{item.country}</td>
            <td className="mx-2 whitespace-nowrap px-4">{item.region}</td>
            <td className="mx-2 whitespace-nowrap px-4">{item.color}</td>
            <td className="mx-2 whitespace-nowrap px-4">{item.finishing}</td>
            <td className="mx-2 whitespace-nowrap px-4">{item.size}</td>
          </tr>
        );
      })}
    </tbody>
  );
}

/*

*/
