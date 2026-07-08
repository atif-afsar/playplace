import { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminModal from "../../components/admin/AdminModal";
import SetupNotice from "../../components/admin/SetupNotice";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { CLASS_OPTIONS, DAYS } from "../../lib/constants";

const EMPTY = { day: DAYS[0], time_slot: "", subject: "", teacher: "" };

export default function Timetable() {
  const [cls, setCls] = useState(CLASS_OPTIONS[0]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    const { data } = await supabase.from("timetable").select("*").eq("class", cls);
    setRows(data ?? []);
    setLoading(false);
  }, [cls]);

  useEffect(() => {
    load();
  }, [load]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const byDay = useMemo(() => {
    const map = Object.fromEntries(DAYS.map((d) => [d, []]));
    rows.forEach((r) => {
      if (!map[r.day]) map[r.day] = [];
      map[r.day].push(r);
    });
    DAYS.forEach((d) => map[d].sort((a, b) => (a.time_slot || "").localeCompare(b.time_slot || "")));
    return map;
  }, [rows]);

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    const { error } = await supabase.from("timetable").insert({
      class: cls,
      day: form.day,
      time_slot: form.time_slot.trim(),
      subject: form.subject.trim(),
      teacher: form.teacher.trim() || null,
    });
    setSaving(false);
    if (error) {
      setFormError(error.message);
      return;
    }
    setModal(false);
    setForm(EMPTY);
    load();
  };

  const remove = async (id) => {
    const prev = rows;
    setRows((rs) => rs.filter((r) => r.id !== id));
    const { error } = await supabase.from("timetable").delete().eq("id", id);
    if (error) setRows(prev);
  };

  return (
    <AdminLayout
      breadcrumb="Schedule"
      title="Timetable Manager"
      description="Build the weekly schedule per class. Parents see their child's class timetable."
      actions={
        <button
          onClick={() => {
            setForm(EMPTY);
            setFormError("");
            setModal(true);
          }}
          className="bouncy-button flex items-center gap-2 rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container"
        >
          <span className="material-symbols-outlined">add</span>
          Add Period
        </button>
      }
    >
      {!isSupabaseConfigured ? (
        <SetupNotice />
      ) : (
        <>
          <div className="mb-8">
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Class</span>
              <select value={cls} onChange={(e) => setCls(e.target.value)} className="form-input min-w-[200px]">
                {CLASS_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-40 animate-pulse rounded-2xl border-2 border-surface-variant bg-surface-container-low" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {DAYS.map((day) => (
                <div key={day} className="rounded-2xl border-2 border-surface-variant bg-surface-container-lowest p-5">
                  <h4 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-primary">
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                    {day}
                  </h4>
                  {byDay[day].length ? (
                    <div className="space-y-3">
                      {byDay[day].map((r) => (
                        <div key={r.id} className="group rounded-xl border-2 border-surface-variant bg-surface-container-low p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-bold text-on-surface">{r.subject}</p>
                              <p className="text-sm font-medium text-on-surface-variant">{r.time_slot}</p>
                              {r.teacher && <p className="text-xs text-on-surface-variant opacity-70">{r.teacher}</p>}
                            </div>
                            <button
                              onClick={() => remove(r.id)}
                              className="opacity-0 transition-opacity group-hover:opacity-100"
                              title="Remove"
                            >
                              <span className="material-symbols-outlined text-[20px] text-error">delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-on-surface-variant opacity-60">No periods.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {modal && (
        <AdminModal
          title={`Add Period · ${cls}`}
          icon="schedule"
          onClose={() => setModal(false)}
          footer={
            <>
              <button onClick={() => setModal(false)} className="rounded-2xl border-2 border-surface-variant px-6 py-3 font-bold text-on-surface-variant hover:bg-surface-variant">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="bouncy-button rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container disabled:opacity-60">
                {saving ? "Saving…" : "Add"}
              </button>
            </>
          }
        >
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="px-2 text-sm font-bold text-on-surface-variant">Day</span>
                <select value={form.day} onChange={set("day")} className="form-input w-full">
                  {DAYS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="px-2 text-sm font-bold text-on-surface-variant">Time Slot *</span>
                <input required value={form.time_slot} onChange={set("time_slot")} className="form-input w-full" placeholder="9:00–9:45" />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Subject *</span>
              <input required value={form.subject} onChange={set("subject")} className="form-input w-full" placeholder="e.g. Story Time" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Teacher</span>
              <input value={form.teacher} onChange={set("teacher")} className="form-input w-full" placeholder="Optional" />
            </label>
            {formError && <p className="rounded-2xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">{formError}</p>}
          </form>
        </AdminModal>
      )}
    </AdminLayout>
  );
}
