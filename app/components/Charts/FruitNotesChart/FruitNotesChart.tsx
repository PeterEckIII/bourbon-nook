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

type FruitNotesChartProps = {
  review: review;
};

export default function FruitNotesChart({ review }: FruitNotesChartProps) {
  const fruitNotesData = useMemo(
    () => [
      {
        note: "Cherry",
        A: review.cherry || 1.0,
        B: review.cherry || 1.0,
      },
      {
        note: "Strawberry",
        A: review.strawberry || 1.0,
        B: review.strawberry || 1.0,
      },
      {
        note: "Raspberry",
        A: review.raspberry || 1.0,
        B: review.raspberry || 1.0,
      },
      {
        note: "Blackberry",
        A: review.blackberry || 1.0,
        B: review.blackberry || 1.0,
      },
      {
        note: "Blueberry ",
        A: review.blueberry || 1.0,
        B: review.blueberry || 1.0,
      },
      {
        note: "Apple",
        A: review.apple || 1.0,
        B: review.apple || 1.0,
      },
      {
        note: "Banana",
        A: review.banana || 1.0,
        B: review.banana || 1.0,
      },
      {
        note: "Grape",
        A: review.grape || 1.0,
        B: review.grape || 1.0,
      },
      {
        note: "Stone Fruit",
        A: review.stone || 1.0,
        B: review.stone || 1.0,
      },
      {
        note: "Citrus",
        A: review.citrus || 1.0,
        B: review.citrus || 1.0,
      },
      {
        note: "Tropical",
        A: review.tropical || 1.0,
        B: review.tropical || 1.0,
      },
    ],
    [review]
  );
  return (
    <ResponsiveContainer
      width={"100%"}
      height={"100%"}
      className="min-h-[400px]"
    >
      <RadarChart cx={"50%"} cy={"50%"} outerRadius="80%" data={fruitNotesData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="note" />
        <PolarRadiusAxis domain={[0, 10]} angle={25} tickCount={6} />
        <Radar
          name="Fruit Notes"
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
