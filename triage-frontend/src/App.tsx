import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const buildData = [
  { day: "Mon", failed: 5 },
  { day: "Tue", failed: 8 },
  { day: "Wed", failed: 3 },
  { day: "Thu", failed: 10 },
  { day: "Fri", failed: 6 },
  { day: "Sat", failed: 4 },
  { day: "Sun", failed: 7 },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [showDiagnosisDetails, setShowDiagnosisDetails] = useState(false);
  return (
    <div className="min-h-screen bg-slate-950 text-white md:flex">
      <aside className="border-b border-slate-800 bg-slate-900 p-6 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
        <h1 className="text-3xl font-bold text-violet-400">Triage</h1>
        <p className="mt-1 text-sm text-slate-400">CI Failure Investigator</p>

        <nav className="mt-8 flex gap-3 overflow-x-auto md:flex-col">
          <button
            onClick={() => setActivePage("Dashboard")}
            className={`rounded-lg px-4 py-3 text-left transition-all duration-200 ${
            activePage === "Dashboard"
            ? "bg-violet-500/20 text-violet-300 shadow-sm shadow-violet-500/10"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActivePage("Run History")}
            className={`rounded-lg px-4 py-3 text-left transition-all duration-200 ${
              activePage === "Run History"
                ? "bg-violet-500/20 text-violet-300 shadow-sm shadow-violet-500/10"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}

          >
            Run History
          </button>

          <button
            onClick={() => setActivePage("Diagnoses")}
            className={`rounded-lg px-4 py-3 text-left transition-all duration-200 ${
            activePage === "Diagnoses"
              ? "bg-violet-500/20 text-violet-300 shadow-sm shadow-violet-500/10"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
          >
            Diagnoses
          </button>
        </nav>
      </aside>

      
    <main className="min-w-0 flex-1 p-6 md:p-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>

    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{activePage}</h2>
          <p className="mt-2 text-slate-400">
            {activePage === "Dashboard"
              ? "Investigate failures. Find the cause. Ship with confidence."
              : activePage === "Run History"
                ? "View recent CI pipeline runs and their status."
                : "Review AI-powered analysis of build failures."}
          </p>
        </div>
        <span className="rounded-full bg-violet-500/15 px-4 py-2 text-sm text-violet-300">
          AI Failure Investigator
        </span>
      </header>

      {activePage === "Dashboard" ? (
        <>
          <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Runs" value="128" />
            <StatCard title="Failed Builds" value="12" />
            <StatCard title="Flaky Tests" value="4" />
            <StatCard title="Resolved" value="86" />
          </section>


          <section className="mt-8 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/30 p-5 transition-colors duration-200 hover:border-slate-700 sm:p-6">
            <h3 className="text-xl font-semibold">Build Failure Trend</h3>
            <p className="mt-1 text-sm text-slate-400">
              Failed builds over the last seven days
            </p>

            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={buildData}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis allowDecimals={false} stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="failed"
                    name="Failed builds"
                    stroke="#a78bfa"
                    strokeWidth={3}
                    dot={{ fill: "#a78bfa", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      ) : activePage === "Run History" ? (
        <RunHistory />
      ) : (
        
      <section className="mt-8 space-y-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-violet-500/40">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">Failed workflow</p>
              <h3 className="mt-1 text-xl font-semibold">Run #1042</h3>
              <p className="mt-1 text-sm text-slate-400">
                Branch: main
              </p>
        
      <button
        onClick={() => setActivePage("Run History")}
        className="mt-4 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
      >
            View Run History
      </button>

      </div>

      <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm text-red-300">
        Failed
      </span>
    </div>
  </div>

  <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-violet-500/40">
    <h3 className="text-lg font-semibold">Suspected Cause</h3>
    <p className="mt-3 text-slate-300">
      A test may have failed because the application returned an unexpected
      response. Check the test output and recent code changes to identify
      the exact cause.
    </p>
    <button
  onClick={() => setShowDiagnosisDetails(!showDiagnosisDetails)}
  className="mt-4 rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
>
  {showDiagnosisDetails ? "Hide Diagnosis Details" : "View Diagnosis Details"}
</button>

{showDiagnosisDetails && (
  <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800/60 p-4">
    <h4 className="font-medium text-violet-300">
      Failure Details
    </h4>
    <p className="mt-2 text-sm text-slate-300">
      The exact failure is not confirmed yet. Review the CI logs to find
      the failing test, compare recent commits, and rerun the test to
      check whether the failure is intermittent.
    </p>
  </div>
)}

    <p className="mt-3 text-xs text-amber-300">
      Example diagnosis — not yet generated by the AI backend.
    </p>
  </div>

  <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-violet-500/40">
    <h3 className="text-lg font-semibold">Suggested Next Steps</h3>

    
<div className="mt-4 space-y-4">
  <div className="flex gap-3">
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm text-violet-300">1</span>
    <div>
      <p className="font-medium text-white">Review failed test logs</p>
      <p className="mt-1 text-sm text-slate-400">Find the error message and identify which test failed.</p>
    </div>
  </div>
  <div className="flex gap-3">
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm text-violet-300">2</span>
    <div>
      <p className="font-medium text-white">Compare recent code changes</p>
      <p className="mt-1 text-sm text-slate-400">Check whether a recent commit may have introduced the failure.</p>
    </div>
  </div>
  <div className="flex gap-3">
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm text-violet-300">3</span>
    <div>
      <p className="font-medium text-white">Rerun the failed test</p>
      <p className="mt-1 text-sm text-slate-400">Check whether the failure happens consistently or intermittently.</p>
    </div>
  </div>
</div>

  </div>
</section>

      )}
    </main>
    </div>
  );
}


function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/50 hover:bg-slate-800/80 sm:p-6">
      <p className="whitespace-nowrap text-base text-slate-400 sm:text-lg">
        {title}
      </p>
      <p className="mt-3 text-3xl font-bold text-white sm:text-4xl">
        {value}
      </p>
    </div>
  );
}

function RunHistory() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const runs = [
    { id: "#1042", branch: "main", status: "Failed", time: "10 min ago" },
    { id: "#1041", branch: "develop", status: "Passed", time: "25 min ago" },
    { id: "#1040", branch: "main", status: "Failed", time: "1 hour ago" },
    { id: "#1039", branch: "feature/login", status: "Passed", time: "2 hours ago" },
  ];

  return (
    <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
      <h3 className="text-xl font-semibold">Run History</h3>
      <p className="mt-1 text-sm text-slate-400">
        View recent CI pipeline runs and their status.
      </p>
      <div className="mt-5">
  <label className="mr-3 text-sm text-slate-300">
    Filter by status:
  </label>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
  >
    <option value="All">All Runs</option>
    <option value="Failed">Failed</option>
    <option value="Passed">Passed</option>
  </select>
</div>
<div className="mt-4">
  <input
    type="text"
    placeholder="Search by run ID or branch..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 outline-none focus:border-violet-400"
  />
</div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-700 text-slate-400">
            <tr>
              <th className="px-4 py-3">Run ID</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Time</th>
            </tr>
          </thead>
          
<tbody>
  {runs
    .filter(
      (run) =>
        (statusFilter === "All" || run.status === statusFilter) &&
        (run.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          run.branch.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .map((run) => (
      <tr
        key={run.id}
        className="border-b border-slate-800 transition-colors duration-200 hover:bg-slate-800/60"
      >

        <td className="px-4 py-4">{run.id}</td>
        <td className="px-4 py-4">{run.branch}</td>
        <td className="px-4 py-4">
          <span
            className={
              run.status === "Failed"
                ? "inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300"
                : "inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300"
            }
          >
            {run.status}
          </span>
        </td>
        <td className="px-4 py-4 text-slate-400">{run.time}</td>
      </tr>
    ))}

  {runs.filter(
    (run) =>
      (statusFilter === "All" || run.status === statusFilter) &&
      (run.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        run.branch.toLowerCase().includes(searchTerm.toLowerCase()))
  ).length === 0 && (
    <tr>
      <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
        No runs found. Try a different search or status filter.
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>
    </section>
  );
}
export default App;
