import { Search } from "lucide-react";

export function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm">
      <Search className="h-4 w-4 text-muted-foreground" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
      />
    </label>
  );
}
