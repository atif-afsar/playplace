import { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminModal from "../../components/admin/AdminModal";
import SetupNotice from "../../components/admin/SetupNotice";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { TERMS } from "../../lib/constants";
import { calcGrade } from "../../lib/format";

const EMPTY = { subject: "", marks_obtained: "", max_marks: "100", remarks: "" };

export default function Results() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [term, setTerm] = useState(TERMS[0]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    (async () => {
      const { data } = await supabase
        .from("students")
        .select("id, full_name, class")
        .eq("status", "active")
        .order("full_name");
      setStudents(data ?? []);
      if (data?.length) setStudentId((prev) => prev || data[0].id);
    })();
  }, []);

  const load = useCallback(async () => {
    if (!studentId) {
      setRows([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("results")
      .select("*")
      .eq("student_id", studentId)
      .eq("term", term)
      .order("subject");
    setRows(data ?? []);
    setLoading(false);
  }, [studentId, term]);

  useEffect(() => {
    load();
  }, [load]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const previewGrade = calcGrade(form.marks_obtained, form.max_marks);

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    const { error } = await supabase.from("results").insert({
      student_id: studentId,
      term,
      subject: form.subject.trim(),
      marks_obtained: Number(form.marks_obtained) || 0,
      max_marks: Number(form.max_marks) || 100,
      grade: calcGrade(form.marks_obtained, form.max_marks),
      remarks: form.remarks.trim() || null,
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
    const { error } = await supabase.from("results").delete().eq("id", id);
    if (error) setRows(prev);
  };

  return (
    <AdminLayout
      breadcrumb="Results"
      title="Results"
      description="Enter marks per subject. Grades are calculated automatically and shown to parents."
      actions={
        <button
          onClick={() => {
            setForm(EMPTY);
            setFormError("");
            setModal(true);
          }}
          disabled={!studentId}
          className="bouncy-button flex items-center gap-2 rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container disabled:opacity-50"
        >
          <span className="material-symbols-outlined">add</span>
          Add Subject
        </button>
      }
    >
      {!isSupabaseConfigured ? (
        <SetupNotice />
      ) : (
        <>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Student</span>
              <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className="form-input min-w-[240px]">
                {students.length === 0 && <option value="">No active students</option>}
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.full_name} {s.class ? `· ${s.class}` : ""}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Term</span>
              <select value={term} onChange={(e) => setTerm(e.target.value)} className="form-input min-w-[160px]">
                {TERMS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="overflow-hidden rounded-2xl border-2 border-surface-variant bg-surface-container-lowest shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-surface-variant bg-surface-container-low">
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Subject</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Marks</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Grade</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Remarks</th>
                    <th className="px-6 py-5 text-right text-lg font-bold text-on-surface">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-surface-variant/30">
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={5} className="px-6 py-6">
                          <div className="h-6 w-full rounded-lg bg-surface-container-low" />
                        </td>
                      </tr>
                    ))
                  ) : rows.length ? (
                    rows.map((r) => (
                      <tr key={r.id} className="transition-colors hover:bg-surface-container-low/50">
                        <td className="px-6 py-5 font-medium text-on-background">{r.subject}</td>
                        <td className="px-6 py-5 font-bold text-on-surface">
                          {Number(r.marks_obtained)} <span className="font-medium text-on-surface-variant">/ {Number(r.max_marks)}</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-container font-black text-on-primary-container">
                            {r.grade || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-medium text-on-surface-variant">{r.remarks || "—"}</td>
                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => remove(r.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-error-container text-on-error-container hover:bg-error hover:text-on-error ml-auto"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-14 text-center text-on-surface-variant">
                        No results for this student &amp; term yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {modal && (
        <AdminModal
          title="Add Subject Result"
          icon="grade"
          onClose={() => setModal(false)}
          footer={
            <>
              <button onClick={() => setModal(false)} className="rounded-2xl border-2 border-surface-variant px-6 py-3 font-bold text-on-surface-variant hover:bg-surface-variant">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="bouncy-button rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container disabled:opacity-60">
                {saving ? "Saving…" : "Save"}
              </button>
            </>
          }
        >
          <form onSubmit={handleSave} className="space-y-5">
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Subject *</span>
              <input required value={form.subject} onChange={set("subject")} className="form-input w-full" placeholder="e.g. English" />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="px-2 text-sm font-bold text-on-surface-variant">Marks Obtained</span>
                <input type="number" min="0" value={form.marks_obtained} onChange={set("marks_obtained")} className="form-input w-full" placeholder="0" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="px-2 text-sm font-bold text-on-surface-variant">Max Marks</span>
                <input type="number" min="1" value={form.max_marks} onChange={set("max_marks")} className="form-input w-full" placeholder="100" />
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-surface-container-low px-4 py-3">
              <span className="text-sm font-bold text-on-surface-variant">Auto grade:</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-container font-black text-on-primary-container">
                {previewGrade}
              </span>
            </div>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Remarks</span>
              <input value={form.remarks} onChange={set("remarks")} className="form-input w-full" placeholder="Optional" />
            </label>
            {formError && <p className="rounded-2xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">{formError}</p>}
          </form>
        </AdminModal>
      )}
    </AdminLayout>
  );
}
