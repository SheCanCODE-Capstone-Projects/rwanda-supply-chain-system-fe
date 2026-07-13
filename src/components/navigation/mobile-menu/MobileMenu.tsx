// "use client";

// import Link from "next/link";
// import { useState } from "react";

// import { Button } from "@/components/ui/Button";
// import { PUBLIC_NAVIGATION } from "@/config/navigation";

// export function MobileMenu() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="md:hidden">
//       <Button variant="secondary" onClick={() => setOpen((value) => !value)}>
//         Menu
//       </Button>
//       {open ? (
//         <nav className="mt-3 grid gap-2 rounded-lg border border-(--border) bg-white p-3 shadow-sm">
//           {PUBLIC_NAVIGATION.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="rounded-md px-3 py-2 text-sm font-medium text-(--text-secondary) hover:bg-(--surface)"
//               onClick={() => setOpen(false)}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       ) : null}
//     </div>
//   );
// }
