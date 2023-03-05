import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { review } from "@prisma/client";
import { useMemo } from "react";

type SpiceNotesChartProps = {
  review: review;
};

export default function SpiceNotesChart({ review }: SpiceNotesChartProps) {
  const spiceNotesData = useMemo(
    () => [
      {
        note: "Pepper",
        A: review.pepper || 1,
        B: review.pepper || 1,
      },
      {
        note: "Baking Spice",
        A: review.bakingSpice || 1,
        B: review.bakingSpice || 1,
      },
      {
        note: "Cinnamon",
        A: review.cinnamon || 1,
        B: review.cinnamon || 1,
      },
      {
        note: "Herbal",
        A: review.herbal || 1,
        B: review.herbal || 1,
      },
      {
        note: "Minty",
        A: review.mint || 1,
        B: review.mint || 1,
      },
    ],
    [review]
  );

  return (
    <ResponsiveContainer width="100%" height="100%" className="min-h-[400px]">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={spiceNotesData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="note" />
        <PolarRadiusAxis domain={[0, 10]} angle={18.5} tickCount={6} />
        <Radar
          name="Spice Notes"
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
