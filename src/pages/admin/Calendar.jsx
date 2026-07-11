import { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminModal from "../../components/admin/AdminModal";
import SetupNotice from "../../components/admin/SetupNotice";
import YearCalendarView from "../../components/calendar/YearCalendarView";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { CLASS_OPTIONS, EVENT_TYPES } from "../../lib/constants";
import { formatEventDate, getSchoolYear, schoolYearOptions, schoolYearLabel } from "../../lib/calendar";

const EMPTY = (schoolYear) => ({
  title: "",
  description: "",
  event_date: "",
  end_date: "",
  event_type: "event",
  location: "",
  target_class: "all",
  school_year: schoolYear,
});

export default function AdminCalendar() {
  const [schoolYear, setSchoolYear] = useState(getSchoolYear());
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY(schoolYear));
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from("events")
      .select("*")
      .eq("school_year", schoolYear)
      .order("event_date", { ascending: true });
    if (err) setError(err.message);
    else setRows(data ?? []);
    setLoading(false);
  }, [schoolYear]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    load();
  }, [load]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const openAdd = (dateKey) => {
    setForm({ ...EMPTY(schoolYear), event_date: dateKey || "" });
    setFormError("");
    setModal({ mode: "add" });
  };

  const openEdit = (row) => {
    setForm({
      title: row.title,
      description: row.description || "",
      event_date: row.event_date,
      end_date: row.end_date || "",
      event_type: row.event_type || "event",
      location: row.location || "",
      target_class: row.target_class || "all",
      school_year: row.school_year || schoolYear,
    });
    setFormError("");
    setModal({ mode: "edit", data: row });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      event_date: form.event_date,
      end_date: form.end_date || null,
      event_type: form.event_type,
      location: form.location.trim() || null,
      target_class: form.target_class,
      school_year: form.school_year || schoolYear,
    };
    const res =
      modal.mode === "add"
        ? await supabase.from("events").insert(payload)
        : await supabase.from("events").update(payload).eq("id", modal.data.id);
    setSaving(false);
    if (res.error) {
      setFormError(res.error.message);
      return;
    }
    setModal(null);
    load();
  };

  const handleDelete = async () => {
    const id = confirmDelete.id;
    setConfirmDelete(null);
    const prev = rows;
    setRows((rs) => rs.filter((r) => r.id !== id));
    const { error: err } = await supabase.from("events").delete().eq("id", id);
    if (err) {
      setError(err.message);
      setRows(prev);
    }
  };

  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => a.event_date.localeCompare(b.event_date)),
    [rows]
  );

  return (
    <AdminLayout
      breadcrumb="Calendar"
      title="School Year Calendar"
      description="Plan holidays, term dates, exams, and events. Changes appear on the public website and parent portal."
      actions={
        <button
          onClick={() => openAdd("")}
          className="bouncy-button flex items-center gap-2 rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container"
        >
          <span className="material-symbols-outlined">add</span>
          Add Event
        </button>
      }
    >
      {!isSupabaseConfigured ? (
        <SetupNotice />
      ) : (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border-2 border-surface-variant bg-surface-container-low p-4">
            <label className="flex items-center gap-3">
              <span className="text-sm font-bold text-on-surface-variant">Academic Year</span>
              <select
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
                className="form-input rounded-xl py-2"
              >
                {schoolYearOptions(5).map((y) => (
                  <option key={y} value={y}>
                    {schoolYearLabel(y)}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-sm font-medium text-on-surface-variant">
              {rows.length} event{rows.length === 1 ? "" : "s"} · Click any day to add an event
            </p>
          </div>

          {error && (
            <div className="rounded-2xl border-2 border-error-container bg-error-container p-4 text-on-error-container">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl border-2 border-surface-variant bg-surface-container-low" />
              ))}
            </div>
          ) : (
            <>
              <YearCalendarView
                events={rows}
                schoolYear={schoolYear}
                interactive
                showSidebar
                onDayClick={(key) => openAdd(key)}
                onEventClick={openEdit}
              />

              <section className="rounded-2xl border-2 border-surface-variant bg-surface-container-lowest p-6">
                <h3 className="mb-4 text-xl font-extrabold text-on-surface">All Events ({schoolYearLabel(schoolYear)})</h3>
                {sortedRows.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b-2 border-surface-variant text-sm font-bold text-on-surface-variant">
                          <th className="px-3 py-3">Date</th>
                          <th className="px-3 py-3">Title</th>
                          <th className="px-3 py-3">Type</th>
                          <th className="px-3 py-3">Audience</th>
                          <th className="px-3 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-variant">
                        {sortedRows.map((ev) => {
                          const type = EVENT_TYPES.find((t) => t.value === ev.event_type);
                          return (
                            <tr key={ev.id} className="hover:bg-surface-container-low">
                              <td className="px-3 py-3 text-sm font-medium text-on-surface-variant whitespace-nowrap">
                                {formatEventDate(ev)}
                              </td>
                              <td className="px-3 py-3 font-bold text-on-surface">{ev.title}</td>
                              <td className="px-3 py-3">
                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${type?.color || ""}`}>
                                  {type?.label || ev.event_type}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-sm font-medium text-on-surface-variant">
                                {ev.target_class === "all" ? "Everyone" : ev.target_class}
                              </td>
                              <td className="px-3 py-3 text-right">
                                <div className="flex justify-end gap-1">
                                  <button
                                    onClick={() => openEdit(ev)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-variant text-on-surface-variant hover:bg-secondary-container"
                                  >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                  </button>
                                  <button
                                    onClick={() => setConfirmDelete(ev)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-error-container text-on-error-container hover:bg-error hover:text-on-error"
                                  >
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center font-medium text-on-surface-variant py-8">
                    No events yet. Click a day on the calendar or use &quot;Add Event&quot; to get started.
                  </p>
                )}
              </section>
            </>
          )}
        </div>
      )}

      {modal && (
        <AdminModal
          title={modal.mode === "add" ? "Add Calendar Event" : "Edit Event"}
          icon="event"
          onClose={() => setModal(null)}
          footer={
            <>
              <button
                onClick={() => setModal(null)}
                className="rounded-2xl border-2 border-surface-variant px-6 py-3 font-bold text-on-surface-variant hover:bg-surface-variant"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bouncy-button rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save Event"}
              </button>
            </>
          }
        >
          <form onSubmit={handleSave} className="space-y-5">
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Title *</span>
              <input required value={form.title} onChange={set("title")} className="form-input w-full" placeholder="e.g. Diwali Holiday" />
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="px-2 text-sm font-bold text-on-surface-variant">Start Date *</span>
                <input required type="date" value={form.event_date} onChange={set("event_date")} className="form-input w-full" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="px-2 text-sm font-bold text-on-surface-variant">End Date (optional)</span>
                <input type="date" value={form.end_date} onChange={set("end_date")} className="form-input w-full" min={form.event_date} />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Event Type</span>
              <select value={form.event_type} onChange={set("event_type")} className="form-input w-full">
                {EVENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Description</span>
              <textarea rows={3} value={form.description} onChange={set("description")} className="form-input w-full resize-none" placeholder="Additional details…" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Location</span>
              <input value={form.location} onChange={set("location")} className="form-input w-full" placeholder="e.g. School Auditorium" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Visible To</span>
              <select value={form.target_class} onChange={set("target_class")} className="form-input w-full">
                <option value="all">Everyone (public website)</option>
                {CLASS_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c} only
                  </option>
                ))}
              </select>
            </label>
            {formError && (
              <p className="rounded-2xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">{formError}</p>
            )}
          </form>
        </AdminModal>
      )}

      {confirmDelete && (
        <AdminModal
          title="Delete Event"
          icon="delete"
          maxWidth="max-w-md"
          onClose={() => setConfirmDelete(null)}
          footer={
            <>
              <button onClick={() => setConfirmDelete(null)} className="rounded-2xl border-2 border-surface-variant px-6 py-3 font-bold text-on-surface-variant hover:bg-surface-variant">
                Cancel
              </button>
              <button onClick={handleDelete} className="rounded-2xl border-b-4 border-error bg-error-container px-6 py-3 font-bold text-on-error-container hover:bg-error hover:text-on-error">
                Delete
              </button>
            </>
          }
        >
          <p className="font-medium text-on-surface-variant">
            Delete <span className="font-bold text-on-surface">{confirmDelete.title}</span>?
          </p>
        </AdminModal>
      )}
    </AdminLayout>
  );
}
