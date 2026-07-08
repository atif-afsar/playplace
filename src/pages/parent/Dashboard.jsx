import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ParentLayout from "../../components/parent/ParentLayout";
import { useAuth } from "../../context/AuthContext";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import StatusBadge from "../../components/common/StatusBadge";

const QUICK_LINKS = [
  { label: "Timetable", desc: "Weekly class schedule", icon: "calendar_month", to: "/parent/timetable", tone: "primary" },
  { label: "Report Card", desc: "Marks & grades", icon: "grade", to: "/parent/results", tone: "tertiary" },
  { label: "Fee Status", desc: "Paid & due fees", icon: "payments", to: "/parent/fees", tone: "secondary" },
  { label: "Notices", desc: "School announcements", icon: "campaign", to: "/parent/notices", tone: "primary" },
];

const TONES = {
  primary: "bg-primary-container/20 text-primary",
  tertiary: "bg-tertiary-container/30 text-tertiary",
  secondary: "bg-secondary-container/40 text-secondary",
};

export default function ParentDashboard() {
  const { profile, user } = useAuth();
  const [children, setChildren] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notices, setNotices] = useState([]);
  const [attendancePct, setAttendancePct] = useState(null);
  const [feesDue, setFeesDue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const didLoad = useRef(false);

  const loadData = useCallback(
    async ({ silent = false } = {}) => {
      if (!isSupabaseConfigured || !user) {
        setLoading(false);
        return;
      }
      if (silent) setRefreshing(true);
      else if (!didLoad.current) setLoading(true);

      const [studentsRes, admissionsRes, noticesRes] = await Promise.all([
        supabase
          .from("students")
          .select("id, full_name, class, roll_number, status")
          .eq("parent_id", user.id)
          .eq("status", "active"),
        // Match applications the parent submitted, by email.
        supabase
          .from("admissions")
          .select("id, child_name, class_applied, status, created_at")
          .eq("email", user.email)
          .order("created_at", { ascending: false }),
        supabase.from("notices").select("*").order("created_at", { ascending: false }).limit(3),
      ]);

      const kids = studentsRes.data ?? [];
      setChildren(kids);
      setApplications(admissionsRes.data ?? []);
      setNotices(noticesRes.data ?? []);

      // Attendance % + outstanding fees across the parent's children.
      const childIds = kids.map((k) => k.id);
      if (childIds.length) {
        const [attRes, feesRes] = await Promise.all([
          supabase.from("attendance").select("status").in("student_id", childIds),
          supabase.from("fees").select("amount, status").in("student_id", childIds),
        ]);
        const att = attRes.data ?? [];
        setAttendancePct(
          att.length ? Math.round((att.filter((a) => a.status === "present").length / att.length) * 100) : null
        );
        setFeesDue(
          (feesRes.data ?? [])
            .filter((f) => f.status !== "paid")
            .reduce((s, f) => s + Number(f.amount || 0), 0)
        );
      } else {
        setAttendancePct(null);
        setFeesDue(0);
      }

      didLoad.current = true;
      setLoading(false);
      setRefreshing(false);
    },
    [user]
  );

  // Initial load.
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Refetch when the tab regains focus, so an admin's approval shows up when
  // the parent switches back to this tab (works without realtime setup).
  useEffect(() => {
    const onFocus = () => loadData({ silent: true });
    const onVisible = () => {
      if (document.visibilityState === "visible") loadData({ silent: true });
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [loadData]);

  // Realtime: if the project has replication enabled for these tables, updates
  // arrive instantly. If not, the focus refetch above still keeps things fresh.
  useEffect(() => {
    if (!isSupabaseConfigured || !user) return;
    const channel = supabase
      .channel("parent-dashboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "admissions" }, () =>
        loadData({ silent: true })
      )
      .on("postgres_changes", { event: "*", schema: "public", table: "students" }, () =>
        loadData({ silent: true })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, loadData]);

  const firstName = useMemo(
    () => (profile?.full_name || "there").split(" ")[0],
    [profile]
  );

  return (
    <ParentLayout>
      {/* Greeting */}
      <section className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 font-bold text-primary">Welcome back 👋</p>
          <h2 className="text-4xl font-black tracking-tight text-on-background">Hi, {firstName}!</h2>
          <p className="mt-2 max-w-xl text-lg font-medium text-on-surface-variant">
            Here's everything happening with your family at Play Place.
          </p>
        </div>
        <button
          onClick={() => loadData({ silent: true })}
          disabled={refreshing}
          className="flex items-center gap-2 self-start rounded-full border-2 border-surface-variant bg-white px-5 py-2.5 text-sm font-bold text-on-surface-variant transition-colors hover:border-primary hover:text-primary disabled:opacity-60 sm:self-auto"
        >
          <span className={`material-symbols-outlined text-[20px] ${refreshing ? "animate-spin" : ""}`}>
            {refreshing ? "progress_activity" : "refresh"}
          </span>
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
      </section>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-[2rem] border-2 border-surface-variant bg-surface-container-low" />
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {/* Quick stats */}
          {children.length > 0 && (
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <StatCard icon="child_care" tone="primary" label="Enrolled Children" value={children.length} />
              <StatCard
                icon="event_available"
                tone="tertiary"
                label="Attendance"
                value={attendancePct === null ? "—" : `${attendancePct}%`}
              />
              <StatCard
                icon="payments"
                tone="secondary"
                label="Fees Due"
                value={`₹${feesDue.toLocaleString()}`}
              />
            </section>
          )}

          {/* My Children */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-2xl font-extrabold text-on-surface">
                <span className="material-symbols-outlined text-primary">child_care</span>
                My Children
              </h3>
            </div>

            {children.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {children.map((c) => (
                  <div
                    key={c.id}
                    className="cloud-card rounded-[2rem] border-2 border-surface-variant bg-white p-6"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-container text-xl font-black text-on-primary-container">
                        {initials(c.full_name)}
                      </div>
                      <div>
                        <h4 className="text-lg font-extrabold text-on-surface">{c.full_name}</h4>
                        <p className="text-sm font-bold text-on-surface-variant">{c.class || "Class TBA"}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                      <span className="text-sm font-bold text-on-surface-variant">Roll No.</span>
                      <span className="font-bold text-on-surface">{c.roll_number || "—"}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="school"
                title="No enrolled children yet"
                body="Once your child's application is approved and enrolled, they'll appear here."
                cta={{ label: "Apply for Admission", to: "/admissions" }}
              />
            )}
          </section>

          {/* Application Status */}
          <section>
            <h3 className="mb-6 flex items-center gap-2 text-2xl font-extrabold text-on-surface">
              <span className="material-symbols-outlined text-secondary">assignment</span>
              Application Status
            </h3>
            {applications.length ? (
              <div className="overflow-hidden rounded-[2rem] border-2 border-surface-variant bg-white">
                <div className="divide-y-2 divide-surface-variant/40">
                  {applications.map((a) => (
                    <div key={a.id} className="flex flex-wrap items-center justify-between gap-4 p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container/50 text-lg font-black text-on-secondary-container">
                          {initials(a.child_name)}
                        </div>
                        <div>
                          <p className="text-lg font-extrabold text-on-surface">{a.child_name}</p>
                          <p className="text-sm font-bold text-on-surface-variant">
                            {a.class_applied || "—"} · Applied {formatDate(a.created_at)}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={a.status} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                icon="fact_check"
                title="No applications to show"
                body="Submitted applications will appear here so you can track their review status."
                cta={{ label: "Start an Application", to: "/admissions" }}
              />
            )}
          </section>

          {/* Quick Links */}
          <section>
            <h3 className="mb-6 flex items-center gap-2 text-2xl font-extrabold text-on-surface">
              <span className="material-symbols-outlined text-tertiary">bolt</span>
              Quick Links
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_LINKS.map((q) => (
                <Link
                  key={q.label}
                  to={q.to}
                  className="cloud-card group rounded-[2rem] border-2 border-surface-variant bg-white p-6 transition-transform hover:-translate-y-1"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${TONES[q.tone]}`}>
                    <span className="material-symbols-outlined">{q.icon}</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-on-surface group-hover:text-primary">{q.label}</h4>
                  <p className="text-sm font-bold text-on-surface-variant">{q.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Announcements */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-2xl font-extrabold text-on-surface">
                <span className="material-symbols-outlined text-primary">campaign</span>
                Latest Notices
              </h3>
              <Link to="/parent/notices" className="text-sm font-bold text-primary hover:underline">
                View all
              </Link>
            </div>
            {notices.length ? (
              <div className="grid gap-6 md:grid-cols-2">
                {notices.map((n) => (
                  <div key={n.id} className="cloud-card rounded-[2rem] border-2 border-surface-variant bg-white p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-fixed/40 text-primary">
                        <span className="material-symbols-outlined">campaign</span>
                      </div>
                      <div>
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-extrabold text-on-surface">{n.title}</h4>
                          <span className="rounded-full bg-surface-container-high px-3 py-0.5 text-xs font-bold text-on-surface-variant">
                            {n.target_class === "all" ? "Everyone" : n.target_class}
                          </span>
                        </div>
                        {n.description && <p className="font-medium text-on-surface-variant">{n.description}</p>}
                        <p className="mt-3 text-xs font-bold text-on-surface-variant opacity-60">
                          {formatDate(n.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-8 text-center">
                <p className="font-medium text-on-surface-variant">No notices right now. Check back soon!</p>
              </div>
            )}
          </section>
        </div>
      )}
    </ParentLayout>
  );
}

function StatCard({ icon, tone, label, value }) {
  const tones = {
    primary: "bg-primary-container/20 text-primary",
    tertiary: "bg-tertiary-container/30 text-tertiary",
    secondary: "bg-secondary-container/40 text-secondary",
  };
  return (
    <div className="cloud-card rounded-[2rem] border-2 border-surface-variant bg-white p-6">
      <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${tones[tone]}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="text-sm font-bold text-on-surface-variant">{label}</p>
      <p className="text-3xl font-black text-on-surface">{value}</p>
    </div>
  );
}

function EmptyState({ icon, title, body, cta }) {
  return (
    <div className="flex flex-col items-center rounded-[2rem] border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-12 text-center">
      <span className="material-symbols-outlined mb-3 text-5xl text-outline">{icon}</span>
      <h4 className="mb-1 text-xl font-extrabold text-on-surface">{title}</h4>
      <p className="mb-6 max-w-md font-medium text-on-surface-variant">{body}</p>
      {cta && (
        <Link
          to={cta.to}
          className="bouncy-button rounded-full bg-primary-container px-8 py-3 text-sm font-bold text-on-primary-container"
        >
          {cta.label}
        </Link>
      )}
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
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}
