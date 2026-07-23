"use client";
import { useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import type { ProfileDocument } from "@/lib/auth/onboarding";

export type UploadedDocument = {
  key: string;
  label: string;
  name: string;
  size: number;
  type: string;
  progress: number;
};

const allowedTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);
const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];

export function DocumentUpload({ documents, value, onChange }: { documents: ProfileDocument[]; value: UploadedDocument[]; onChange: (files: UploadedDocument[]) => void }) {
  const [activeKey, setActiveKey] = useState(documents[0]?.key ?? "");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeDoc = documents.find((doc) => doc.key === activeKey) ?? documents[0];

  function addFiles(files: FileList | File[]) {
    if (!activeDoc) return;
    setError(null);
    const next: UploadedDocument[] = [];
    Array.from(files).forEach((file) => {
      const extensionOk = allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
      if (!allowedTypes.has(file.type) && !extensionOk) {
        setError("Only PDF, JPG, JPEG, and PNG files are supported.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Each file must be 10 MB or smaller.");
        return;
      }
      next.push({ key: activeDoc.key, label: activeDoc.label, name: file.name, size: file.size, type: file.type || "unknown", progress: 100 });
    });
    if (next.length) onChange([...value, ...next]);
  }

  if (documents.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {documents.map((doc) => {
          const count = value.filter((file) => file.key === doc.key).length;
          return (
            <button
              type="button"
              key={doc.key}
              onClick={() => setActiveKey(doc.key)}
              className={`rounded-lg border px-3 py-2 text-left text-sm ${activeKey === doc.key ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-surface"}`}
            >
              <span className="font-medium">{doc.label}</span>
              <span className="ml-1 text-xs text-muted-foreground">{doc.required ? "Required" : "Optional"}</span>
              {count > 0 && <span className="mt-1 block text-xs text-success">{count} file{count === 1 ? "" : "s"} attached</span>}
            </button>
          );
        })}
      </div>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files); }}
        className="rounded-xl border border-dashed border-border bg-surface p-5 text-center"
      >
        <Upload className="mx-auto h-6 w-6 text-primary" />
        <p className="mt-2 text-sm font-medium">Upload {activeDoc?.label}</p>
        <p className="mt-1 text-xs text-muted-foreground">Drag and drop multiple files, or choose PDF/JPG/PNG files.</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-3 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-surface">Choose files</button>
        <input ref={inputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(event) => event.target.files && addFiles(event.target.files)} />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}

      {value.length > 0 && (
        <ul className="space-y-2">
          {value.map((file, index) => (
            <li key={`${file.key}-${file.name}-${index}`} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 text-sm">
              <FileText className="h-4 w-4 text-primary" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{file.name}</div>
                <div className="text-xs text-muted-foreground">{file.label} · {(file.size / 1024).toFixed(1)} KB · Uploaded</div>
                <div className="mt-1 h-1.5 rounded-full bg-surface"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${file.progress}%` }} /></div>
              </div>
              <button type="button" onClick={() => onChange(value.filter((_, i) => i !== index))} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-surface" aria-label={`Remove ${file.name}`}>
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
