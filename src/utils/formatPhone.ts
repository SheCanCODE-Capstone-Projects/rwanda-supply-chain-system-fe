export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.length < 10) {
    return value;
  }

  const countryCode = digits.length > 10 ? `+${digits.slice(0, -10)} ` : "";
  const area = digits.slice(-10, -7);
  const prefix = digits.slice(-7, -4);
  const line = digits.slice(-4);

  return `${countryCode}(${area}) ${prefix}-${line}`;
}
