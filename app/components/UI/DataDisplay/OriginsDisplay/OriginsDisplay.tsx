import type { bottle } from "@prisma/client";
import Abacus from "~/components/Icons/Abacus";
import Beaker from "~/components/Icons/Beaker";
import Globe from "~/components/Icons/Globe";
import MapPin from "~/components/Icons/MapPin";
import Office from "~/components/Icons/Office";
import Datum from "../Datum";

type OriginsDisplayProps = {
  bottle: Pick<
    bottle,
    "type" | "distiller" | "producer" | "country" | "region"
  >;
};

export default function OriginsDisplay({ bottle }: OriginsDisplayProps) {
  return (
    <>
      <Datum field="Type" value={bottle.type} icon={<Abacus />} />
      <Datum field="Distiller" value={bottle.distiller} icon={<Beaker />} />
      <Datum field="Producer" value={bottle.producer} icon={<Office />} />
      <Datum field="Country" value={bottle.country} icon={<Globe />} />
      <Datum field="Region" value={bottle.region} icon={<MapPin />} />
    </>
  );
}
