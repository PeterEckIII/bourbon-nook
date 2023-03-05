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

type EarthNoteProps = {
  review: review;
};

export default function EarthNotesChart({ review }: EarthNoteProps) {
  const earthNotesData = useMemo(
    () => [
      {
        note: "Coffee",
        A: review.coffee || 1.0,
        B: review.coffee || 1.0,
      },
      {
        note: "Tobacco",
        A: review.tobacco || 1.0,
        B: review.tobacco || 1.0,
      },
      {
        note: "Leather",
        A: review.leather || 1.0,
        B: review.leather || 1.0,
      },
      {
        note: "Oak",
        A: review.oak || 1.0,
        B: review.oak || 1.0,
      },
      {
        note: "Toasted",
        A: review.toasted || 1.0,
        B: review.toasted || 1.0,
      },
      {
        note: "Smokey",
        A: review.smokey || 1.0,
        B: review.smokey || 1.0,
      },
      {
        note: "Peanut",
        A: review.peanut || 1.0,
        B: review.peanut || 1.0,
      },
      {
        note: "Almond",
        A: review.almond || 1.0,
        B: review.almond || 1.0,
      },
      {
        note: "Pecan",
        A: review.pecan || 1.0,
        B: review.pecan || 1.0,
      },
      {
        note: "Walnut",
        A: review.walnut || 1.0,
        B: review.walnut || 1.0,
      },
      {
        note: "Oily",
        A: review.oily || 1.0,
        B: review.oily || 1.0,
      },
      {
        note: "Floral",
        A: review.floral || 1.0,
        B: review.floral || 1.0,
      },
    ],
    [review]
  );

  return (
    <ResponsiveContainer width="100%" height="100%" className="min-h-[400px]">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={earthNotesData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="note" />
        <PolarRadiusAxis domain={[0, 10]} tickCount={6} />
        <Radar
          name="Earth Notes"
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
