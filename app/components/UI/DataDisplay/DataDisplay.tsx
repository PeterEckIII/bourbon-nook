import type { bottle } from "@prisma/client";
import Abacus from "~/components/Icons/Abacus";
import Batch from "~/components/Icons/Batch";
import Beaker from "~/components/Icons/Beaker";
import Bolt from "~/components/Icons/Bolt";
import Calendar from "~/components/Icons/Calendar";
import CalendarDays from "~/components/Icons/CalendarDays";
import Dollar from "~/components/Icons/Dollar";
import EyeDropper from "~/components/Icons/EyeDropper";
import FireIcon from "~/components/Icons/FireIcon";
import Globe from "~/components/Icons/Globe";
import GraduationCap from "~/components/Icons/GraduationCap";
import MapPin from "~/components/Icons/MapPin";
import Office from "~/components/Icons/Office";
import Palette from "~/components/Icons/Palette";
import Ruler from "~/components/Icons/Ruler";
import Datum from "~/components/UI/DataDisplay/Datum";
import OriginsDisplay from "./OriginsDisplay/OriginsDisplay";
import StatsDisplay from "./StatsDisplay/StatsDisplay";
import MiscDisplay from "./MiscDisplay/MiscDisplay";

type DataDisplayProps = {
  bottle: bottle;
};

export default function DataDisplay({ bottle }: DataDisplayProps) {
  return (
    <div className="m-4 grid grid-cols-1 gap-6 md:m-0 md:grid-cols-2 xl:grid-cols-3">
      <Datum field="Type" value={bottle.type} icon={<Abacus />} />
      <Datum field="Distiller" value={bottle.distiller} icon={<Beaker />} />
      <Datum field="Producer" value={bottle.producer} icon={<Office />} />
      <Datum field="Country" value={bottle.country} icon={<Globe />} />
      <Datum field="Region" value={bottle.region} icon={<MapPin />} />
      <Datum field="Age" value={bottle.age} icon={<GraduationCap />} />
      <Datum field="ABV" value={`${bottle.alcoholPercent}%`} icon={<Bolt />} />
      <Datum field="Proof" value={bottle.proof} icon={<FireIcon />} />
      <Datum field="Price" value={`$${bottle.price}`} icon={<Dollar />} />
      <Datum field="Size" value={bottle.size} icon={<Ruler />} />
      <Datum field="Year" value={bottle.year} icon={<Calendar />} />

      <Datum field="Barrel/Batch" value={bottle.batch} icon={<Batch />} />
      <Datum field="Color" value={bottle.color} icon={<Palette />} />
      <Datum field="Finishing" value={bottle.finishing} icon={<EyeDropper />} />
      <Datum
        field="Open Date"
        value={bottle.openDate || `---`}
        icon={<CalendarDays />}
      />
      <Datum
        field="Kill Date"
        value={bottle.killDate || `---`}
        icon={<CalendarDays />}
      />
    </div>
  );
}
