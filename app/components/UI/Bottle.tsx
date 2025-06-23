import type { bottle } from '~/generated/prisma';

interface BottleProps {
  bottle: bottle;
}

export default function Bottle({ bottle }: BottleProps) {
  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-3xl font-bold">{bottle.name}</h1>
        <h3 className="text-xl font-semibold text-center">
          {bottle.distiller} | {bottle.producer}
        </h3>
        <h3 className="text-xl font-semibold text-center">
          {bottle.region}, {bottle.country}
        </h3>
        <h3 className="text-lg">{''}</h3>
      </div>
      <div>
        <img
          src={bottle.imageUrl || ''}
          alt={`A bottle of ${bottle.name}`}
          className="h-[500px] w-[400px]"
        />
      </div>
    </div>
  );
}
