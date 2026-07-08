import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/common/StatusBadge";
import SetupNotice from "../../components/admin/SetupNotice";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

const CLASS_OPTIONS = ["All Classes", "Playgroup", "Nursery", "Kindergarten 1", "Kindergarten 2"];
const STATUS_OPTIONS = ["All Status", "pending", "approved", "rejected"];
const AVATAR_BG = ["bg-primary-fixed text-on-primary-fixed", "bg-tertiary-fixed text-on-tertiary-fixed", "bg-secondary-fixed text-on-secondary-fixed", "bg-surface-variant text-on-surface-variant"];

export default function ManageAdmissions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selected, setSelected] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    fetchRows();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesSearch =
        !search ||
        [r.child_name, r.parent_name, r.email, r.phone]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(search.toLowerCase()));
      const matchesClass = classFilter === "All Classes" || r.class_applied === classFilter;
      const matchesStatus = statusFilter === "All Status" || r.status === statusFilter;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [rows, search, classFilter, statusFilter]);

  const counts = useMemo(
    () => ({
      pending: rows.filter((r) => r.status === "pending").length,
      approved: rows.filter((r) => r.status === "approved").length,
      total: rows.length,
    }),
    [rows]
  );

  // Approving an application enrolls the child into `students` (linked to the
  // parent account by email). Rejecting deactivates any enrolled record.
  const syncEnrollment = async (admission, status) => {
    if (status === "approved") {
      // Enroll only once per admission.
      const { data: existing } = await supabase
        .from("students")
        .select("id")
        .eq("admission_id", admission.id)
        .maybeSingle();

      let parentId = null;
      if (admission.email) {
        const { data: parent } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", admission.email)
          .maybeSingle();
        parentId = parent?.id ?? null;
      }

      if (existing) {
        await supabase
          .from("students")
          .update({ status: "active", parent_id: parentId })
          .eq("id", existing.id);
      } else {
        await supabase.from("students").insert({
          full_name: admission.child_name,
          dob: admission.dob,
          gender: admission.gender,
          class: admission.class_applied,
          parent_id: parentId,
          admission_id: admission.id,
          photo_url: admission.photo_url,
          status: "active",
        });
      }
    } else if (status === "rejected") {
      await supabase
        .from("students")
        .update({ status: "inactive" })
        .eq("admission_id", admission.id);
    }
  };

  const updateStatus = async (id, status) => {
    const admission = rows.find((r) => r.id === id);
    if (!admission) return;

    setUpdatingId(id);
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));

    const { error } = await supabase.from("admissions").update({ status }).eq("id", id);
    if (error) {
      setRows(prev);
      setError(error.message);
      setUpdatingId(null);
      return;
    }

    const { error: enrollError } = await safeSync(admission, status);
    if (enrollError) setError(enrollError);

    setUpdatingId(null);
  };

  // Wrap enrollment so a failure there surfaces a message but doesn't revert
  // the admission status (which already saved successfully).
  const safeSync = async (admission, status) => {
    try {
      await syncEnrollment(admission, status);
      return { error: null };
    } catch (e) {
      return { error: e.message || "Application saved, but enrollment sync failed." };
    }
  };

  return (
    <AdminLayout
      breadcrumb="Admissions"
      title="New Applications"
      description="Manage incoming applications for the upcoming academic year. Click a child's name to see full details."
      actions={
        <button
          onClick={fetchRows}
          className="bouncy-button flex items-center gap-2 rounded-2xl border-2 border-primary border-b-4 bg-surface-container-lowest px-6 py-3 font-bold text-primary shadow-sm"
        >
          <span className="material-symbols-outlined">refresh</span>
          Refresh
        </button>
      }
    >
      {!isSupabaseConfigured ? (
        <SetupNotice />
      ) : (
        <>
          {/* Filters */}
          <div className="mb-8 flex flex-col items-stretch gap-4 lg:flex-row">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by child name, parent name or contact..."
                className="w-full rounded-2xl border-2 border-surface-variant bg-surface py-4 pl-12 pr-4 font-medium shadow-sm outline-none transition-all focus:border-secondary-container"
              />
            </div>
            <div className="flex gap-4">
              <FilterSelect value={classFilter} onChange={setClassFilter} options={CLASS_OPTIONS} />
              <FilterSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={STATUS_OPTIONS}
                labelMap={(v) => (v === "All Status" ? v : v.charAt(0).toUpperCase() + v.slice(1))}
              />
            </div>
          </div>

          {/* Table card */}
          <div className="overflow-hidden rounded-2xl border-2 border-surface-variant bg-surface-container-lowest shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-surface-variant bg-surface-container-low">
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Child Name</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Class</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Parent</th>
                    <th className="px-6 py-5 text-lg font-bold text-on-surface">Apply Date</th>
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
                    filtered.map((r, i) => (
                      <tr key={r.id} className="group transition-colors hover:bg-surface-container-low/50">
                        <td className="px-6 py-5">
                          <button
                            onClick={() => setSelected(r)}
                            className="flex items-center gap-3 text-left"
                          >
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold ${AVATAR_BG[i % AVATAR_BG.length]}`}
                            >
                              {initials(r.child_name)}
                            </div>
                            <span className="text-lg font-medium text-on-background transition-colors group-hover:text-primary">
                              {r.child_name}
                            </span>
                          </button>
                        </td>
                        <td className="px-6 py-5">
                          {r.class_applied ? (
                            <span className="rounded-full bg-tertiary-container/30 px-4 py-1.5 text-sm font-bold text-on-tertiary-container">
                              {r.class_applied}
                            </span>
                          ) : (
                            <span className="text-on-surface-variant opacity-60">—</span>
                          )}
                        </td>
                        <td className="px-6 py-5 font-medium text-on-surface-variant">{r.parent_name || "—"}</td>
                        <td className="px-6 py-5 font-medium text-on-surface-variant opacity-60">
                          {formatDate(r.created_at)}
                        </td>
                        <td className="px-6 py-5">
                          <StatusBadge status={r.status} />
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <ActionButton
                              icon="check"
                              title="Approve"
                              disabled={r.status === "approved" || updatingId === r.id}
                              className="bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary hover:text-on-tertiary"
                              onClick={() => updateStatus(r.id, "approved")}
                            />
                            <ActionButton
                              icon="close"
                              title="Reject"
                              disabled={r.status === "rejected" || updatingId === r.id}
                              className="bg-error-container text-on-error-container hover:bg-error hover:text-on-error"
                              onClick={() => updateStatus(r.id, "rejected")}
                            />
                            <ActionButton
                              icon="visibility"
                              title="View details"
                              className="bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest"
                              onClick={() => setSelected(r)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-14 text-center text-on-surface-variant">
                        No applications match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 bg-surface-container-low p-6 sm:flex-row">
              <p className="text-sm font-bold text-on-surface-variant opacity-60">
                Showing {filtered.length} of {rows.length} applications
              </p>
            </div>
          </div>

          {/* Summary stats */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <SummaryCard icon="hourglass_empty" value={counts.pending} label="Waiting Review" sub="Applications needing a decision" tone="secondary" />
            <SummaryCard icon="task_alt" value={counts.approved} label="Finalized" sub="Approved for next session" tone="tertiary" />
            <SummaryCard icon="inbox" value={counts.total} label="Total Applications" sub="Across all statuses" tone="primary" />
          </div>
        </>
      )}

      {selected && (
        <DetailsDrawer
          row={selected}
          updating={updatingId === selected.id}
          onClose={() => setSelected(null)}
          onApprove={() => updateStatus(selected.id, "approved")}
          onReject={() => updateStatus(selected.id, "rejected")}
        />
      )}
    </AdminLayout>
  );
}

function FilterSelect({ value, onChange, options, labelMap }) {
  return (
    <div className="relative min-w-[160px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-2xl border-2 border-surface-variant bg-surface py-4 pl-4 pr-10 font-bold outline-none transition-all focus:border-secondary-container"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {labelMap ? labelMap(o) : o}
          </option>
        ))}
      </select>
      <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-60">
        expand_more
      </span>
    </div>
  );
}

function ActionButton({ icon, title, onClick, className = "", disabled }) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
    </button>
  );
}

function SummaryCard({ icon, value, label, sub, tone }) {
  const tones = {
    secondary: "bg-secondary-container text-on-secondary-container",
    tertiary: "bg-tertiary-fixed text-on-tertiary-fixed",
    primary: "bg-primary-container text-on-primary-container",
  };
  const valueTone = {
    secondary: "text-secondary",
    tertiary: "text-tertiary",
    primary: "text-primary",
  };
  return (
    <div className="rounded-2xl border-2 border-surface-variant bg-surface-container-high p-6 transition-transform hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tones[tone]}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`text-2xl font-black ${valueTone[tone]}`}>{value}</span>
      </div>
      <h4 className="mb-1 text-xl font-bold">{label}</h4>
      <p className="font-medium text-on-surface-variant opacity-70">{sub}</p>
    </div>
  );
}

function DetailsDrawer({ row, onClose, onApprove, onReject, updating }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-surface-container-lowest shadow-2xl">
        <div className="flex items-center justify-between border-b-2 border-surface-variant p-6">
          <h3 className="text-2xl font-black text-on-surface">Application Details</h3>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-variant">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-container text-2xl font-black text-on-primary-container">
            {initials(row.child_name)}
          </div>
          <h4 className="text-xl font-black text-on-surface">{row.child_name}</h4>
          <StatusBadge status={row.status} />
        </div>

        <div className="flex-grow space-y-1 px-6">
          <DetailRow label="Class Applied" value={row.class_applied} />
          <DetailRow label="Date of Birth" value={row.dob ? formatDate(row.dob) : null} />
          <DetailRow label="Gender" value={row.gender} />
          <DetailRow label="Parent / Guardian" value={row.parent_name} />
          <DetailRow label="Phone" value={row.phone} />
          <DetailRow label="Email" value={row.email} />
          <DetailRow label="Address" value={row.address} />
          <DetailRow label="Applied On" value={formatDate(row.created_at)} />
        </div>

        <div className="sticky bottom-0 flex gap-3 border-t-2 border-surface-variant bg-surface-container-lowest p-6">
          <button
            onClick={onReject}
            disabled={row.status === "rejected" || updating}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-error px-4 py-3 font-bold text-error transition-colors hover:bg-error hover:text-on-error disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="material-symbols-outlined">close</span>
            Reject
          </button>
          <button
            onClick={onApprove}
            disabled={row.status === "approved" || updating}
            className="bouncy-button flex flex-1 items-center justify-center gap-2 rounded-2xl border-b-4 border-tertiary bg-tertiary-fixed px-4 py-3 font-bold text-on-tertiary-fixed disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="material-symbols-outlined">check</span>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-surface-variant py-3">
      <span className="text-sm font-bold text-on-surface-variant">{label}</span>
      <span className="text-right font-medium text-on-surface">{value || "—"}</span>
    </div>
  );
}

function initials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
