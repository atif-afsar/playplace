import { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import SetupNotice from "../../components/admin/SetupNotice";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { CLASS_OPTIONS } from "../../lib/constants";
import { initials } from "../../lib/format";

const today = () => new Date().toISOString().slice(0, 10);

export default function Attendance() {
  const [cls, setCls] = useState(CLASS_OPTIONS[0]);
  const [date, setDate] = useState(today());
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({}); // student_id -> 'present' | 'absent'
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    setNotice("");
    const { data: studentRows } = await supabase
      .from("students")
      .select("id, full_name, roll_number")
      .eq("class", cls)
      .eq("status", "active")
      .order("full_name");
    const { data: existing } = await supabase
      .from("attendance")
      .select("student_id, status")
      .eq("date", date)
      .in("student_id", (studentRows ?? []).map((s) => s.id));

    const map = {};
    (studentRows ?? []).forEach((s) => {
      map[s.id] = "present"; // default present
    });
    (existing ?? []).forEach((a) => {
      map[a.student_id] = a.status;
    });
    setStudents(studentRows ?? []);
    setMarks(map);
    setLoading(false);
  }, [cls, date]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = (id) => setMarks((m) => ({ ...m, [id]: m[id] === "present" ? "absent" : "present" }));
  const setAll = (status) => setMarks(Object.fromEntries(students.map((s) => [s.id, status])));

  const save = async () => {
    setSaving(true);
    setNotice("");
    const payload = students.map((s) => ({ student_id: s.id, date, status: marks[s.id] || "present" }));
    const { error } = await supabase.from("attendance").upsert(payload, { onConflict: "student_id,date" });
    setSaving(false);
    setNotice(error ? `Error: ${error.message}` : "Attendance saved.");
  };

  const presentCount = Object.values(marks).filter((v) => v === "present").length;

  return (
    <AdminLayout
      breadcrumb="Attendance"
      title="Attendance"
      description="Pick a class and date, mark each child present or absent, then save."
    >
      {!isSupabaseConfigured ? (
        <SetupNotice />
      ) : (
        <>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Class</span>
              <select value={cls} onChange={(e) => setCls(e.target.value)} className="form-input min-w-[180px]">
                {CLASS_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Date</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input" />
            </label>
            {students.length > 0 && (
              <div className="flex gap-2 sm:ml-auto">
                <button onClick={() => setAll("present")} className="rounded-full bg-tertiary-fixed px-4 py-2.5 text-sm font-bold text-on-tertiary-fixed hover:bg-tertiary hover:text-on-tertiary">
                  All Present
                </button>
                <button onClick={() => setAll("absent")} className="rounded-full bg-error-container px-4 py-2.5 text-sm font-bold text-on-error-container hover:bg-error hover:text-on-error">
                  All Absent
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl border-2 border-surface-variant bg-surface-container-low" />
              ))}
            </div>
          ) : students.length ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="font-bold text-on-surface-variant">
                  {presentCount}/{students.length} present
                </p>
                <button
                  onClick={save}
                  disabled={saving}
                  className="bouncy-button rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save Attendance"}
                </button>
              </div>
              <div className="space-y-3">
                {students.map((s) => {
                  const present = marks[s.id] === "present";
                  return (
                    <div
                      key={s.id}
                      className="flex items-center justify-between rounded-2xl border-2 border-surface-variant bg-surface-container-lowest p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed font-bold text-on-primary-fixed">
                          {initials(s.full_name)}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{s.full_name}</p>
                          {s.roll_number && <p className="text-sm text-on-surface-variant">Roll {s.roll_number}</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => toggle(s.id)}
                        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                          present
                            ? "bg-tertiary-fixed text-on-tertiary-fixed"
                            : "bg-error-container text-on-error-container"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {present ? "check_circle" : "cancel"}
                        </span>
                        {present ? "Present" : "Absent"}
                      </button>
                    </div>
                  );
                })}
              </div>
              {notice && (
                <p className="mt-4 rounded-2xl bg-surface-container-low px-4 py-3 text-center text-sm font-medium text-on-surface-variant">
                  {notice}
                </p>
              )}
            </>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-12 text-center">
              <span className="material-symbols-outlined mb-3 text-5xl text-outline">groups</span>
              <h4 className="mb-1 text-xl font-extrabold text-on-surface">No active students in {cls}</h4>
              <p className="font-medium text-on-surface-variant">Add students to this class first.</p>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}
