import Link from "next/link";

const sections = [
  {
    href: "/sops",
    title: "SOP Workflows",
    description: "Step-by-step procedures for overdue shipments, cart abandonment SMS, and requirements follow-up.",
    meta: "3 procedures",
  },
  {
    href: "/webhooks",
    title: "Webhooks & Segments",
    description: "CIO webhook triggers and their corresponding CIO segments for each patient event.",
    meta: "10 webhooks · 10 segments",
  },
  {
    href: "/emails",
    title: "Email Workflows",
    description: "Current CarePortals email system being migrated to Customer.io, with all workflow and template links.",
    meta: "9 active · 3 to build",
  },
  {
    href: "/order-states",
    title: "Order States",
    description: "Step-by-step order flows for Non-TRT vs TRT/Enclomiphene products with SLA expectations.",
    meta: "5-step and 7-step flows",
  },
];

export default function Home() {
  return (
    <div className="p-10 max-w-3xl">
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Overview</h2>
        <p className="text-sm text-slate-500 mt-1">
          A central knowledge base as we transition into a more sophisticated clinical ops system.
        </p>
      </div>

      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Key Stakeholders</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-semibold text-slate-900">CarePortals</p>
              <span className="text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5">Patient Portal</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              POC for all patient portal and tech. Owns everything up to clinician review — checkout, medical questionnaires, status updates. Relies on webhooks from Beluga and pharmacies to keep statuses accurate.
            </p>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-semibold text-slate-900">Beluga</p>
              <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5">Medical Provider</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Questions on protocols, medication types, fulfillment, and shipments. Clinician review and everything post-approval runs through them.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">SLA Standards</p>
        <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-white">
            <span className="text-sm text-slate-700">Awaiting Script → Awaiting Shipment</span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
              24 hrs
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-white">
            <span className="text-sm text-slate-700">Awaiting Shipment → Shipped</span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
              48 hrs
            </span>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Key Spreadsheets</p>
          <Link href="/sops" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1">
            View SOPs
            <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
              <path d="M4.5 2.5l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
          {[
            {
              label: "2026.04 Beluga Order Follow-Up Tracker",
              desc: "Overdue shipment & script tracking — imports from EMR",
              url: "https://docs.google.com/spreadsheets/d/1TwSF29cDf6Sr8LufMTHHLMQxMVOC48hmdsnsGa9M-_8/edit?gid=1717606717#gid=1717606717",
            },
            {
              label: "2026.04 Awaiting Requirements",
              desc: "Orders stuck in awaiting requirements > 24 hrs",
              url: "https://docs.google.com/spreadsheets/d/11Um510a16nn2gTjJRtG9N57BdwZJXbbx2Phb04tjBLo/edit?gid=479857090#gid=479857090",
            },
            {
              label: "2026.04 Lead Tracking",
              desc: "Cart abandonment SMS follow-up — imports from CRM",
              url: "https://docs.google.com/spreadsheets/d/1TrrFFqERlWLPcCpCNLyJnf4TLh7azIYiA4mhK_H0a6w/edit?gid=260419793#gid=260419793",
            },
          ].map(({ label, desc, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3.5 bg-white hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                  <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </div>
              <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 flex-shrink-0 ml-3 transition-colors" fill="none" viewBox="0 0 14 14">
                <path d="M2.5 11.5l9-9M5 2.5h6.5V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Sections</p>
        <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
          {sections.map(({ href, title, description, meta }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between px-4 py-4 bg-white hover:bg-slate-50 transition-colors group"
            >
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-slate-400 hidden sm:block">{meta}</span>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" fill="none" viewBox="0 0 16 16">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
