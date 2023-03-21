import { getAnyDataFromRedis } from "~/utils/redis.server";
import { z, ZodError } from "zod";
import { BottleStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { ColDef, ValueGetterParams } from "ag-grid-community";
import { getReviewsForTable } from "~/models/review.server";
import ImageRenderer from "~/components/Review/Grid/ImageRenderer";
import PriceRenderer from "~/components/Review/Grid/PriceRenderer";
import ABVRenderer from "~/components/Review/Grid/ABVRenderer";
import ProofRenderer from "~/components/Review/Grid/ProofRenderer";
import RatingRenderer from "~/components/Review/Grid/RatingRenderer";
import LinkRenderer from "~/components/Review/Grid/LinkRenderer";

export type ErrorObject = {
  [name: string]: string;
};

export type Payload = {
  [name: string]: number | string;
};

export async function handleFormData(request: Request, schema: z.Schema) {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);
  let result;
  let errors: ErrorObject = {};

  try {
    const validatedBottle = schema.parse(formPayload);
    result = validatedBottle;
  } catch (error) {
    if (error instanceof ZodError) {
      for (let err of error.issues) {
        errors[err.path[0]] = err.message;
      }
    }
  }
  return { result, errors, formData };
}

export async function handleRedisData(id: string, formData: FormData) {
  const data = await getAnyDataFromRedis(id);
  if (!data) {
    throw new Error(`No Redis Data stored for this form`);
  }
  return data;
}

// FORM DATA SCHEMAS

export const bottleSchema = z.object({
  name: z.string().trim().min(1, { message: `Name is required` }),
  imageUrl: z.string(),
  type: z.string().trim().min(1, { message: `Type of alcohol is required` }),
  distiller: z.string().trim().min(1, { message: `Distiller is required` }),
  producer: z.string().trim().min(1, { message: `Producer is required` }),
  country: z.string().trim().min(1, { message: `Country is required` }),
  region: z.string().trim().min(1, { message: `Region is required` }),
  price: z.string().trim().min(1, { message: `Price is required` }),
  age: z.string().trim().min(1, { message: `Age is required` }),
  year: z.string().trim().min(1, { message: `Year is required` }),
  batch: z.string().trim().min(1, { message: `Batch is required` }),
  alcoholPercent: z.string().trim().min(1, { message: `ABV is required` }),
  proof: z.string().trim().min(1, { message: `Proof is required` }),
  size: z.string().trim().min(1, { message: `Size is required` }),
  color: z.string().trim().min(1, { message: `Color is required` }),
  finishing: z.string().trim().min(1, { message: `Finishing is required` }),
  openDate: z.string(),
  killDate: z.string(),
  redisId: z.string(),
});

export const settingSchema = z.object({
  date: z.string().trim().min(1, { message: "Date of review is required" }),
  setting: z.string().trim().min(1, { message: "Review setting is required" }),
  glassware: z.string().trim().min(1, { message: "Glassware is required" }),
  restTime: z.string().trim().min(1, { message: "Rest time is required" }),
  nose: z.string().trim().min(1, { message: "Nose notes are required" }),
  palate: z.string().trim().min(1, { message: "Palate notes are required" }),
  finish: z.string().trim().min(1, { message: "Finish notes are required" }),
  thoughts: z
    .string()
    .trim()
    .min(1, { message: "General thoughts are required" }),
  redisId: z.string(),
});

export const noteSchema = z.object({
  pepper: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  bakingSpice: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  cinnamon: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  herbal: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  mint: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  cherry: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  strawberry: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  raspberry: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  blackberry: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  blueberry: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  apple: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  banana: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  grape: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  stone: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  citrus: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  tropical: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  coffee: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  tobacco: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  leather: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  oak: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  toasted: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  smokey: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  peanut: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  almond: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  pecan: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  walnut: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  oily: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  floral: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  corn: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  rye: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  wheat: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  malt: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  dough: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  vanilla: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  caramel: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  molasses: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  butterscotch: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  honey: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  chocolate: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  toffee: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  sugar: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  overallRating: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  value: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
});

export const numberParser = (params: { newValue: string }) => {
  const newValue = params.newValue;
  let valueAsNumber;
  if (newValue === null || newValue === undefined || newValue === "") {
    valueAsNumber = null;
  } else {
    valueAsNumber = parseFloat(params.newValue);
  }
  return valueAsNumber;
};

export function nameGetter(params: ValueGetterParams) {
  if (!params.data) return `loading...`;
  return {
    name: params.data.name,
    imageUrl: params.data.imageUrl,
  };
}

export const reviewColumnDefs: ColDef<
  Awaited<ReturnType<typeof getReviewsForTable>>
>[] = [
  {
    field: "name",
    minWidth: 300,
    maxWidth: 350,
    lockPosition: "left",
    valueGetter: nameGetter,
    cellRenderer: ImageRenderer,
    cellStyle: { display: "flex" },
    filter: "agTextColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    getQuickFilterText: (params) => params.value,
    icons: {
      menu: `
          <div class="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    field: "date",
    sort: "desc",
    minWidth: 130,
    maxWidth: 130,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 500,
    },
    filter: "agDateColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    icons: {
      menu: `
          <div class="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    field: "type",
    minWidth: 150,
    maxWidth: 150,
    cellStyle: {
      display: "flex",
      // justifyContent: "center",
      alignItems: "center",
      fontWeight: "500",
    },
    filter: "agTextColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    getQuickFilterText: (params) => params.value,
    icons: {
      menu: `
          <div class="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    field: "price",
    minWidth: 97,
    maxWidth: 100,
    cellStyle: {
      display: "flex",
      alignItems: "center",
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    cellRenderer: PriceRenderer,
    icons: {
      menu: `
          <div class="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    headerName: "ABV",
    field: "alcoholPercent",
    minWidth: 92,
    maxWidth: 92,
    cellRenderer: ABVRenderer,
    cellStyle: {
      display: "flex",
      alignItems: "center",
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    icons: {
      menu: `
          <div class="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    field: "proof",
    minWidth: 107,
    maxWidth: 110,
    cellStyle: {
      display: "flex",
      alignItems: "center",
    },
    cellRenderer: ProofRenderer,
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    icons: {
      menu: `
          <div class="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    field: "age",
    minWidth: 115,
    maxWidth: 120,
    cellStyle: {
      display: "flex",
      alignItems: "center",
      fontWeight: 500,
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    icons: {
      menu: `
          <div class="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    field: "distillery",
    minWidth: 100,
    maxWidth: 110,
    cellStyle: {
      display: "flex",
      alignItems: "center",
    },
    filter: "agTextColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    getQuickFilterText: (params) => params.value,
    icons: {
      menu: `
          <div class="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    field: "producer",
    minWidth: 100,
    maxWidth: 110,
    cellStyle: {
      display: "flex",
      alignItems: "center",
    },
    filter: "agTextColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    getQuickFilterText: (params) => params.value,
    icons: {
      menu: `
          <div class="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    field: "value",
    valueParser: numberParser,
    cellRenderer: RatingRenderer,
    minWidth: 100,
    maxWidth: 100,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    icons: {
      menu: `
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    field: "rating",
    valueParser: numberParser,
    cellRenderer: RatingRenderer,
    minWidth: 105,
    maxWidth: 105,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
    icons: {
      menu: `
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </div>
        `,
    },
  },
  {
    headerName: "Link",
    field: "reviewId",
    minWidth: 80,
    maxWidth: 80,
    cellRenderer: LinkRenderer,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    sortable: false,
    filter: false,
  },
];
