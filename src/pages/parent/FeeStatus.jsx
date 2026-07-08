import { useEffect, useMemo, useState } from "react";
import ParentLayout from "../../components/parent/ParentLayout";
import ChildSelector from "../../components/parent/ChildSelector";
import NoChildNotice from "../../components/parent/NoChildNotice";
import StatusBadge from "../../components/common/StatusBadge";
import { useChildren } from "../../hooks/useChildren";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { formatDate } from "../../lib/format";

export default function FeeStatus() {
  const { children, selected, selectedId, setSelectedId, loading: childrenLoading } = useChildren();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !selectedId) {
      setRows([]);
      return;
    }
    let active = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("fees")
        .select("*")
        .eq("student_id", selectedId)
        .order("due_date", { ascending: true });
      if (active) {
        setRows(data ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [selectedId]);

  const totals = useMemo(() => {
    const paid = rows.filter((r) => r.status === "paid").reduce((s, r) => s + Number(r.amount || 0), 0);
    const due = rows.filter((r) => r.status !== "paid").reduce((s, r) => s + Number(r.amount || 0), 0);
    return { paid, due };
  }, [rows]);

  return (
    <ParentLayout>
      <section className="mb-8">
        <h2 className="text-4xl font-black tracking-tight text-on-background">Fee Status</h2>
        <p className="mt-2 text-lg font-medium text-on-surface-variant">
          {selected ? `${selected.full_name} · ${selected.class || "Class TBA"}` : "Your child's fees"}
        </p>
      </section>

      <ChildSelector children={children} selectedId={selectedId} onSelect={setSelectedId} />

      {childrenLoading ? (
        <div className="h-64 animate-pulse rounded-[2rem] border-2 border-surface-variant bg-surface-container-low" />
      ) : children.length === 0 ? (
        <NoChildNotice />
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="cloud-card rounded-[2rem] border-2 border-tertiary-container/40 bg-white p-6">
              <p className="text-sm font-bold text-on-surface-variant">Paid</p>
              <p className="text-3xl font-black text-tertiary">₹{totals.paid.toLocaleString()}</p>
            </div>
            <div className="cloud-card rounded-[2rem] border-2 border-secondary/20 bg-white p-6">
              <p className="text-sm font-bold text-on-surface-variant">Outstanding</p>
              <p className="text-3xl font-black text-primary">₹{totals.due.toLocaleString()}</p>
            </div>
          </div>

          {loading ? (
            <div className="h-48 animate-pulse rounded-[2rem] border-2 border-surface-variant bg-surface-container-low" />
          ) : rows.length ? (
            <div className="overflow-hidden rounded-[2rem] border-2 border-surface-variant bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-surface-variant bg-surface-container-low">
                    <th className="px-6 py-4 font-bold text-on-surface">Fee</th>
                    <th className="px-6 py-4 font-bold text-on-surface">Amount</th>
                    <th className="px-6 py-4 font-bold text-on-surface">Due Date</th>
                    <th className="px-6 py-4 font-bold text-on-surface">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-surface-variant/40">
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td className="px-6 py-4 font-medium text-on-surface">{r.title}</td>
                      <td className="px-6 py-4 font-bold text-on-surface">₹{Number(r.amount).toLocaleString()}</td>
                      <td className="px-6 py-4 font-medium text-on-surface-variant">{formatDate(r.due_date)}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={r.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-[2rem] border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-12 text-center">
              <span className="material-symbols-outlined mb-3 text-5xl text-outline">payments</span>
              <p className="font-medium text-on-surface-variant">No fee records yet.</p>
            </div>
          )}
        </>
      )}
    </ParentLayout>
  );
}
