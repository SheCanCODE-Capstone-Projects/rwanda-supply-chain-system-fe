"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/utils";

type ToastType = "success" | "error" | "warning" | "info";
type Toast = { id: string; type: ToastType; message: string; duration?: number };

type ToastCtx = { toast: (type: ToastType, message: string, duration?: number) => void };
const Ctx = createContext<ToastCtx>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, message: string, duration = 3500) => {
    const id = `t_${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message, duration }]);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-100 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={remove} />
        ))}
      </div>
    </Ctx.Provider>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(toast.id), toast.duration ?? 3500);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, toast.duration, onRemove]);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-success shrink-0" />,
    error: <XCircle className="h-4 w-4 text-danger shrink-0" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning shrink-0" />,
    info: <Info className="h-4 w-4 text-secondary shrink-0" />,
  };
  const borders = {
    success: "border-success/30 bg-success/5",
    error: "border-danger/30 bg-danger/5",
    warning: "border-warning/30 bg-warning/5",
    info: "border-secondary/30 bg-secondary/5",
  };

  return (
    <div className={cn(
      "pointer-events-auto flex items-start gap-3 rounded-xl border bg-background px-4 py-3 shadow-lg",
      borders[toast.type]
    )}>
      {icons[toast.type]}
      <span className="flex-1 text-sm">{toast.message}</span>
      <button onClick={() => onRemove(toast.id)} className="text-muted-foreground hover:text-foreground">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function useToast() { return useContext(Ctx); }
