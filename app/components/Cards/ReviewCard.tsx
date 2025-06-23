import { Link } from 'react-router';
import type { bottle, review } from '~/generated/prisma';

interface ReviewCardProps {
  review: review;
  bottle: bottle;
}

export default function ReviewCard({ review, bottle }: ReviewCardProps) {
  return (
    <Link
      to={`/reviews/${review.id}`}
      className="grid max-w-lg grid-cols-2 p-8 m-4 rounded-md shadow-xl hover:-translate-1"
    >
      <div className="flex items-center px-1">
        <img
          src={bottle.imageUrl || ''}
          alt={`A bottle of ${bottle.name}`}
          className="border-2 border-black"
        />
        <p className="absolute self-end p-2 font-semibold text-white bg-purple-700">
          {review.overallRating}/10
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-xl font-semibold text-center">{bottle.name}</h4>
        <p className="text-sm text-gray-600">{bottle.distiller}</p>
      </div>
    </Link>
  );
}
