export interface BottleData {
  name: string;
  type: string | null;
  status: string | null;
  distiller: string | null;
  producer: string | null;
  country: string | null;
  region: string | null;
  price: string | null;
  age: string | null;
  year: string | null;
  batch: string | null;
  barrel: string | null;
  alcoholPercent: string | null;
  proof: string | null;
  size: string | null;
  color: string | null;
  finishing: string | null;
  imageUrl: string | null;
  openDate: string | null;
  killDate: string | null;
  redisId: string | null;
}

export interface SettingData {
  date: string;
  setting: string;
  glassware: string;
  restTime: string;
  nose: string;
  palate: string;
  finish: string;
  thoughts: string;
  redisId: string;
}

export interface NotesData {
  pepper: number;
  bakingSpice: number;
  cinnamon: number;
  herbal: number;
  mint: number;
  cherry: number;
  strawberry: number;
  raspberry: number;
  blackberry: number;
  blueberry: number;
  apple: number;
  banana: number;
  grape: number;
  stone: number;
  citrus: number;
  tropical: number;
  coffee: number;
  tobacco: number;
  leather: number;
  oak: number;
  toasted: number;
  smokey: number;
  peanut: number;
  almond: number;
  pecan: number;
  walnut: number;
  oily: number;
  floral: number;
  corn: number;
  rye: number;
  wheat: number;
  malt: number;
  dough: number;
  vanilla: number;
  caramel: number;
  molasses: number;
  butterscotch: number;
  honey: number;
  chocolate: number;
  toffee: number;
  sugar: number;
  overallRating: number;
  value: number;
  redisId: string;
}
