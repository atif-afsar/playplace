import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminModal from "../../components/admin/AdminModal";
import SetupNotice from "../../components/admin/SetupNotice";
import StatusBadge from "../../components/common/StatusBadge";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { CLASS_OPTIONS } from "../../lib/constants";
import { initials } from "../../lib/format";

const EMPTY = {
  full_name: "",
  dob: "",
  gender: "Boy",
  class: CLASS_OPTIONS[0],
  roll_number: "",
  status: "active",
  parent_id: "",
  parent_email: "",
};

export default function ManageStudents() {
  const [searchParams] = useSearchParams();
  const [rows, setRows] = useState([]);
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // { mode: 'add'|'edit', data }
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [studentsRes, parentsRes] = await Promise.all([
      supabase
        .from("students")
        .select("id, full_name, dob, gender, class, roll_number, status, parent_id, admission_id, created_at")
        .order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, full_name, email").eq("role", "parent"),
    ]);
    if (studentsRes.error) setError(studentsRes.error.message);
    else setRows(studentsRes.data ?? []);
    setParents(parentsRes.data ?? []);
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
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  const parentName = useCallback(
    (id) => {
      const p = parents.find((x) => x.id === id);
      return p ? p.full_name || p.email : null;
    },
    [parents]
  );

  const filtered = useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter((r) =>
      [r.full_name, r.class, r.roll_number].filter(Boolean).some((v) => v.toLowerCase().includes(q))
    );
  }, [rows, search]);

  const openAdd = () => {
    setForm(EMPTY);
    setFormError("");
    setModal({ mode: "add" });
  };

  const openEdit = (row) => {
    setForm({
      full_name: row.full_name || "",
      dob: row.dob || "",
      gender: row.gender || "Boy",
      class: row.class || CLASS_OPTIONS[0],
      roll_number: row.roll_number || "",
      status: row.status || "active",
      parent_id: row.parent_id || "",
      parent_email: "",
    });
    setFormError("");
    setModal({ mode: "edit", data: row });
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const resolveParentId = async () => {
    if (form.parent_id) return { id: form.parent_id };
    const email = form.parent_email.trim();
    if (!email) return { id: null };
    const { data } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("email", email)
      .maybeSingle();
    if (!data) return { error: `No registered account found for "${email}".` };
    if (data.role !== "parent") return { error: `"${email}" is not a parent account.` };
    return { id: data.id };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);

    const resolved = await resolveParentId();
    if (resolved.error) {
      setFormError(resolved.error);
      setSaving(false);
      return;
    }

    const payload = {
      full_name: form.full_name.trim(),
      dob: form.dob || null,
      gender: form.gender,
      class: form.class,
      roll_number: form.roll_number.trim() || null,
      status: form.status,
      parent_id: resolved.id,
    };

    const res =
      modal.mode === "add"
        ? await supabase.from("students").insert(payload)
        : await supabase.from("students").update(payload).eq("id", modal.data.id);

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
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) {
      setError(error.message);
      setRows(prev);
    }
  };

  return (
    <AdminLayout
      breadcrumb="Students"
      title="Manage Students"
      description="Add children, assign them to a parent account, and keep enrollment details up to date."
      actions={
        <button
          onClick={openAdd}
          className="bouncy-button flex items-center gap-2 rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container"
        >
          <span className="material-symbols-outlined">person_add</span>
          Add Student
        </button>
      }
    >
      {!isSupabaseConfigured ? (
        <SetupNotice />
      ) : (
        <>
          <div className="mb-8 max-w-md">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, class or roll no..."
                className="w-full rounded-2xl border-2 border-surface-variant bg-surface py-3.5 pl-12 pr-4 font-medium shadow-sm outline-none transition-all focus:border-secondary-container"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border-2 border-surface-variant bg-surface-container-lowest shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-surface-variant bg-surface-container-low">
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Student</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Class</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Roll No.</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Parent</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Status</th>
                    <th className="px-6 py-5 text-right text-lg font-bold text-on-surface">Actions</th>
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
                      <td colSpan={6} className="px-6 py-10 text-center text-on-error-container">
                        {error}
                      </td>
                    </tr>
                  ) : filtered.length ? (
                    filtered.map((r) => (
                      <tr key={r.id} className="transition-colors hover:bg-surface-container-low/50">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed font-bold text-on-primary-fixed">
                              {initials(r.full_name)}
                            </div>
                            <span className="text-lg font-medium text-on-background">{r.full_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="rounded-full bg-tertiary-container/30 px-4 py-1.5 text-sm font-bold text-on-tertiary-container">
                            {r.class || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-medium text-on-surface-variant">{r.roll_number || "—"}</td>
                        <td className="px-6 py-5 font-medium text-on-surface-variant">
                          {r.parent_id ? (
                            parentName(r.parent_id) || "Linked"
                          ) : (
                            <span className="text-outline">Unassigned</span>
                          )}
                        </td>
                        <td className="px-6 py-5">
                          <StatusBadge status={r.status} />
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(r)}
                              title="Edit"
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-variant text-on-surface-variant transition-colors hover:bg-secondary-container"
                            >
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button
                              onClick={() => setConfirmDelete(r)}
                              title="Delete"
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-error-container text-on-error-container transition-colors hover:bg-error hover:text-on-error"
                            >
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-14 text-center text-on-surface-variant">
                        No students yet. Click "Add Student" to enroll one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-surface-container-low p-6">
              <p className="text-sm font-bold text-on-surface-variant opacity-60">
                {filtered.length} student{filtered.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </>
      )}

      {modal && (
        <AdminModal
          title={modal.mode === "add" ? "Add Student" : "Edit Student"}
          icon={modal.mode === "add" ? "person_add" : "edit"}
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
                {saving ? "Saving…" : "Save Student"}
              </button>
            </>
          }
        >
          <form onSubmit={handleSave} className="space-y-5">
            <Field label="Full Name" required>
              <input required value={form.full_name} onChange={set("full_name")} className="form-input w-full" placeholder="Child's full name" />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date of Birth">
                <input type="date" value={form.dob} onChange={set("dob")} className="form-input w-full" />
              </Field>
              <Field label="Gender">
                <select value={form.gender} onChange={set("gender")} className="form-input w-full">
                  {["Boy", "Girl", "Other"].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Class">
                <select value={form.class} onChange={set("class")} className="form-input w-full">
                  {CLASS_OPTIONS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Roll Number">
                <input value={form.roll_number} onChange={set("roll_number")} className="form-input w-full" placeholder="e.g. 12" />
              </Field>
            </div>

            <Field label="Status">
              <select value={form.status} onChange={set("status")} className="form-input w-full">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>

            <div className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-4">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
                <span className="material-symbols-outlined text-[20px]">link</span>
                Link to a Parent Account
              </p>
              <Field label="Choose registered parent">
                <select
                  value={form.parent_id}
                  onChange={(e) => setForm((f) => ({ ...f, parent_id: e.target.value, parent_email: "" }))}
                  className="form-input w-full"
                >
                  <option value="">— Not linked —</option>
                  {parents.map((p) => (
                    <option key={p.id} value={p.id}>
                      {(p.full_name || "Unnamed") + " · " + p.email}
                    </option>
                  ))}
                </select>
              </Field>
              {!form.parent_id && (
                <div className="mt-3">
                  <Field label="…or link by email">
                    <input
                      type="email"
                      value={form.parent_email}
                      onChange={set("parent_email")}
                      className="form-input w-full"
                      placeholder="parent@email.com"
                    />
                  </Field>
                  <p className="mt-1 px-2 text-xs font-medium text-on-surface-variant opacity-70">
                    The parent must have already registered an account with this email.
                  </p>
                </div>
              )}
            </div>

            {formError && (
              <p className="rounded-2xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
                {formError}
              </p>
            )}
          </form>
        </AdminModal>
      )}

      {confirmDelete && (
        <AdminModal
          title="Delete Student"
          icon="delete"
          maxWidth="max-w-md"
          onClose={() => setConfirmDelete(null)}
          footer={
            <>
              <button
                onClick={() => setConfirmDelete(null)}
                className="rounded-2xl border-2 border-surface-variant px-6 py-3 font-bold text-on-surface-variant hover:bg-surface-variant"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-2xl border-b-4 border-error bg-error-container px-6 py-3 font-bold text-on-error-container hover:bg-error hover:text-on-error"
              >
                Delete
              </button>
            </>
          }
        >
          <p className="font-medium text-on-surface-variant">
            Delete <span className="font-bold text-on-surface">{confirmDelete.full_name}</span>? This also removes
            their results, attendance and fee records. This can't be undone.
          </p>
        </AdminModal>
      )}
    </AdminLayout>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="px-2 text-sm font-bold text-on-surface-variant">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
  );
}
