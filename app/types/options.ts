import { BottleStatus } from "@prisma/client";

interface OptionType {
  value: BottleStatus;
  label: `${Capitalize<Lowercase<BottleStatus>>}`;
}

export type Options = OptionType[];
