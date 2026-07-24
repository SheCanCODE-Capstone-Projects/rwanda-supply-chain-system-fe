export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
