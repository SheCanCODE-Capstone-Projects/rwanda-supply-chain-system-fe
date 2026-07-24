"use client";

import { useMemo, useState } from "react";

export function usePagination(totalItems: number, pageSize = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return useMemo(
    () => ({
      page,
      pageSize,
      totalPages,
      offset: (page - 1) * pageSize,
      setPage(nextPage: number) {
        setPage(Math.min(Math.max(nextPage, 1), totalPages));
      },
    }),
    [page, pageSize, totalPages],
  );
}
