import type { review } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { useMemo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";

type OverallNotesChartProps = {
  review: review;
};

function getCategoryAverage(numbers: number[]) {
  return numbers.reduce((prev, curr) => (prev += curr)) / numbers.length;
}

export default function OverallNotesChart({ review }: OverallNotesChartProps) {
  const overallNotesData = useMemo(
    () => [
      {
        note: "Earthy",
        A: getCategoryAverage([
          review.coffee || 1.0,
          review.tobacco || 1.0,
          review.leather || 1.0,
          review.oak || 1.0,
          review.toasted || 1.0,
          review.smokey || 1.0,
          review.peanut || 1.0,
          review.almond || 1.0,
          review.pecan || 1.0,
          review.walnut || 1.0,
          review.oily || 1.0,
          review.floral || 1.0,
        ]),
      },
      {
        note: "Fruit",
        A: getCategoryAverage([
          review.cherry || 1.0,
          review.strawberry || 1.0,
          review.raspberry || 1.0,
          review.blackberry || 1.0,
          review.blueberry || 1.0,
          review.apple || 1.0,
          review.banana || 1.0,
          review.grape || 1.0,
          review.stone || 1.0,
          review.citrus || 1.0,
          review.tropical || 1.0,
        ]),
      },
      {
        note: "Sweet",
        A: getCategoryAverage([
          review.vanilla || 1.0,
          review.caramel || 1.0,
          review.molasses || 1.0,
          review.butterscotch || 1.0,
          review.honey || 1.0,
          review.chocolate || 1.0,
          review.toffee || 1.0,
          review.sugar || 1.0,
        ]),
      },
      {
        note: "Spice",
        A: getCategoryAverage([
          review.pepper || 1.0,
          review.bakingSpice || 1.0,
          review.cinnamon || 1.0,
          review.herbal || 1.0,
          review.mint || 1.0,
        ]),
      },
      {
        note: "Grain",
        A: getCategoryAverage([
          review.corn || 1.0,
          review.rye || 1.0,
          review.wheat || 1.0,
          review.malt || 1.0,
          review.dough || 1.0,
        ]),
      },
    ],
    [review]
  );

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height="100%" className="min-h-[400px]">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={overallNotesData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="note" />
          <PolarRadiusAxis domain={[0, 10]} angle={18} tickCount={6} />
          <Radar
            name="Overall"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity="0.5"
          />
          <Legend verticalAlign="bottom" align="right" iconType="circle" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
