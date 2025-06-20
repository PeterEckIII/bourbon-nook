import { Link } from 'react-router';
import type { bottle } from '~/generated/prisma';

interface BottleCardProps {
  bottle: bottle;
}

export default function BottleCard({ bottle }: BottleCardProps) {
  return (
    <Link
      to={`/bottles/${bottle.id}`}
      className="p-8 m-4 shadow-lg rounded-md grid grid-cols-2 max-w-lg hover:-translate-1"
    >
      <div className="flex items-center px-1">
        <img
          src={bottle.imageUrl || ''}
          alt={`A bottle of ${bottle.name}`}
          className="border-2 border-black"
        />
        <p className="uppercase absolute self-end text-white bg-purple-700 font-semibold p-2">
          {bottle.status}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-xl font-semibold text-center">{bottle.name}</h4>
        <p className="text-sm text-gray-600">{bottle.type}</p>
        <p className="text-sm text-gray-600">{bottle.distiller}</p>
        <p className="text-sm text-gray-600">{Number(bottle.proof) / 2}%</p>
        <p>{bottle.id}</p>
      </div>
    </Link>
  );
}
