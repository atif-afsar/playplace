import { useMemo, useState } from "react";
import { EVENT_TYPE_MAP, MONTH_NAMES } from "../../lib/constants";
import {
  daysInMonth,
  formatEventDate,
  groupEventsByDate,
  mondayFirstWeekday,
  monthYearForSchoolYear,
  schoolYearLabel,
  toDateKey,
} from "../../lib/calendar";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function MonthGrid({ year, month, eventsByDate, selectedKey, onDayClick, interactive }) {
  const totalDays = daysInMonth(year, month);
  const firstPad = mondayFirstWeekday(new Date(year, month, 1));
  const cells = [];

  for (let i = 0; i < firstPad; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  return (
    <div className="rounded-2xl border-2 border-surface-variant bg-surface-container-lowest p-4 shadow-sm transition-shadow hover:shadow-md">
      <h4 className="mb-3 text-center text-sm font-extrabold uppercase tracking-wide text-primary">
        {MONTH_NAMES[month]}
      </h4>
      <div className="mb-1 grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1 text-center text-[10px] font-bold text-on-surface-variant opacity-60">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="aspect-square" />;
          const key = toDateKey(year, month, day);
          const dayEvents = eventsByDate[key] || [];
          const isSelected = selectedKey === key;
          const isToday = key === toDateKey(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
          const isWeekend = (firstPad + day - 1) % 7 >= 5;

          return (
            <button
              key={key}
              type="button"
              disabled={!interactive && !dayEvents.length}
              onClick={() => onDayClick?.(key, dayEvents)}
              className={`relative flex aspect-square flex-col items-center justify-start rounded-lg p-0.5 text-[11px] font-bold transition-all ${
                interactive ? "cursor-pointer hover:bg-primary-container/20" : dayEvents.length ? "cursor-pointer hover:bg-surface-variant/40" : "cursor-default"
              } ${isSelected ? "ring-2 ring-primary ring-offset-1 bg-primary-container/30" : ""} ${
                isToday ? "bg-secondary-container/40 text-on-secondary-container" : isWeekend ? "text-on-surface-variant/70" : "text-on-surface"
              }`}
            >
              <span className="leading-none">{day}</span>
              {dayEvents.length > 0 && (
                <div className="mt-0.5 flex flex-wrap justify-center gap-px">
                  {dayEvents.slice(0, 3).map((ev) => {
                    const t = EVENT_TYPE_MAP[ev.event_type] || EVENT_TYPE_MAP.event;
                    return (
                      <span
                        key={ev.id}
                        className={`h-1.5 w-1.5 rounded-full ${t.color.split(" ")[0]}`}
                        title={ev.title}
                      />
                    );
                  })}
                  {dayEvents.length > 3 && (
                    <span className="text-[8px] text-on-surface-variant">+</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function YearCalendarView({
  events = [],
  schoolYear,
  onDayClick,
  onEventClick,
  interactive = false,
  showLegend = true,
  showSidebar = true,
}) {
  const [selectedKey, setSelectedKey] = useState(null);
  const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);

  const selectedEvents = selectedKey ? eventsByDate[selectedKey] || [] : [];

  const handleDayClick = (key, dayEvents) => {
    setSelectedKey(key);
    onDayClick?.(key, dayEvents);
  };

  const months = Array.from({ length: 12 }, (_, i) => monthYearForSchoolYear(schoolYear, i));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-black text-on-surface">{schoolYearLabel(schoolYear)}</h3>
          <p className="text-sm font-medium text-on-surface-variant">April – March academic calendar</p>
        </div>
        {showLegend && (
          <div className="flex flex-wrap gap-2">
            {Object.values(EVENT_TYPE_MAP).map((t) => (
              <span
                key={t.value}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${t.color}`}
              >
                <span className="material-symbols-outlined text-sm">{t.icon}</span>
                {t.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={`grid gap-4 ${showSidebar ? "lg:grid-cols-[1fr_280px]" : ""}`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {months.map(({ year, month }, i) => (
            <MonthGrid
              key={`${year}-${month}`}
              year={year}
              month={month}
              eventsByDate={eventsByDate}
              selectedKey={selectedKey}
              onDayClick={handleDayClick}
              interactive={interactive}
            />
          ))}
        </div>

        {showSidebar && (
          <aside className="sticky top-24 h-fit rounded-2xl border-2 border-surface-variant bg-surface-container-lowest p-5 shadow-sm">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-on-surface">
              <span className="material-symbols-outlined text-primary">event</span>
              {selectedKey ? "Day Details" : "Upcoming"}
            </h4>

            {selectedKey ? (
              selectedEvents.length ? (
                <ul className="space-y-3">
                  {selectedEvents.map((ev) => {
                    const t = EVENT_TYPE_MAP[ev.event_type] || EVENT_TYPE_MAP.event;
                    return (
                      <li key={ev.id}>
                        <button
                          type="button"
                          onClick={() => onEventClick?.(ev)}
                          className="w-full rounded-xl border-2 border-surface-variant bg-surface-container-low p-3 text-left transition-colors hover:border-primary"
                        >
                          <span className={`mb-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${t.color}`}>
                            <span className="material-symbols-outlined text-xs">{t.icon}</span>
                            {t.label}
                          </span>
                          <p className="font-bold text-on-surface">{ev.title}</p>
                          {ev.description && (
                            <p className="mt-1 text-xs font-medium text-on-surface-variant line-clamp-2">{ev.description}</p>
                          )}
                          {ev.location && (
                            <p className="mt-1 flex items-center gap-1 text-xs text-on-surface-variant">
                              <span className="material-symbols-outlined text-sm">location_on</span>
                              {ev.location}
                            </p>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm font-medium text-on-surface-variant">No events on this day.</p>
              )
            ) : (
              <ul className="space-y-3">
                {events
                  .filter((ev) => ev.event_date >= toDateKey(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
                  .sort((a, b) => a.event_date.localeCompare(b.event_date))
                  .slice(0, 6)
                  .map((ev) => {
                    const t = EVENT_TYPE_MAP[ev.event_type] || EVENT_TYPE_MAP.event;
                    return (
                      <li key={ev.id}>
                        <button
                          type="button"
                          onClick={() => onEventClick?.(ev)}
                          className="w-full rounded-xl border-2 border-surface-variant bg-surface-container-low p-3 text-left transition-colors hover:border-primary"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-bold text-on-surface">{ev.title}</p>
                            <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${t.color}`}>
                              {t.label}
                            </span>
                          </div>
                          <p className="mt-1 text-xs font-medium text-on-surface-variant">{formatEventDate(ev)}</p>
                        </button>
                      </li>
                    );
                  })}
                {!events.length && (
                  <p className="text-sm font-medium text-on-surface-variant">No events scheduled yet.</p>
                )}
              </ul>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
