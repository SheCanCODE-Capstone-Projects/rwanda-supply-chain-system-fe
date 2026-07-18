import { AuthLayoutProps } from "./AuthLayout.types";

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-start justify-center bg-(--surface) px-4 py-12 sm:items-center">
      <div className="w-full max-w-xl rounded-2xl border border-(--border) bg-white shadow-sm p-8">
        {/* Brand mark */}
        <div className="mb-8 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--primary)">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z"
                fill="white"
                fillOpacity="0.9"
              />
            </svg>
          </span>
          <span className="text-sm font-semibold text-(--text)">RSCN</span>
        </div>

        {children}
      </div>
    </div>
  );
}