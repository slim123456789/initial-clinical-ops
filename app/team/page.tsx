const teamMembers = [
  {
    name: "Alec",
    org: "Internal",
    responsibilities: "SOP workflows, Requirements >24h follow-up, email logic (shared with Sean)",
  },
  {
    name: "Sean",
    org: "Internal",
    responsibilities: "Email logic and triggers (shared with Alec), all tool/integration issues — CIO, webhooks, Sheets",
  },
  {
    name: "Rosie & Redwood",
    org: "Internal",
    responsibilities: "Email template builds in Customer.io",
  },
  {
    name: "Betty",
    org: "Internal",
    responsibilities: "Cart abandonment SMS follow-up",
  },
  {
    name: "Megan & Neil",
    org: "Beluga",
    responsibilities: "Everything about orders, medication, fulfillment, shipment",
  },
  {
    name: "Elizabeth",
    org: "Beluga",
    responsibilities: "System-level issues on Beluga's side — escalation if Megan/Neil don't respond",
  },
  {
    name: "Yaseen & Ibrahim",
    org: "CarePortals",
    responsibilities: "Questions about anything before the patient completes their questionnaire",
  },
  {
    name: "Andrew",
    org: "Internal",
    responsibilities: "General guidance when you're not sure who owns something",
  },
];

const escalations = [
  {
    situation: "Overdue orders",
    path: "Slack auto-pings Megan & Neil on import. No response → Elizabeth.",
  },
  {
    situation: "Tool breaks (CIO, Sheets, webhooks)",
    path: "Sean first.",
  },
  {
    situation: "System issue on Beluga's side",
    path: "Elizabeth directly.",
  },
  {
    situation: "Pre-questionnaire questions",
    path: "Yaseen or Ibrahim (CarePortals).",
  },
  {
    situation: "Not sure who to ask",
    path: "Andrew.",
  },
];

const orgColor: Record<string, string> = {
  Internal: "text-slate-600 bg-slate-100",
  Beluga: "text-indigo-700 bg-indigo-50",
  CarePortals: "text-emerald-700 bg-emerald-50",
};

export default function TeamPage() {
  return (
    <div className="p-10 max-w-3xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Team & Escalations</h2>
        <p className="text-sm text-slate-500 mt-1">Who owns what, and who to contact when things break.</p>
      </div>

      <section className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Ownership</p>
        <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
          {teamMembers.map(({ name, org, responsibilities }) => (
            <div key={name} className="flex items-start gap-4 px-4 py-3">
              <div className="w-32 flex-shrink-0">
                <p className="text-sm font-medium text-slate-900">{name}</p>
                <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded mt-0.5 ${orgColor[org]}`}>
                  {org}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{responsibilities}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Escalation Paths</p>
        <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
          {escalations.map(({ situation, path }) => (
            <div key={situation} className="flex items-start gap-4 px-4 py-3">
              <div className="w-56 flex-shrink-0">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">If</p>
                <p className="text-sm text-slate-800 mt-0.5">{situation}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Then</p>
                <p className="text-sm text-slate-700 mt-0.5">{path}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
