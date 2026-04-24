interface EmailTemplate {
  url: string;
  timing: string;
}

interface EmailWorkflow {
  name: string;
  trigger: string;
  workflow: string;
  templates: EmailTemplate[];
  notes?: string[];
}

const currentEmails: EmailWorkflow[] = [
  {
    name: "Order Confirmation",
    trigger: "order.created",
    workflow: "https://crm.portals.care/workflows/69b3253f36bf706054b65f21",
    templates: [{ url: "https://crm.portals.care/email-templates/69b3253f36bf706054b65f19", timing: "On purchase" }],
    notes: ["One email per product — multiple products = multiple emails"],
  },
  {
    name: "Cart Abandonment",
    trigger: "cart.checkout",
    workflow: "https://crm.portals.care/workflows/69d432750b449247cb52acda",
    templates: [
      { url: "https://crm.portals.care/email-templates/69d4080c2f15db588528e478", timing: "30 min" },
      { url: "https://crm.portals.care/email-templates/69d4085e2dadff17c23cb6c1", timing: "+1 day" },
      { url: "https://crm.portals.care/email-templates/69d408c82dadff17c23cb6d7", timing: "+1 day" },
    ],
  },
  {
    name: "Pending Questionnaire",
    trigger: "order.awaiting_requirements",
    workflow: "https://crm.portals.care/workflows/69b3253f36bf706054b65f1a",
    templates: [
      { url: "https://crm.portals.care/email-templates/69d3f962d646e2796620a2ee", timing: "1 hr after order" },
      { url: "https://crm.portals.care/email-templates/69d3f85a8719337223915fd5", timing: "+1 day" },
      { url: "https://crm.portals.care/email-templates/69d3f8bd62202d8e5cac1093", timing: "+1 day" },
    ],
  },
  {
    name: "Awaiting Script",
    trigger: "order.awaiting_script",
    workflow: "https://crm.portals.care/workflows/69b3253f36bf706054b65f1c",
    templates: [
      { url: "https://crm.portals.care/email-templates/69d02056da3a08ba1253801d", timing: "On questionnaire submit" },
    ],
    notes: ["Questionnaire confirmation to patient"],
  },
  {
    name: "Incoming Message",
    trigger: "message.inbound",
    workflow: "https://crm.portals.care/workflows/69cfda5ffd1b3a86877ade43",
    templates: [
      { url: "https://crm.portals.care/email-templates/69d65ce70ae6221527609fe3", timing: "On message received" },
    ],
    notes: ["Notifies patient a message is waiting in their portal"],
  },
  {
    name: "Patient Disqualified",
    trigger: "order.disqualified",
    workflow: "https://crm.portals.care/workflows/69d520a281b4a94c5972baeb",
    templates: [
      { url: "https://crm.portals.care/email-templates/69d6d4bcbcfbb0fb6e587c83", timing: "On disqualification" },
    ],
  },
  {
    name: "Order Shipped",
    trigger: "order.shipped",
    workflow: "https://crm.portals.care/workflows/69b3253f36bf706054b65f22",
    templates: [
      { url: "https://crm.portals.care/email-templates/69d6769669a94389677bc713", timing: "On shipment" },
    ],
  },
  {
    name: "Subscription Renewal",
    trigger: "subscription.upcoming-renewal",
    workflow: "https://crm.portals.care/workflows/69b3253f36bf706054b65f28",
    templates: [
      { url: "https://crm.portals.care/email-templates/69b3253f36bf706054b65f17", timing: "7 days before" },
      { url: "https://crm.portals.care/email-templates/69d2d354e5ab8816d6f0e4cd", timing: "3 days before" },
    ],
  },
  {
    name: "Lab Instructions — TRT & Enclo",
    trigger: "order.awaiting_results",
    workflow: "https://crm.portals.care/workflows/69dcf0d965e8a749875965fc",
    templates: [
      { url: "https://crm.portals.care/email-templates/69dc2c2e2df88e74003efd57", timing: "After questionnaire" },
      { url: "https://crm.portals.care/email-templates/69dec1105c141d881996d4c8", timing: "+1 day" },
      { url: "https://crm.portals.care/email-templates/69df3429be55bb160766afc6", timing: "+1 day" },
    ],
    notes: ["No way to confirm if patient booked blood test · Requisition in portal · Labs via Quest Diagnostics"],
  },
];

const toBuild = [
  "7-day reminder sequence — Awaiting Requirements",
  "7-day reminder sequence — Awaiting Cart",
  "7-day reminder sequence — Awaiting Results (blood test)",
];

function EmailRow({ email, index }: { email: EmailWorkflow; index: number }) {
  return (
    <div className="px-5 py-4 hover:bg-slate-50/60 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-2.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-300 w-4">{index + 1}</span>
          <p className="text-sm font-semibold text-slate-900">{email.name}</p>
          <code className="text-[11px] font-mono text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">{email.trigger}</code>
        </div>
        <a
          href={email.workflow}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-md px-2.5 py-1 transition-all"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Workflow
        </a>
      </div>

      <div className="ml-6 flex flex-wrap items-center gap-2">
        {email.templates.map((t, i) => (
          <a
            key={t.url}
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-full px-3 py-1 transition-all"
          >
            <span className="text-[10px] font-semibold text-slate-400 group-hover:text-indigo-400 uppercase tracking-wide">
              T{i + 1}
            </span>
            <span className="text-xs text-slate-600 group-hover:text-indigo-700">{t.timing}</span>
          </a>
        ))}
      </div>

      {email.notes && (
        <div className="ml-6 mt-2">
          {email.notes.map((note) => (
            <p key={note} className="text-xs text-slate-400">{note}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EmailsPage() {
  return (
    <div className="p-10 max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Email Workflows</h2>
        <p className="text-sm text-slate-500 mt-1">
          Current CarePortals system — being migrated to Customer.io by Rosie & Redwood.
        </p>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 mb-6">
        {currentEmails.map((email, i) => (
          <EmailRow key={email.name} email={email} index={i} />
        ))}
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">To Build</p>
        <div className="border border-dashed border-slate-300 rounded-xl divide-y divide-slate-100 overflow-hidden">
          {toBuild.map((item) => (
            <div key={item} className="flex items-center gap-3 px-5 py-3">
              <div className="w-3.5 h-3.5 rounded border-2 border-slate-300 flex-shrink-0" />
              <p className="text-sm text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
