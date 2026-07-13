// "use client";

// import Link from "next/link";
// import { useState } from "react";

// import { Avatar } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { getRoleNavigation } from "@/config/navigation";
// import { ROUTES } from "@/constants/routes";
// import { useAuth } from "@/hooks/useAuth";
// import { cn } from "@/lib/utils";

// type TopbarProps = {
//   title?: string;
// };

// export function Topbar({ title }: TopbarProps) {
//   const { currentUser } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobileNavOpen, setMobileNavOpen] = useState(false);
//   const navItems = getRoleNavigation(currentUser?.role);

//   return (
//     <>
//       <header className="sticky top-0 z-30 flex h-[var(--topbar-height)] shrink-0 items-center justify-between border-b border-[var(--border)] bg-white px-6">
//         {/* Mobile nav toggle */}
//         <div className="flex items-center gap-4">
//           <button
//             type="button"
//             className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface)] lg:hidden"
//             onClick={() => setMobileNavOpen((v) => !v)}
//             aria-label="Toggle navigation"
//           >
//             <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//               <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//             </svg>
//           </button>
//           {title && (
//             <h1 className="text-base font-semibold text-[var(--text)]">{title}</h1>
//           )}
//         </div>

//         {/* Right actions */}
//         <div className="flex items-center gap-3">
//           {/* Notifications bell */}
//           <button
//             type="button"
//             className="relative flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface)]"
//             aria-label="Notifications"
//           >
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//               <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//             </svg>
//             <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--danger)]" />
//           </button>

//           {/* User menu */}
//           {currentUser && (
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setMenuOpen((v) => !v)}
//                 className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[var(--surface)]"
//               >
//                 <Avatar name={currentUser.name} className="h-7 w-7 text-xs" />
//                 <span className="hidden text-sm font-medium text-[var(--text)] sm:block">
//                   {currentUser.name}
//                 </span>
//               </button>

//               {menuOpen && (
//                 <div className="animate-fade-in-scale absolute right-0 top-full mt-1 w-52 rounded-lg border border-[var(--border)] bg-white py-1 shadow-[var(--shadow-lg)]">
//                   <div className="border-b border-[var(--border)] px-4 py-2.5">
//                     <p className="text-sm font-medium text-[var(--text)]">{currentUser.name}</p>
//                     <p className="text-xs text-[var(--text-secondary)]">{currentUser.email}</p>
//                     <Badge tone="neutral" className="mt-1 text-[10px]">{currentUser.role}</Badge>
//                   </div>
//                   <Link
//                     href={`${ROUTES.ADMIN}/settings`}
//                     className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Settings
//                   </Link>
//                   <Link
//                     href={ROUTES.LOGIN}
//                     className="block px-4 py-2 text-sm text-[var(--danger)] hover:bg-[var(--danger-bg)]"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Sign out
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Mobile sidebar nav */}
//       {mobileNavOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileNavOpen(false)}>
//           <div className="absolute inset-0 bg-black/40" />
//           <nav
//             className="animate-slide-in-left absolute left-0 top-0 h-full w-72 bg-[var(--sidebar-bg)] p-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="mb-4 flex items-center gap-2 px-1">
//               <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-sm font-bold text-white">R</span>
//               <span className="text-base font-semibold text-white">RSCN</span>
//             </div>
//             <ul className="grid gap-0.5">
//               {navItems.map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     onClick={() => setMobileNavOpen(false)}
//                     className={cn(
//                       "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--sidebar-muted)] hover:bg-white/5 hover:text-white",
//                     )}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       )}
//     </>
//   );
// }
