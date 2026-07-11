import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminModal from "../../components/admin/AdminModal";
import SetupNotice from "../../components/admin/SetupNotice";
import StatusBadge from "../../components/common/StatusBadge";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { formatDate, initials } from "../../lib/format";

const STATUS_FILTERS = ["All", "due", "overdue", "paid"];
const EMPTY = { student_id: "", title: "Term Fee", amount: "", due_date: "", status: "due" };

export default function Fees() {
  const [searchParams] = useSearchParams();
  const [rows, setRows] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [feesRes, studentsRes] = await Promise.all([
      supabase
        .from("fees")
        .select("id, title, amount, due_date, status, paid_on, student_id, students(full_name, class)")
        .order("created_at", { ascending: false }),
      supabase.from("students").select("id, full_name, class").eq("status", "active").order("full_name"),
    ]);
    if (feesRes.error) setError(feesRes.error.message);
    else setRows(feesRes.data ?? []);
    setStudents(studentsRes.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    load();
  }, [load]);

  useEffect(() => {
    const status = searchParams.get("status");
    if (status && STATUS_FILTERS.includes(status)) setStatusFilter(status);
  }, [searchParams]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const filtered = useMemo(
    () => (statusFilter === "All" ? rows : rows.filter((r) => r.status === statusFilter)),
    [rows, statusFilter]
  );

  const totals = useMemo(() => {
    const paid = rows.filter((r) => r.status === "paid").reduce((s, r) => s + Number(r.amount || 0), 0);
    const outstanding = rows
      .filter((r) => r.status !== "paid")
      .reduce((s, r) => s + Number(r.amount || 0), 0);
    return { paid, outstanding };
  }, [rows]);

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.student_id) {
      setFormError("Please choose a student.");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("fees").insert({
      student_id: form.student_id,
      title: form.title.trim() || "Term Fee",
      amount: Number(form.amount) || 0,
      due_date: form.due_date || null,
      status: form.status,
      paid_on: form.status === "paid" ? new Date().toISOString().slice(0, 10) : null,
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

  const markPaid = async (row) => {
    setBusyId(row.id);
    const prev = rows;
    const paidOn = new Date().toISOString().slice(0, 10);
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status: "paid", paid_on: paidOn } : r)));
    const { error } = await supabase.from("fees").update({ status: "paid", paid_on: paidOn }).eq("id", row.id);
    if (error) {
      setRows(prev);
      setError(error.message);
    }
    setBusyId(null);
  };

  return (
    <AdminLayout
      breadcrumb="Finances"
      title="Fees Management"
      description="Record fees per student and mark them paid. Parents see their own child's fee status."
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
          Add Fee
        </button>
      }
    >
      {!isSupabaseConfigured ? (
        <SetupNotice />
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-tertiary-container/40 bg-surface-container-lowest p-6">
              <p className="text-sm font-bold text-on-surface-variant">Collected</p>
              <p className="text-3xl font-black text-tertiary">₹{totals.paid.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border-2 border-secondary/20 bg-surface-container-lowest p-6">
              <p className="text-sm font-bold text-on-surface-variant">Outstanding</p>
              <p className="text-3xl font-black text-primary">₹{totals.outstanding.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-5 py-2 text-sm font-bold capitalize transition-colors ${
                  statusFilter === s
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border-2 border-surface-variant bg-surface-container-lowest shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-surface-variant bg-surface-container-low">
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Student</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Fee</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Amount</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Due</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Status</th>
                    <th className="px-6 py-5 text-right text-lg font-bold text-on-surface">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-surface-variant/30">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={6} className="px-6 py-6">
                          <div className="h-6 w-full rounded-lg bg-surface-container-low" />
                        </td>
                      </tr>
                    ))
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-on-error-container">{error}</td>
                    </tr>
                  ) : filtered.length ? (
                    filtered.map((r) => (
                      <tr key={r.id} className="transition-colors hover:bg-surface-container-low/50">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed font-bold text-on-primary-fixed">
                              {initials(r.students?.full_name)}
                            </div>
                            <div>
                              <p className="font-medium text-on-background">{r.students?.full_name || "—"}</p>
                              <p className="text-sm text-on-surface-variant">{r.students?.class || ""}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 font-medium text-on-surface-variant">{r.title}</td>
                        <td className="px-6 py-5 font-bold text-on-surface">₹{Number(r.amount).toLocaleString()}</td>
                        <td className="px-6 py-5 font-medium text-on-surface-variant">{formatDate(r.due_date)}</td>
                        <td className="px-6 py-5">
                          <StatusBadge status={r.status} />
                        </td>
                        <td className="px-6 py-5 text-right">
                          {r.status !== "paid" ? (
                            <button
                              onClick={() => markPaid(r)}
                              disabled={busyId === r.id}
                              className="rounded-full bg-tertiary-fixed px-4 py-2 text-sm font-bold text-on-tertiary-fixed transition-colors hover:bg-tertiary hover:text-on-tertiary disabled:opacity-60"
                            >
                              Mark Paid
                            </button>
                          ) : (
                            <span className="text-sm font-bold text-on-surface-variant opacity-60">
                              {formatDate(r.paid_on)}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-14 text-center text-on-surface-variant">
                        No fee records{statusFilter !== "All" ? ` with status "${statusFilter}"` : ""}.
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
          title="Add Fee"
          icon="payments"
          onClose={() => setModal(false)}
          footer={
            <>
              <button onClick={() => setModal(false)} className="rounded-2xl border-2 border-surface-variant px-6 py-3 font-bold text-on-surface-variant hover:bg-surface-variant">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="bouncy-button rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container disabled:opacity-60">
                {saving ? "Saving…" : "Save Fee"}
              </button>
            </>
          }
        >
          <form onSubmit={handleSave} className="space-y-5">
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Student *</span>
              <select value={form.student_id} onChange={set("student_id")} className="form-input w-full">
                <option value="">— Select student —</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.full_name} {s.class ? `· ${s.class}` : ""}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Fee Title</span>
              <input value={form.title} onChange={set("title")} className="form-input w-full" placeholder="e.g. Term 1 Fee" />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="px-2 text-sm font-bold text-on-surface-variant">Amount (₹)</span>
                <input type="number" min="0" value={form.amount} onChange={set("amount")} className="form-input w-full" placeholder="0" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="px-2 text-sm font-bold text-on-surface-variant">Due Date</span>
                <input type="date" value={form.due_date} onChange={set("due_date")} className="form-input w-full" />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Status</span>
              <select value={form.status} onChange={set("status")} className="form-input w-full">
                <option value="due">Due</option>
                <option value="overdue">Overdue</option>
                <option value="paid">Paid</option>
              </select>
            </label>
            {formError && <p className="rounded-2xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">{formError}</p>}
          </form>
        </AdminModal>
      )}
    </AdminLayout>
  );
}
