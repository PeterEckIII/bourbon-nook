import type { bottle } from "@prisma/client";
import type { CustomFormData } from "./helpers.server";

type FormData = {
  type: "Redis" | "Bottle";
  data: CustomFormData | bottle;
};

export function redisOrDb(data: CustomFormData | bottle): FormData {
  if ("redisId" in data) {
    return {
      type: "Redis",
      data,
    };
  } else {
    return {
      type: "Bottle",
      data,
    };
  }
}
