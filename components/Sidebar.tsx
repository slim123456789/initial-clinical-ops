"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Overview",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".9"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".3"/>
      </svg>
    ),
  },
  {
    href: "/sops",
    label: "SOP Workflows",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 4h10M3 8h7M3 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/webhooks",
    label: "Webhooks & Segments",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8a5 5 0 0 1 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 8a5 5 0 0 1-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
        <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
        <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
        <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "/emails",
    label: "Email Workflows",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/order-states",
    label: "Order States",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v12M8 2l-3 3M8 2l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/slack-notifications",
    label: "Slack Notifications",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v7A1.5 1.5 0 0 1 12.5 12H9l-3 2v-2H3.5A1.5 1.5 0 0 1 2 10.5v-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen bg-slate-950 text-white flex flex-col flex-shrink-0">
      <div className="px-5 pt-6 pb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-1.5">
          CarePortals
        </p>
        <h1 className="text-[13px] font-semibold text-slate-100 leading-snug">
          Clinical Ops Overview
        </h1>
      </div>

      <div className="h-px bg-slate-800 mx-5" />

      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {navItems.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] font-medium transition-all ${
                active
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <span className={`flex-shrink-0 ${active ? "text-white" : "text-slate-500"}`}>
                {icon}
              </span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4">
        <p className="text-[11px] text-slate-600">April 2026</p>
      </div>
    </aside>
  );
}
