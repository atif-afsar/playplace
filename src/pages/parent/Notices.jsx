import { useEffect, useState } from "react";
import ParentLayout from "../../components/parent/ParentLayout";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { formatDate } from "../../lib/format";

export default function ParentNotices() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let active = true;
    (async () => {
      setLoading(true);
      // RLS returns only notices for "all" or the parent's child's class.
      const { data } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });
      if (active) {
        setRows(data ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <ParentLayout>
      <section className="mb-8">
        <h2 className="text-4xl font-black tracking-tight text-on-background">Notices</h2>
        <p className="mt-2 text-lg font-medium text-on-surface-variant">
          Announcements from Play Place for you and your child's class.
        </p>
      </section>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-[2rem] border-2 border-surface-variant bg-surface-container-low" />
          ))}
        </div>
      ) : rows.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {rows.map((n) => (
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
                  <p className="mt-3 text-xs font-bold text-on-surface-variant opacity-60">{formatDate(n.created_at)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-12 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-outline">campaign</span>
          <p className="font-medium text-on-surface-variant">No notices right now. Check back soon!</p>
        </div>
      )}
    </ParentLayout>
  );
}
