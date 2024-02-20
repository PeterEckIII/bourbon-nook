export type Limit = 5 | 10 | 25 | 50 | 100;

export type WithSerializedTypes<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends Date | null
    ? string | null
    : T[K] extends Date | undefined
    ? string | undefined
    : T[K] extends Date | null | undefined
    ? string | null | undefined
    : T[K] extends bigint
    ? number
    : T[K] extends bigint | null
    ? number | null
    : T[K] extends bigint | undefined
    ? number | undefined
    : T[K] extends bigint | null | undefined
    ? number | null | undefined
    : T[K];
};
