import { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminModal from "../../components/admin/AdminModal";
import SetupNotice from "../../components/admin/SetupNotice";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { CLASS_OPTIONS } from "../../lib/constants";
import { formatDate } from "../../lib/format";

const EMPTY = { title: "", description: "", target_class: "all" };

export default function Notices() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setRows(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    load();
  }, [load]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const openAdd = () => {
    setForm(EMPTY);
    setFormError("");
    setModal({ mode: "add" });
  };
  const openEdit = (row) => {
    setForm({ title: row.title, description: row.description || "", target_class: row.target_class || "all" });
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
      target_class: form.target_class,
    };
    const res =
      modal.mode === "add"
        ? await supabase.from("notices").insert(payload)
        : await supabase.from("notices").update(payload).eq("id", modal.data.id);
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
    const { error } = await supabase.from("notices").delete().eq("id", id);
    if (error) {
      setError(error.message);
      setRows(prev);
    }
  };

  return (
    <AdminLayout
      breadcrumb="Notices"
      title="Notices & Announcements"
      description="Post updates for all parents or target a specific class. These appear on the parent dashboard."
      actions={
        <button
          onClick={openAdd}
          className="bouncy-button flex items-center gap-2 rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container"
        >
          <span className="material-symbols-outlined">add</span>
          New Notice
        </button>
      }
    >
      {!isSupabaseConfigured ? (
        <SetupNotice />
      ) : loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl border-2 border-surface-variant bg-surface-container-low" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border-2 border-error-container bg-error-container p-6 text-on-error-container">{error}</div>
      ) : rows.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {rows.map((n) => (
            <div key={n.id} className="rounded-2xl border-2 border-surface-variant bg-surface-container-lowest p-6 shadow-sm">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-fixed/40 text-primary">
                    <span className="material-symbols-outlined">campaign</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-extrabold text-on-surface">{n.title}</h4>
                    <span className="rounded-full bg-surface-container-high px-3 py-0.5 text-xs font-bold text-on-surface-variant">
                      {n.target_class === "all" ? "All classes" : n.target_class}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(n)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-variant text-on-surface-variant hover:bg-secondary-container"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button
                    onClick={() => setConfirmDelete(n)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-error-container text-on-error-container hover:bg-error hover:text-on-error"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
              {n.description && <p className="font-medium text-on-surface-variant">{n.description}</p>}
              <p className="mt-4 text-xs font-bold text-on-surface-variant opacity-60">Posted {formatDate(n.created_at)}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-12 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-outline">campaign</span>
          <h4 className="mb-1 text-xl font-extrabold text-on-surface">No notices yet</h4>
          <p className="font-medium text-on-surface-variant">Post your first announcement for parents.</p>
        </div>
      )}

      {modal && (
        <AdminModal
          title={modal.mode === "add" ? "New Notice" : "Edit Notice"}
          icon="campaign"
          onClose={() => setModal(null)}
          footer={
            <>
              <button onClick={() => setModal(null)} className="rounded-2xl border-2 border-surface-variant px-6 py-3 font-bold text-on-surface-variant hover:bg-surface-variant">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="bouncy-button rounded-2xl border-b-4 border-primary-dark bg-primary-container px-6 py-3 font-bold text-on-primary-container disabled:opacity-60">
                {saving ? "Saving…" : "Publish"}
              </button>
            </>
          }
        >
          <form onSubmit={handleSave} className="space-y-5">
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Title *</span>
              <input required value={form.title} onChange={set("title")} className="form-input w-full" placeholder="e.g. Annual Sports Day" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Description</span>
              <textarea rows={4} value={form.description} onChange={set("description")} className="form-input w-full resize-none" placeholder="Details for parents…" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="px-2 text-sm font-bold text-on-surface-variant">Target Audience</span>
              <select value={form.target_class} onChange={set("target_class")} className="form-input w-full">
                <option value="all">All classes</option>
                {CLASS_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            {formError && <p className="rounded-2xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">{formError}</p>}
          </form>
        </AdminModal>
      )}

      {confirmDelete && (
        <AdminModal
          title="Delete Notice"
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
