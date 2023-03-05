import type { review } from "@prisma/client";
import { useMemo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

type GrainNotesChartProps = {
  review: review;
};

export default function GrainNotesChart({ review }: GrainNotesChartProps) {
  const grainNotesData = useMemo(
    () => [
      {
        note: "Corn",
        A: review.corn || 1.0,
        B: review.corn || 1.0,
      },
      {
        note: "Rye",
        A: review.rye || 1.0,
        B: review.rye || 1.0,
      },
      {
        note: "Wheat",
        A: review.wheat || 1.0,
        B: review.wheat || 1.0,
      },
      {
        note: "Barley",
        A: review.malt || 1.0,
        B: review.malt || 1.0,
      },
      {
        note: "Bread/Dough",
        A: review.dough || 1.0,
        B: review.dough || 1.0,
      },
    ],
    [review]
  );
  return (
    <ResponsiveContainer width="100%" height="100%" className="min-h-[400px]">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={grainNotesData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="note" />
        <PolarRadiusAxis domain={[0, 10]} angle={18} tickCount={6} />
        <Radar
          name="Grain Notes"
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
