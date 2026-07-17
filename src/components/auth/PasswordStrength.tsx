export function scorePassword(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 5);
}

const LABELS = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong", "Very Strong"];
const COLORS = ["bg-danger", "bg-danger", "bg-warning", "bg-warning", "bg-primary", "bg-primary"];

export function PasswordStrength({ value }: { value: string }) {
  const score = scorePassword(value);
  const label = value ? LABELS[score] : "";
  const checks = [
    { ok: value.length >= 8, label: "At least 8 characters" },
    { ok: /[A-Z]/.test(value), label: "Uppercase letter" },
    { ok: /[a-z]/.test(value), label: "Lowercase letter" },
    { ok: /\d/.test(value), label: "Number" },
    { ok: /[^A-Za-z0-9]/.test(value), label: "Special character" },
  ];
  return (
    <div className="mt-2 space-y-2">
      <div className="grid grid-cols-5 gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-colors ${
              i < score ? COLORS[score] : "bg-border"
            }`}
          />
        ))}
      </div>
      {value && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Strength</span>
          <span
            className={
              score <= 1 ? "font-medium text-danger" : score <= 3 ? "font-medium text-warning" : "font-medium text-primary"
            }
          >
            {label}
          </span>
        </div>
      )}
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
        {checks.map((c) => (
          <li key={c.label} className={c.ok ? "text-primary" : "text-muted-foreground"}>
            {c.ok ? "✓" : "○"} {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
