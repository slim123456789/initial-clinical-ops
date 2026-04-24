const webhooks = [
  { label: "Customer Sign Up", trigger: "customer.signup", url: "https://crm.portals.care/workflows/69e3fbfa49df2ff279d3df21" },
  { label: "Order Created", trigger: "order.created", url: "https://crm.portals.care/workflows/69e90e995f01a692554182d1" },
  { label: "Cart Creation", trigger: "cart.checkout", url: "https://crm.portals.care/workflows/69e91d0fc33bfc6742c4967d" },
  { label: "Awaiting Script", trigger: "order.awaiting_script", url: "https://crm.portals.care/workflows/69e93559ea6c9db470b05250" },
  { label: "Awaiting Fulfillment", trigger: "order.awaiting_fulfillment", url: "https://crm.portals.care/workflows/69e937205b9279671bdc9c5d" },
  { label: "Awaiting Shipment", trigger: "order.awaiting_shipment", url: "https://crm.portals.care/workflows/69e93ab0058ac1b81a077445" },
  { label: "Order Shipped", trigger: "order.shipped", url: "https://crm.portals.care/workflows/69e93b901c3f47b88708b113" },
  { label: "Awaiting Blood Test (TRT & Enclo)", trigger: "order.awaiting_results", url: "https://crm.portals.care/workflows/69eb079d5b9e049dbc0d3952" },
  { label: "Upcoming Subscription Renewal", trigger: "subscription.upcoming-renewal", url: "https://crm.portals.care/workflows/69eb09fd5b9e049dbc0d398f" },
  { label: "Incoming Message", trigger: "message.inbound", url: "https://crm.portals.care/workflows/69eb0b59e8d3648e5705ef50" },
];

const segments = [
  { label: "Account Creation", trigger: "customer.signup", url: "https://fly.customer.io/workspaces/186488/journeys/segments/205/overview" },
  { label: "Order Created", trigger: "order.created", url: "https://fly.customer.io/workspaces/186488/journeys/segments/207/overview" },
  { label: "Cart Checkout", trigger: "cart.checkout", url: "https://fly.customer.io/workspaces/186488/journeys/segments/208/overview" },
  { label: "Awaiting Script", trigger: "order.awaiting_script", url: "https://fly.customer.io/workspaces/186488/journeys/segments/209/overview" },
  { label: "Awaiting Fulfilment", trigger: "order.awaiting_fulfillment", url: "https://fly.customer.io/workspaces/186488/journeys/segments/210/overview" },
  { label: "Awaiting Shipment", trigger: "order.awaiting_shipment", url: "https://fly.customer.io/workspaces/186488/journeys/segments/211/overview" },
  { label: "Order Shipped", trigger: "order.shipped", url: "https://fly.customer.io/workspaces/186488/journeys/segments/212/overview" },
  { label: "Blood Test Needed (TRT & Enclo)", trigger: "order.awaiting_results", url: "https://fly.customer.io/workspaces/186488/journeys/segments/217/overview" },
  { label: "Upcoming Subscription Renewal", trigger: "subscription.upcoming-renewal", url: "https://fly.customer.io/workspaces/186488/journeys/segments/218/overview" },
  { label: "Message Inbound", trigger: "message.inbound", url: "https://fly.customer.io/workspaces/186488/journeys/segments/219/overview" },
];

function Table({
  title,
  subtitle,
  rows,
  showTrigger = false,
}: {
  title: string;
  subtitle: string;
  rows: { label: string; trigger: string; url: string }[];
  showTrigger?: boolean;
}) {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map(({ label, trigger, url }, i) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
          >
            <span className="text-[11px] font-mono text-slate-300 w-5 flex-shrink-0">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-800 group-hover:text-indigo-600 transition-colors">{label}</p>
              {showTrigger && <code className="text-[11px] text-slate-400 font-mono">{trigger}</code>}
            </div>
            <svg className="w-3 h-3 text-slate-300 group-hover:text-indigo-400 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 12 12">
              <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function WebhooksPage() {
  return (
    <div className="p-10 max-w-5xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Webhooks & Segments</h2>
        <p className="text-sm text-slate-500 mt-1">
          CarePortals fires these webhooks into Customer.io. Each has a matching CIO segment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Table
          title="CIO Webhooks"
          subtitle="CarePortals → Customer.io"
          rows={webhooks}
          showTrigger
        />
        <Table
          title="CIO Segments"
          subtitle="Segment per webhook in Customer.io"
          rows={segments}
        />
      </div>
    </div>
  );
}
