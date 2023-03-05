import type { bottle } from "@prisma/client";
import Batch from "~/components/Icons/Batch";
import CalendarDays from "~/components/Icons/CalendarDays";
import EyeDropper from "~/components/Icons/EyeDropper";
import Palette from "~/components/Icons/Palette";
import Datum from "../Datum";

type MiscDisplayProps = {
  bottle: Pick<
    bottle,
    "batch" | "color" | "finishing" | "openDate" | "killDate"
  >;
};

export default function MiscDisplay({ bottle }: MiscDisplayProps) {
  return (
    <>
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
    </>
  );
}
