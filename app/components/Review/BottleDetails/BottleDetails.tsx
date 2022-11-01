import type { Bottle } from "@prisma/client";

type BottleDetailProps = {
  bottle: Bottle;
};

export default function BottleDetails({ bottle }: BottleDetailProps) {
  return (
    <div className="">
      <h5 className="mb-4 text-left text-2xl">Bottle</h5>
      <table className="border-collapse border-2 border-gray-300">
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">Type</th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.type}
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">Price</th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            ${bottle.price}
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">ABV</th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.alcoholPercent}%
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">Proof</th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.proof}pf
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">Age</th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.age}
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">Year</th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.year}
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">Batch</th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.batch}
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">
            Distiller
          </th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.distiller}
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">
            Producer
          </th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.producer}
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">
            Bottler
          </th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.bottler}
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">
            Country
          </th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.country}
          </td>
        </tr>
        <tr>
          <th className="border border-[#ccc] py-2 px-8 text-center">Region</th>
          <td className="border border-[#ccc] py-2 px-8 text-center">
            {bottle.region}
          </td>
        </tr>
      </table>
    </div>
  );
}
