import { useEffect, useMemo, useState } from "react";
import ParentLayout from "../../components/parent/ParentLayout";
import ChildSelector from "../../components/parent/ChildSelector";
import NoChildNotice from "../../components/parent/NoChildNotice";
import { useChildren } from "../../hooks/useChildren";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { DAYS } from "../../lib/constants";

export default function ViewTimetable() {
  const { children, selected, selectedId, setSelectedId, loading: childrenLoading } = useChildren();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !selected?.class) {
      setRows([]);
      return;
    }
    let active = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase.from("timetable").select("*").eq("class", selected.class);
      if (active) {
        setRows(data ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [selected?.class]);

  const byDay = useMemo(() => {
    const map = Object.fromEntries(DAYS.map((d) => [d, []]));
    rows.forEach((r) => map[r.day]?.push(r));
    DAYS.forEach((d) => map[d].sort((a, b) => (a.time_slot || "").localeCompare(b.time_slot || "")));
    return map;
  }, [rows]);

  return (
    <ParentLayout>
      <Header title="Class Timetable" subtitle={selected ? `${selected.full_name} · ${selected.class || "Class TBA"}` : "Weekly schedule"} />
      <ChildSelector children={children} selectedId={selectedId} onSelect={setSelectedId} />

      {childrenLoading ? (
        <SkeletonGrid />
      ) : children.length === 0 ? (
        <NoChildNotice />
      ) : loading ? (
        <SkeletonGrid />
      ) : rows.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DAYS.map((day) => (
            <div key={day} className="cloud-card rounded-[2rem] border-2 border-surface-variant bg-white p-5">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-primary">
                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                {day}
              </h4>
              {byDay[day].length ? (
                <div className="space-y-3">
                  {byDay[day].map((r) => (
                    <div key={r.id} className="rounded-xl border-2 border-surface-variant bg-surface-container-low p-3">
                      <p className="font-bold text-on-surface">{r.subject}</p>
                      <p className="text-sm font-medium text-on-surface-variant">{r.time_slot}</p>
                      {r.teacher && <p className="text-xs text-on-surface-variant opacity-70">{r.teacher}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-on-surface-variant opacity-60">No classes.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyMsg icon="calendar_month" text="No timetable published for this class yet." />
      )}
    </ParentLayout>
  );
}

function Header({ title, subtitle }) {
  return (
    <section className="mb-8">
      <h2 className="text-4xl font-black tracking-tight text-on-background">{title}</h2>
      <p className="mt-2 text-lg font-medium text-on-surface-variant">{subtitle}</p>
    </section>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 animate-pulse rounded-[2rem] border-2 border-surface-variant bg-surface-container-low" />
      ))}
    </div>
  );
}

function EmptyMsg({ icon, text }) {
  return (
    <div className="rounded-[2rem] border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-12 text-center">
      <span className="material-symbols-outlined mb-3 text-5xl text-outline">{icon}</span>
      <p className="font-medium text-on-surface-variant">{text}</p>
    </div>
  );
}
