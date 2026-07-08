import { useEffect, useMemo, useState } from "react";
import ParentLayout from "../../components/parent/ParentLayout";
import ChildSelector from "../../components/parent/ChildSelector";
import NoChildNotice from "../../components/parent/NoChildNotice";
import { useChildren } from "../../hooks/useChildren";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { TERMS } from "../../lib/constants";

export default function ViewResults() {
  const { children, selected, selectedId, setSelectedId, loading: childrenLoading } = useChildren();
  const [term, setTerm] = useState(TERMS[0]);
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
        .from("results")
        .select("*")
        .eq("student_id", selectedId)
        .eq("term", term)
        .order("subject");
      if (active) {
        setRows(data ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [selectedId, term]);

  const summary = useMemo(() => {
    if (!rows.length) return null;
    const obtained = rows.reduce((s, r) => s + Number(r.marks_obtained || 0), 0);
    const max = rows.reduce((s, r) => s + Number(r.max_marks || 0), 0);
    const pct = max ? Math.round((obtained / max) * 100) : 0;
    return { obtained, max, pct };
  }, [rows]);

  return (
    <ParentLayout>
      <section className="mb-8">
        <h2 className="text-4xl font-black tracking-tight text-on-background">Report Card</h2>
        <p className="mt-2 text-lg font-medium text-on-surface-variant">
          {selected ? `${selected.full_name} · ${selected.class || "Class TBA"}` : "Your child's results"}
        </p>
      </section>

      <ChildSelector children={children} selectedId={selectedId} onSelect={setSelectedId} />

      {childrenLoading ? (
        <div className="h-64 animate-pulse rounded-[2rem] border-2 border-surface-variant bg-surface-container-low" />
      ) : children.length === 0 ? (
        <NoChildNotice />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            {TERMS.map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  term === t
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {summary && (
            <div className="cloud-card mb-6 flex items-center justify-between rounded-[2rem] border-2 border-surface-variant bg-white p-6">
              <div>
                <p className="text-sm font-bold text-on-surface-variant">Overall ({term})</p>
                <p className="text-3xl font-black text-on-surface">
                  {summary.obtained}
                  <span className="text-lg font-bold text-on-surface-variant"> / {summary.max}</span>
                </p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-container text-2xl font-black text-on-primary-container">
                {summary.pct}%
              </div>
            </div>
          )}

          {loading ? (
            <div className="h-48 animate-pulse rounded-[2rem] border-2 border-surface-variant bg-surface-container-low" />
          ) : rows.length ? (
            <div className="overflow-hidden rounded-[2rem] border-2 border-surface-variant bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-surface-variant bg-surface-container-low">
                    <th className="px-6 py-4 font-bold text-on-surface">Subject</th>
                    <th className="px-6 py-4 font-bold text-on-surface">Marks</th>
                    <th className="px-6 py-4 font-bold text-on-surface">Grade</th>
                    <th className="px-6 py-4 font-bold text-on-surface">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-surface-variant/40">
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td className="px-6 py-4 font-medium text-on-surface">{r.subject}</td>
                      <td className="px-6 py-4 font-bold text-on-surface">
                        {Number(r.marks_obtained)}{" "}
                        <span className="font-medium text-on-surface-variant">/ {Number(r.max_marks)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-container font-black text-on-primary-container">
                          {r.grade || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-on-surface-variant">{r.remarks || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-[2rem] border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-12 text-center">
              <span className="material-symbols-outlined mb-3 text-5xl text-outline">grade</span>
              <p className="font-medium text-on-surface-variant">No results published for {term} yet.</p>
            </div>
          )}
        </>
      )}
    </ParentLayout>
  );
}
