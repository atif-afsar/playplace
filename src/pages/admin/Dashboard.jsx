import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import SetupNotice from "../../components/admin/SetupNotice";
import StatusBadge from "../../components/common/StatusBadge";

const GRADE_COLORS = {
  Playgroup: "var(--color-primary-container)",
  Nursery: "var(--color-tertiary-container)",
  "Kindergarten 1": "var(--color-secondary-container)",
  "Kindergarten 2": "var(--color-surface-variant)",
};
const PALETTE = [
  "var(--color-primary-container)",
  "var(--color-tertiary-container)",
  "var(--color-secondary-container)",
  "var(--color-surface-variant)",
  "var(--color-tertiary-fixed-dim)",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function StatCard({ icon, iconColor, label, value, sub, subColor = "text-on-surface-variant" }) {
  return (
    <div className="group cursor-default rounded-2xl border-2 border-surface-variant bg-surface-container-lowest p-6 shadow-[0_10px_30px_-5px_rgba(159,65,34,0.1)] transition-transform hover:scale-105">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:rotate-12 ${iconColor}`}
      >
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </div>
      <p className="text-sm font-bold text-on-surface-variant">{label}</p>
      <p className="text-3xl font-black text-on-surface">{value}</p>
      {sub && <p className={`mt-2 text-xs font-bold ${subColor}`}>{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      const [studentsRes, admissionsRes] = await Promise.all([
        supabase.from("students").select("id, class, status"),
        supabase.from("admissions").select("id, child_name, parent_name, phone, class_applied, status, created_at"),
      ]);

      if (studentsRes.error || admissionsRes.error) {
        setError(studentsRes.error?.message || admissionsRes.error?.message);
      } else {
        setStudents(studentsRes.data ?? []);
        setAdmissions(admissionsRes.data ?? []);
      }
      setLoading(false);
    })();
  }, []);

  const stats = useMemo(() => {
    const pending = admissions.filter((a) => a.status === "pending").length;
    const approved = admissions.filter((a) => a.status === "approved").length;
    return {
      totalStudents: students.length,
      pending,
      approved,
      totalApplications: admissions.length,
    };
  }, [students, admissions]);

  const monthly = useMemo(() => {
    const now = new Date();
    const buckets = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      buckets.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: MONTHS[d.getMonth()], count: 0 });
    }
    const index = Object.fromEntries(buckets.map((b, i) => [b.key, i]));
    admissions.forEach((a) => {
      if (!a.created_at) return;
      const d = new Date(a.created_at);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (key in index) buckets[index[key]].count += 1;
    });
    const max = Math.max(1, ...buckets.map((b) => b.count));
    return buckets.map((b) => ({ ...b, pct: Math.round((b.count / max) * 100) }));
  }, [admissions]);

  const distribution = useMemo(() => {
    const counts = {};
    students.forEach((s) => {
      const cls = s.class || "Unassigned";
      counts[cls] = (counts[cls] || 0) + 1;
    });
    const total = students.length || 0;
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    let acc = 0;
    const segments = entries.map(([name, count], i) => {
      const pct = total ? (count / total) * 100 : 0;
      const seg = {
        name,
        count,
        pct: Math.round(pct),
        color: GRADE_COLORS[name] || PALETTE[i % PALETTE.length],
        from: acc,
        to: acc + pct,
      };
      acc += pct;
      return seg;
    });
    return { total, segments };
  }, [students]);

  const recent = useMemo(
    () =>
      [...admissions]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5),
    [admissions]
  );

  const conic = distribution.segments.length
    ? `conic-gradient(${distribution.segments
        .map((s) => `${s.color} ${s.from}% ${s.to}%`)
        .join(", ")})`
    : "conic-gradient(var(--color-surface-variant) 0% 100%)";

  return (
    <AdminLayout
      breadcrumb="Dashboard"
      title="Good Morning! ☀️"
      description="Here's what's happening at Play Place today."
      actions={
        <Link
          to="/admin/admissions"
          className="bouncy-button flex items-center gap-2 rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container"
        >
          <span className="material-symbols-outlined">how_to_reg</span>
          Review Admissions
        </Link>
      }
    >
      {!isSupabaseConfigured ? (
        <SetupNotice />
      ) : error ? (
        <div className="rounded-2xl border-2 border-error-container bg-error-container p-6 text-on-error-container">
          <p className="font-bold">Couldn't load dashboard data.</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : loading ? (
        <DashboardSkeleton />
      ) : (
        <div className="space-y-10">
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon="child_care"
              iconColor="bg-primary-container/20 text-primary-container"
              label="Total Students"
              value={stats.totalStudents}
              sub="Currently enrolled"
            />
            <StatCard
              icon="pending_actions"
              iconColor="bg-secondary-container/20 text-secondary"
              label="Pending Admissions"
              value={stats.pending}
              sub={stats.pending ? "Requires review" : "All caught up"}
              subColor={stats.pending ? "text-primary" : "text-tertiary"}
            />
            <StatCard
              icon="task_alt"
              iconColor="bg-tertiary-container/20 text-tertiary"
              label="Approved"
              value={stats.approved}
              sub="Ready to enroll"
              subColor="text-tertiary"
            />
            <StatCard
              icon="inbox"
              iconColor="bg-surface-variant/50 text-on-surface"
              label="Total Applications"
              value={stats.totalApplications}
              sub="All time"
            />
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border-2 border-surface-variant bg-surface-container-lowest p-6 shadow-[0_10px_30px_-5px_rgba(159,65,34,0.1)] lg:col-span-2">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-xl font-bold text-on-surface">Applications (Last 6 Months)</h3>
              </div>
              <div className="relative flex h-64 items-end justify-between gap-4 px-2">
                {monthly.map((m) => (
                  <div key={m.key} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <span className="text-xs font-bold text-on-surface-variant opacity-0 transition-opacity group-hover:opacity-100">
                      {m.count}
                    </span>
                    <div
                      className="w-full rounded-t-lg bg-primary-container transition-all group-hover:bg-primary"
                      style={{ height: `${Math.max(m.pct, 4)}%` }}
                    />
                    <span className="text-xs font-bold text-on-surface-variant">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border-2 border-surface-variant bg-surface-container-lowest p-6 shadow-[0_10px_30px_-5px_rgba(159,65,34,0.1)]">
              <h3 className="mb-8 text-xl font-bold text-on-surface">Student Grade Distribution</h3>
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="relative h-48 w-48 rounded-full shadow-inner" style={{ background: conic }}>
                  <div className="absolute inset-8 flex items-center justify-center rounded-full bg-surface-container-lowest shadow-lg">
                    <div className="text-center">
                      <p className="text-2xl font-black text-on-surface">{distribution.total}</p>
                      <p className="text-[10px] font-black uppercase text-on-surface-variant">Total</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 grid w-full grid-cols-2 gap-3">
                  {distribution.segments.length ? (
                    distribution.segments.map((s) => (
                      <div key={s.name} className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-xs font-bold text-on-surface-variant">
                          {s.name} ({s.pct}%)
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="col-span-2 text-center text-sm text-on-surface-variant">
                      No students enrolled yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border-2 border-surface-variant bg-surface-container-lowest p-6 shadow-[0_10px_30px_-5px_rgba(159,65,34,0.1)]">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-on-surface">Recent Admissions</h3>
              <Link to="/admin/admissions" className="text-sm font-bold text-primary hover:underline">
                View All Admissions
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-surface-variant text-left">
                    <th className="px-2 py-4 text-sm font-bold text-on-surface-variant">Student Name</th>
                    <th className="px-2 py-4 text-sm font-bold text-on-surface-variant">Parent Contact</th>
                    <th className="px-2 py-4 text-sm font-bold text-on-surface-variant">Grade Applied</th>
                    <th className="px-2 py-4 text-sm font-bold text-on-surface-variant">Date</th>
                    <th className="px-2 py-4 text-sm font-bold text-on-surface-variant">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant">
                  {recent.length ? (
                    recent.map((a) => (
                      <tr key={a.id} className="transition-colors hover:bg-surface-container-low">
                        <td className="px-2 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed text-xs font-bold text-on-primary-fixed">
                              {initials(a.child_name)}
                            </div>
                            <span className="font-medium text-on-surface">{a.child_name}</span>
                          </div>
                        </td>
                        <td className="px-2 py-4 font-medium text-on-surface-variant">{a.phone || "—"}</td>
                        <td className="px-2 py-4 font-medium">{a.class_applied || "—"}</td>
                        <td className="px-2 py-4 font-medium text-on-surface-variant">{formatDate(a.created_at)}</td>
                        <td className="px-2 py-4">
                          <StatusBadge status={a.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-2 py-10 text-center text-on-surface-variant">
                        No admissions yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-36 rounded-2xl border-2 border-surface-variant bg-surface-container-low" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-80 rounded-2xl border-2 border-surface-variant bg-surface-container-low lg:col-span-2" />
        <div className="h-80 rounded-2xl border-2 border-surface-variant bg-surface-container-low" />
      </div>
      <div className="h-64 rounded-2xl border-2 border-surface-variant bg-surface-container-low" />
    </div>
  );
}

function initials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
