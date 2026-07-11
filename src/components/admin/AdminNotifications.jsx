import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { formatDate } from "../../lib/format";

export default function AdminNotifications() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [overdueFees, setOverdueFees] = useState(0);
  const panelRef = useRef(null);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    const [admissionsRes, feesRes, pendingCountRes] = await Promise.all([
      supabase
        .from("admissions")
        .select("id, child_name, class_applied, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase.from("fees").select("id", { count: "exact", head: true }).eq("status", "overdue"),
      supabase.from("admissions").select("id", { count: "exact", head: true }).eq("status", "pending"),
    ]);
    setPending(admissionsRes.data ?? []);
    setPendingCount(pendingCountRes.count ?? 0);
    setOverdueFees(feesRes.count ?? 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 60_000);
    return () => clearInterval(interval);
  }, [load]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const total = pendingCount + overdueFees;

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) load();
        }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
        aria-label="Notifications"
      >
        <span className="material-symbols-outlined text-2xl">notifications</span>
        {total > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-surface bg-error px-1 text-[10px] font-bold text-on-error">
            {total > 9 ? "9+" : total}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border-2 border-surface-variant bg-surface-container-lowest shadow-2xl">
          <div className="border-b-2 border-surface-variant bg-surface-container-low px-4 py-3">
            <p className="font-bold text-on-surface">Notifications</p>
            <p className="text-xs font-medium text-on-surface-variant">
              {loading ? "Updating…" : total ? `${total} item${total === 1 ? "" : "s"} need attention` : "You're all caught up"}
            </p>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading && !pending.length && !overdueFees ? (
              <p className="px-4 py-6 text-center text-sm text-on-surface-variant">Loading…</p>
            ) : total === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-on-surface-variant">No new alerts right now.</p>
            ) : (
              <>
                {pending.map((a) => (
                  <Link
                    key={a.id}
                    to="/admin/admissions?status=pending"
                    onClick={() => setOpen(false)}
                    className="flex gap-3 border-b border-surface-variant/50 px-4 py-3 transition-colors hover:bg-surface-container-low"
                  >
                    <span className="material-symbols-outlined mt-0.5 text-primary">how_to_reg</span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">New application</p>
                      <p className="text-xs font-medium text-on-surface-variant">
                        {a.child_name} · {a.class_applied || "Class TBA"}
                      </p>
                      <p className="text-xs text-on-surface-variant opacity-60">{formatDate(a.created_at)}</p>
                    </div>
                  </Link>
                ))}
                {overdueFees > 0 && (
                  <Link
                    to="/admin/fees?status=overdue"
                    onClick={() => setOpen(false)}
                    className="flex gap-3 px-4 py-3 transition-colors hover:bg-surface-container-low"
                  >
                    <span className="material-symbols-outlined mt-0.5 text-error">payments</span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Overdue fees</p>
                      <p className="text-xs font-medium text-on-surface-variant">
                        {overdueFees} fee record{overdueFees === 1 ? "" : "s"} overdue
                      </p>
                    </div>
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="border-t-2 border-surface-variant bg-surface-container-low p-3">
            <Link
              to="/admin/admissions?status=pending"
              onClick={() => setOpen(false)}
              className="block text-center text-sm font-bold text-primary hover:underline"
            >
              Review all admissions
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
