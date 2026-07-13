export function formatDate(
  value: string | number | Date,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    ...options,
  }).format(new Date(value));
}
