import type { review } from "@prisma/client";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMemo } from "react";

type SweetNotesChartProps = {
  review: review;
};

export default function SweetNotesChart({ review }: SweetNotesChartProps) {
  const sweetNotesData = useMemo(
    () => [
      {
        note: "Vanilla",
        A: review.vanilla || 1,
        B: review.vanilla || 1,
      },
      {
        note: "Caramel",
        A: review.caramel || 1,
        B: review.caramel || 1,
      },
      {
        note: "Molasses",
        A: review.molasses || 1,
        B: review.molasses || 1,
      },
      {
        note: "Butterscotch",
        A: review.butterscotch || 1,
        B: review.butterscotch || 1,
      },
      {
        note: "Honey",
        A: review.honey || 1,
        B: review.honey || 1,
      },
      {
        note: "Chocolate",
        A: review.chocolate || 1,
        B: review.chocolate || 1,
      },
      {
        note: "Toffee",
        A: review.toffee || 1,
        B: review.toffee || 1,
      },
      {
        note: "Powdered Sugar",
        A: review.sugar || 1,
        B: review.sugar || 1,
      },
    ],
    [review]
  );

  return (
    <ResponsiveContainer width="100%" height="100%" className="min-h-[400px]">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={sweetNotesData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="note" />
        <PolarRadiusAxis domain={[0, 10]} tickCount={6} />
        <Radar
          name="Sweet Notes"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity="0.5"
        />
        <Legend verticalAlign="bottom" align="right" iconType="circle" />
      </RadarChart>
    </ResponsiveContainer>
  );
}
