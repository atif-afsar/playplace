import { useEffect, useState } from "react";
import ParentLayout from "../../components/parent/ParentLayout";
import YearCalendarView from "../../components/calendar/YearCalendarView";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { getSchoolYear, schoolYearLabel, schoolYearOptions } from "../../lib/calendar";

export default function ParentCalendar() {
  const [schoolYear, setSchoolYear] = useState(getSchoolYear());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let active = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("school_year", schoolYear)
        .order("event_date", { ascending: true });
      if (active) {
        setEvents(data ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [schoolYear]);

  return (
    <ParentLayout>
      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-on-background">School Calendar</h2>
          <p className="mt-2 text-lg font-medium text-on-surface-variant">
            Holidays, exams, and events for your child&apos;s year at Play Place.
          </p>
        </div>
        <select
          value={schoolYear}
          onChange={(e) => setSchoolYear(e.target.value)}
          className="form-input rounded-2xl border-2 border-surface-variant bg-surface-container-lowest px-4 py-2 font-bold"
        >
          {schoolYearOptions(5).map((y) => (
            <option key={y} value={y}>
              {schoolYearLabel(y)}
            </option>
          ))}
        </select>
      </section>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl border-2 border-surface-variant bg-surface-container-low" />
          ))}
        </div>
      ) : (
        <YearCalendarView events={events} schoolYear={schoolYear} showLegend showSidebar />
      )}
    </ParentLayout>
  );
}
