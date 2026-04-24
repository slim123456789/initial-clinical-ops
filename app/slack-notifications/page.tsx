"use client";

import { useState } from "react";

interface SopStep {
  text: string;
  link?: { label: string; url: string };
  sub?: string[];
  img?: string;
}

const steps: SopStep[] = [
  { text: "Go to EMR orders", link: { label: "emr.portals.care/orders", url: "https://emr.portals.care/orders" } },
  { text: "Clear all filters at the top" },
  { text: "Click Export" },
  { text: "Select date range: 04-13-2026 and beyond", img: "/date-range.png" },
  { text: "Download CSV" },
  {
    text: "Go to 2026.04 Awaiting Reqs, Awaiting Script, Awaiting Shipment",
    link: { label: "Open sheet", url: "https://docs.google.com/spreadsheets/d/1gTiM7Qhb-kpVBrqaQFrSyCQTOLLpwdFZnTXPdEjrt00/edit?gid=929796637#gid=929796637" },
  },
  { text: "Click the Orders tab next to Help", img: "/orders-tab.png" },
  { text: "Import the CSV from EMR orders", img: "/import-csv.png" },
];

const slackChannels = [
  {
    channel: "careportals-awaiting-requirements",
    label: "Awaiting Requirements",
    description: "Tags patients stuck in requirements > 24 hrs. Outreach is personal — internal SMS follow-up sequence.",
    owner: "Internal",
    ownerColor: "indigo",
    note: "Minimum 7-day SMS sequence required for all awaiting requirements patients.",
    img: "/awaiting-requirements.png",
  },
  {
    channel: "careportals-awaiting-script",
    label: "Awaiting Script",
    description: "Tags patients awaiting script > 24 hrs. Escalates to Beluga for clinician review and script generation.",
    owner: "Beluga",
    ownerColor: "emerald",
    note: null,
    img: "/awaiting-script.png",
  },
  {
    channel: "careportals-awaiting-shipment",
    label: "Awaiting Shipment",
    description: "Tags patients awaiting shipment > 48 hrs. Escalates to TPH for fulfillment and tracking.",
    owner: "TPH",
    ownerColor: "amber",
    note: null,
    img: "/awaiting-shipment.png",
  },
];

const ownerStyles: Record<string, string> = {
  indigo: "text-indigo-700 bg-indigo-50 border-indigo-100",
  emerald: "text-emerald-700 bg-emerald-50 border-emerald-100",
  amber: "text-amber-700 bg-amber-50 border-amber-100",
};

function StepsCard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <div>
          <p className="text-sm font-semibold text-slate-900">Daily CSV Upload</p>
          <p className="text-xs text-slate-500 mt-0.5">Daily — Sean uploads EMR export each morning</p>
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
            {steps.map((step, i) => (
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
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default function SlackNotificationsPage() {
  return (
    <div className="p-10 max-w-3xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Automated Slack Notifications</h2>
        <p className="text-sm text-slate-500 mt-1">
          Daily EMR CSV upload triggers Slack messages tagging patients overdue across three order stages.
        </p>
        <p className="text-xs text-slate-400 mt-1">All stages below are post-purchase.</p>
      </div>

      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Glossary</p>
        <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
          {[
            { term: "Awaiting Results", def: "Order is waiting for the patient's medical questionnaire to be completed." },
            { term: "Awaiting Script", def: "Order is waiting for clinician review and approval." },
            { term: "Awaiting Shipment", def: "Order has been approved and scripted but not yet shipped." },
          ].map(({ term, def }) => (
            <div key={term} className="flex items-start gap-4 px-4 py-3 bg-white">
              <p className="text-sm font-medium text-slate-800 w-40 flex-shrink-0">{term}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{def}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Spreadsheet</p>
        <a
          href="https://docs.google.com/spreadsheets/d/1gTiM7Qhb-kpVBrqaQFrSyCQTOLLpwdFZnTXPdEjrt00/edit?gid=929796637#gid=929796637"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-4 py-3.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 16 16">
              <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                2026.04 Awaiting Reqs, Awaiting Script, Awaiting Shipment
              </p>
              <p className="text-xs text-slate-400">Imports from EMR — triggers Slack alerts on upload</p>
            </div>
          </div>
          <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 flex-shrink-0 ml-3 transition-colors" fill="none" viewBox="0 0 14 14">
            <path d="M2.5 11.5l9-9M5 2.5h6.5V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Upload Steps</p>
        <StepsCard />
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Slack Outputs</p>
        <div className="space-y-3">
          {slackChannels.map((ch) => (
            <div key={ch.channel} className="border border-slate-200 rounded-lg p-4 bg-white">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-slate-900">#{ch.channel}</p>
                  <span className={`text-[10px] font-medium border rounded px-1.5 py-0.5 ${ownerStyles[ch.ownerColor]}`}>
                    {ch.owner}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{ch.description}</p>
              {ch.note && (
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  <span className="font-semibold text-slate-600">Note:</span> {ch.note}
                </p>
              )}
              {ch.img && (
                <img src={ch.img} alt="" className="mt-3 rounded-lg border border-slate-200 max-w-sm" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Spreadsheet Tabs</p>
        <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
          {[
            { tab: "Shipment >24h", desc: "Orders awaiting shipment for over 24 hours" },
            { tab: "Results >24h", desc: "Orders awaiting questionnaire completion for over 24 hours" },
            { tab: "Script >24h", desc: "Orders awaiting clinician approval for over 24 hours" },
          ].map(({ tab, desc }) => (
            <div key={tab} className="flex items-center gap-3 px-4 py-3 bg-white">
              <code className="text-[11px] font-mono text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 flex-shrink-0">{tab}</code>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Next Steps</p>
        <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
          {[
            { label: "Ownership assignment", desc: "Decide who owns each Slack channel and is responsible for daily monitoring and follow-up. Add the right people — including Beluga and TPH contacts — to the relevant channels." },
            { label: "Awaiting requirements email sequence", desc: "Build a minimum 7-day email sequence to ensure patients complete their medical questionnaires." },
            { label: "SMS tooling decision", desc: "Evaluating Twilio, Customer.io, and Gorgias for automated SMS. Manual Slack monitoring will remain important even after automation — these channels are the source of truth for tracking and pushing Beluga/TPH." },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-start gap-4 px-4 py-3.5 bg-white">
              <div className="w-2 h-2 rounded-full bg-slate-300 flex-shrink-0 mt-1.5" />
              <div>
                <p className="text-sm font-medium text-slate-800">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
