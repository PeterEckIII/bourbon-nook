import type { bottle } from "@prisma/client";
import Bolt from "~/components/Icons/Bolt";
import Calendar from "~/components/Icons/Calendar";
import Dollar from "~/components/Icons/Dollar";
import FireIcon from "~/components/Icons/FireIcon";
import GraduationCap from "~/components/Icons/GraduationCap";
import Ruler from "~/components/Icons/Ruler";
import Datum from "../Datum";

type StatsDisplayProps = {
  bottle: Pick<
    bottle,
    "age" | "alcoholPercent" | "proof" | "price" | "size" | "year"
  >;
};

export default function StatsDisplay({ bottle }: StatsDisplayProps) {
  return (
    <>
      <Datum field="Age" value={bottle.age} icon={<GraduationCap />} />
      <Datum field="ABV" value={`${bottle.alcoholPercent}%`} icon={<Bolt />} />
      <Datum field="Proof" value={bottle.proof} icon={<FireIcon />} />
      <Datum field="Price" value={`$${bottle.price}`} icon={<Dollar />} />
      <Datum field="Size" value={bottle.size} icon={<Ruler />} />
      <Datum field="Year" value={bottle.year} icon={<Calendar />} />
    </>
  );
}
