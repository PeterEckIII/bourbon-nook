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
import BottleImage from "../BottleImage";

type BottleProps = {
  bottle: bottle;
};

export default function Bottle({ bottle }: BottleProps) {
  return (
    <div className="my-6 flex flex-col rounded bg-white p-4 shadow-lg shadow-blue-700">
      <h5 className="mb-8 px-2 py-4 text-left text-3xl">Bottle</h5>
      <div className="flex h-full flex-col lg:flex-row lg:justify-between">
        <div className="mb-2 flex h-auto w-auto justify-center lg:w-1/2 xl:w-1/3">
          <BottleImage bottle={bottle} />
        </div>
        <div className="wrap my-2 mx-2 flex w-full flex-col">
          <section className="">
            <div className="m-4 grid grid-cols-1 gap-6 md:m-0 md:grid-cols-2 xl:grid-cols-3">
              <Datum field="Type" value={bottle.type} icon={<Abacus />} />
              <Datum
                field="Distiller"
                value={bottle.distiller}
                icon={<Beaker />}
              />
              <Datum
                field="Producer"
                value={bottle.producer}
                icon={<Office />}
              />
              <Datum field="Country" value={bottle.country} icon={<Globe />} />
              <Datum field="Region" value={bottle.region} icon={<MapPin />} />

              <Datum field="Age" value={bottle.age} icon={<GraduationCap />} />
              <Datum
                field="ABV"
                value={`${bottle.alcoholPercent}%`}
                icon={<Bolt />}
              />
              <Datum field="Proof" value={bottle.proof} icon={<FireIcon />} />
              <Datum
                field="Price"
                value={`$${bottle.price}`}
                icon={<Dollar />}
              />
              <Datum field="Size" value={bottle.size} icon={<Ruler />} />
              <Datum field="Year" value={bottle.year} icon={<Calendar />} />

              <Datum
                field="Barrel/Batch"
                value={bottle.batch}
                icon={<Batch />}
              />
              <Datum field="Color" value={bottle.color} icon={<Palette />} />
              <Datum
                field="Finishing"
                value={bottle.finishing}
                icon={<EyeDropper />}
              />
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
          </section>
        </div>
      </div>
    </div>
  );
}

/*


<Datum field="Type" value={bottle.type} icon={<Abacus />} />
          
  </div>
*/
