import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SEO from "../../components/common/SEO";
import YearCalendarView from "../../components/calendar/YearCalendarView";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { getSchoolYear, schoolYearLabel, schoolYearOptions } from "../../lib/calendar";
import { PAGE_SEO } from "../../lib/seo";

export default function Calendar() {
  const seo = PAGE_SEO.calendar;
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
    <div className="min-h-screen overflow-x-hidden bg-background text-on-background">
      <SEO
        {...seo}
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Calendar", path: "/calendar" },
        ]}
      />
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-container/30 via-background to-secondary-container/20 px-6 py-16 md:py-24">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-container/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-tertiary-container/20 blur-3xl" />
          <div className="relative mx-auto max-w-[1200px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-surface-container-lowest px-4 py-2 text-sm font-bold text-primary">
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              Academic Calendar
            </span>
            <h1 className="font-display text-4xl font-black tracking-tight text-on-background md:text-6xl">
              School Year at a Glance
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-on-surface-variant">
              Holidays, term dates, exams, and special events — planned by our team so families always know what&apos;s ahead.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-on-surface">{schoolYearLabel(schoolYear)}</h2>
            <select
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
              className="form-input rounded-2xl border-2 border-surface-variant bg-surface-container-lowest px-4 py-2 font-bold text-on-surface"
            >
              {schoolYearOptions(5).map((y) => (
                <option key={y} value={y}>
                  {schoolYearLabel(y)}
                </option>
              ))}
            </select>
          </div>

          {!isSupabaseConfigured ? (
            <div className="rounded-[2rem] border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-12 text-center">
              <span className="material-symbols-outlined mb-3 text-5xl text-outline">calendar_month</span>
              <p className="font-medium text-on-surface-variant">Calendar will appear here once the school connects its database.</p>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl border-2 border-surface-variant bg-surface-container-low" />
              ))}
            </div>
          ) : (
            <YearCalendarView events={events} schoolYear={schoolYear} showLegend showSidebar />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
