export function assertNonNullable<T>(
  value: unknown,
  message?: string,
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(message || `Value is undefined or null`);
  }
}
