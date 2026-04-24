"use client";

import { useState } from "react";

interface SopStep {
  text: string;
  link?: { label: string; url: string };
  sub?: string[];
  img?: string;
}

interface Sop {
  id: string;
  title: string;
  trigger: string;
  steps: SopStep[];
  notes?: string[];
}

const sops: Sop[] = [
  {
    id: "shipment-script",
    title: "Shipment > 48 hrs & Script > 24 hrs",
    trigger: "Daily — overdue order follow-up",
    steps: [
      { text: "Go to EMR orders", link: { label: "emr.portals.care/orders", url: "https://emr.portals.care/orders" } },
      { text: "Clear all filters at the top" },
      { text: "Click Export" },
      { text: "Select date range: 04-13-2026 and beyond", img: "/date-range.png" },
      { text: "Download CSV" },
      { text: "Go to 2026.04 Beluga Order Follow-Up Tracker", link: { label: "Open sheet", url: "https://docs.google.com/spreadsheets/d/1TwSF29cDf6Sr8LufMTHHLMQxMVOC48hmdsnsGa9M-_8/edit?gid=1717606717#gid=1717606717" } },
      { text: "Click the Orders tab next to Help", img: "/orders-tab.png" },
      { text: "Import the CSV from EMR orders" },
      {
        text: "Two Slack messages auto-send, tagging Megan & Neil (Beluga):",
        sub: [
          "MasterIDs in awaiting shipment > 48 hrs",
          "MasterIDs in awaiting script > 24 hrs",
        ],
      },
    ],
    notes: [
      "Known issue: shipping webhooks haven't been firing reliably to Beluga — some orders show awaiting shipment but have already shipped with a tracking number.",
    ],
  },
  {
    id: "sms-cart",
    title: "SMS — Cart Abandonments",
    trigger: "Manual outreach — Twilio/CIO evaluation in progress",
    steps: [
      { text: "Go to CRM leads", link: { label: "crm.portals.care/leads", url: "https://crm.portals.care/leads" } },
      { text: "Adjust Start Date and End Date under Created", img: "/crm-date.png" },
      { text: "Click Export Leads" },
      { text: "Go to 2026.04 Lead Tracking", link: { label: "Open sheet", url: "https://docs.google.com/spreadsheets/d/1TrrFFqERlWLPcCpCNLyJnf4TLh7azIYiA4mhK_H0a6w/edit?gid=260419793#gid=260419793" } },
      { text: "Click Lead Import tab next to Help" },
      { text: "Import the CSV from CRM leads" },
      { text: "Filter Column E by Status = new", img: "/new-converted.png" },
      { text: "Fill Column J (POC) as yourself" },
      { text: "Fill Columns K–Q over the next 7 days — log the date each SMS was sent" },
    ],
    notes: [
      "To find the abandoned product: search email in customer.io → Activity Logs → CarePortals Cart Checkout → events attribute shows product_name_1, product_name_2, etc.",
      "Cart abandonment product details also emailed to alec.liberman@enhanced.org and sean.lim@enhanced.org.",
    ],
  },
  {
    id: "requirements",
    title: "Requirements > 24 hrs",
    trigger: "Manual SMS outreach — Twilio/CIO evaluation in progress",
    steps: [
      { text: "Go to EMR orders", link: { label: "emr.portals.care/orders", url: "https://emr.portals.care/orders" } },
      { text: "Clear all filters at the top" },
      { text: "Click Export" },
      { text: "Select date range: 04-13-2026 and beyond", img: "/date-range.png" },
      { text: "Download CSV" },
      { text: "Go to 2026.04 Awaiting Requirements", link: { label: "Open sheet", url: "https://docs.google.com/spreadsheets/d/11Um510a16nn2gTjJRtG9N57BdwZJXbbx2Phb04tjBLo/edit?gid=479857090#gid=479857090" } },
      { text: "Click the Orders tab next to Help", img: "/orders-tab.png" },
      { text: "Import the CSV from EMR orders" },
      { text: "Check Requirements >24h column for all orders stuck over 24 hours" },
      { text: "Fill Column J (POC) as yourself" },
      { text: "Fill Columns K–Q over the next 7 days — log the date of each follow-up" },
    ],
  },
];

function SopCard({ sop }: { sop: Sop }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <div>
          <p className="text-sm font-semibold text-slate-900">{sop.title}</p>
          <p className="text-xs text-slate-500 mt-0.5">{sop.trigger}</p>
        </div>
        <svg
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 16 16"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="px-4 py-4 border-t border-slate-100">
          <ol className="space-y-3">
            {sop.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-[11px] font-mono text-slate-400 pt-0.5 w-5 flex-shrink-0">{i + 1}</span>
                <div>
                  <p className="text-sm text-slate-800">
                    {step.text}
                    {step.link && (
                      <>
                        {" — "}
                        <a
                          href={step.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                        >
                          {step.link.label} →
                        </a>
                      </>
                    )}
                  </p>
                  {step.img && (
                    <img src={step.img} alt="" className="mt-2 rounded-lg border border-slate-200 max-w-xs" />
                  )}
                  {step.sub && (
                    <ul className="mt-1.5 space-y-1 pl-2">
                      {step.sub.map((s) => (
                        <li key={s} className="text-xs text-slate-500 flex gap-2">
                          <span className="text-slate-300 mt-px">–</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {sop.notes && sop.notes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
              {sop.notes.map((note) => (
                <p key={note} className="text-xs text-slate-500 leading-relaxed">
                  <span className="font-semibold text-slate-600">Note:</span> {note}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SopsPage() {
  return (
    <div className="p-10 max-w-3xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">SOP Workflows</h2>
        <p className="text-sm text-slate-500 mt-1">
          Step-by-step procedures for overdue orders, cart abandonment SMS, and requirements follow-up.
        </p>
      </div>

      <div className="space-y-3">
        {sops.map((sop) => (
          <SopCard key={sop.id} sop={sop} />
        ))}
      </div>
    </div>
  );
}
