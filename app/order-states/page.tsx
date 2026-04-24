const nonTrtSteps = [
  { label: "Awaiting Requirements", detail: "Questionnaire to be completed" },
  { label: "Awaiting Script", detail: "Clinician approval" },
  { label: "Awaiting Fulfillment", detail: null },
  { label: "Awaiting Shipment", detail: null },
  { label: "Shipped", detail: null, terminal: true },
];

const trtSteps = [
  { label: "Awaiting Requirements", detail: null },
  { label: "Awaiting Script", detail: null },
  { label: "Awaiting Results", detail: "Blood test results pending" },
  { label: "Awaiting Script", detail: "Second script post blood test" },
  { label: "Awaiting Fulfillment", detail: null },
  { label: "Awaiting Shipment", detail: null },
  { label: "Shipped", detail: null, terminal: true },
];

interface Step {
  label: string;
  detail: string | null;
  terminal?: boolean;
}

function FlowColumn({ steps }: { steps: Step[] }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={`${step.label}-${i}`} className="flex gap-4">
            <div className="flex flex-col items-center pt-1">
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                  step.terminal ? "bg-emerald-500 ring-2 ring-emerald-200" : "bg-slate-300"
                }`}
              />
              {!isLast && <div className="w-px bg-slate-200 flex-1 mt-1.5 mb-0 min-h-[24px]" />}
            </div>
            <div className="pb-5">
              <p className={`text-sm font-medium ${step.terminal ? "text-emerald-700" : "text-slate-800"}`}>
                {step.label}
              </p>
              {step.detail && (
                <p className="text-xs text-slate-400 mt-0.5">{step.detail}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function OrderStatesPage() {
  return (
    <div className="p-10 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Order States</h2>
        <p className="text-sm text-slate-500 mt-1">
          Order progression by product type. TRT and Enclomiphene require an extra blood test loop.
        </p>
      </div>

      <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 mb-6">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-slate-700">Awaiting Script → Awaiting Shipment</span>
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
            24 hr SLA
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-slate-700">Awaiting Shipment → Shipped</span>
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
            48 hr SLA
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <p className="text-sm font-semibold text-slate-800">Non-TRT / Non-Enclomiphene</p>
            <p className="text-xs text-slate-500 mt-0.5">5 steps</p>
          </div>
          <div className="px-4 pt-4 pb-1">
            <FlowColumn steps={nonTrtSteps} />
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <p className="text-sm font-semibold text-slate-800">TRT / Enclomiphene</p>
            <p className="text-xs text-slate-500 mt-0.5">7 steps — includes blood test loop</p>
          </div>
          <div className="px-4 pt-4 pb-1">
            <FlowColumn steps={trtSteps} />
          </div>
        </div>
      </div>

      <div className="mt-5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
        <span className="font-semibold text-slate-700">TRT/Enclo note:</span> Labs booked via{" "}
        <a href="https://appointment.questdiagnostics.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
          Quest Diagnostics
        </a>
        . There is no way to confirm if a patient has booked their appointment — requisition is in the portal.
      </div>
    </div>
  );
}
