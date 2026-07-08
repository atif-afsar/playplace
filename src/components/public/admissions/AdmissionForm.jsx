import { useEffect, useState } from "react";
import Reveal from "../../common/Reveal";
import { supabase, isSupabaseConfigured } from "../../../lib/supabaseClient";
import { useAuth } from "../../../context/AuthContext";

const CLASSES = ["Nursery", "LKG", "UKG", "Pre-K", "Kindergarten", "Grade 1", "Grade 2"];

const EMPTY = {
  childName: "",
  dob: "",
  gender: "Boy",
  classApplied: "Nursery",
  parentName: "",
  phone: "",
  email: "",
  address: "",
};

export default function AdmissionForm() {
  const { user, profile } = useAuth();
  const [form, setForm] = useState(EMPTY);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Prefill parent details when logged in, so an approved application links
  // straight back to the parent's account (matched by email).
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      email: f.email || user.email || "",
      parentName: f.parentName || profile?.full_name || "",
    }));
  }, [user, profile]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!isSupabaseConfigured) {
      setSubmitting(false);
      setError(
        "The application system isn't connected yet. Please try again later or contact the school."
      );
      return;
    }

    let photoUrl = null;
    if (photo) {
      const ext = photo.name.split(".").pop();
      const path = `applications/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("admissions")
        .upload(path, photo, { upsert: false });
      if (!uploadError) {
        const { data } = supabase.storage.from("admissions").getPublicUrl(path);
        photoUrl = data?.publicUrl ?? null;
      }
      // A failed photo upload (e.g. bucket not created yet) shouldn't block the application.
    }

    const { error: insertError } = await supabase.from("admissions").insert({
      child_name: form.childName,
      dob: form.dob || null,
      gender: form.gender,
      class_applied: form.classApplied,
      parent_name: form.parentName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      photo_url: photoUrl,
      status: "pending",
    });

    setSubmitting(false);
    if (insertError) {
      setError(insertError.message || "Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="apply-form" className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Reveal className="cloud-card rounded-[2.5rem] bg-white p-12 text-center">
          <span className="material-symbols-outlined mb-4 text-6xl text-tertiary">celebration</span>
          <h2 className="mb-3 text-3xl font-extrabold text-on-surface">Application Received!</h2>
          <p className="text-lg font-medium text-on-surface-variant">
            Thank you for applying to Play Place. Our admissions team will review your application
            and contact you within 2–3 business days.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm(EMPTY);
              setPhoto(null);
              setPhotoPreview(null);
              setError("");
            }}
            className="bouncy-button mt-8 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white"
          >
            Submit Another Application
          </button>
        </Reveal>
      </section>
    );
  }

  return (
    <section id="apply-form" className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Reveal className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-fixed/30 px-4 py-2 text-sm font-bold text-primary">
          <span className="material-symbols-outlined text-sm">edit_note</span>
          Admissions Open for 2024–25
        </div>
        <h2 className="text-3xl font-extrabold text-on-surface">Application Form</h2>
        <p className="mt-2 text-base font-medium text-on-surface-variant">
          Start your child's application today.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <form onSubmit={handleSubmit} className="cloud-card space-y-8 rounded-[2.5rem] bg-white p-8 md:p-12">
          {/* Child Information */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-xl font-bold text-primary">
              <span className="material-symbols-outlined">child_care</span>
              Child Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="px-2 text-sm font-bold text-on-surface-variant">
                  Child's Name
                </label>
                <input
                  required
                  type="text"
                  value={form.childName}
                  onChange={set("childName")}
                  placeholder="Enter full name"
                  className="form-input"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="px-2 text-sm font-bold text-on-surface-variant">
                  Date of Birth
                </label>
                <input
                  required
                  type="date"
                  value={form.dob}
                  onChange={set("dob")}
                  className="form-input"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="px-2 text-sm font-bold text-on-surface-variant">Gender</label>
              <div className="flex gap-4">
                {["Boy", "Girl", "Other"].map((g) => (
                  <label
                    key={g}
                    className={`flex flex-1 cursor-pointer items-center justify-center rounded-2xl border-2 p-3 text-base font-medium transition-colors hover:bg-surface-variant/20 ${
                      form.gender === g
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant text-on-surface-variant"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={set("gender")}
                      className="sr-only"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="px-2 text-sm font-bold text-on-surface-variant">
                Class Applying For
              </label>
              <select
                required
                value={form.classApplied}
                onChange={set("classApplied")}
                className="form-input"
              >
                {CLASSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Parent Information */}
          <div className="space-y-6 border-t-2 border-surface-container-high pt-8">
            <h3 className="flex items-center gap-2 text-xl font-bold text-secondary">
              <span className="material-symbols-outlined">family_restroom</span>
              Parent Information
            </h3>

            <div className="flex flex-col gap-2">
              <label className="px-2 text-sm font-bold text-on-surface-variant">Parent Name</label>
              <input
                required
                type="text"
                value={form.parentName}
                onChange={set("parentName")}
                placeholder="Enter parent's full name"
                className="form-input"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="px-2 text-sm font-bold text-on-surface-variant">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+91 98765 43210"
                  className="form-input"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="px-2 text-sm font-bold text-on-surface-variant">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="example@email.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="px-2 text-sm font-bold text-on-surface-variant">Address</label>
              <textarea
                required
                rows={3}
                value={form.address}
                onChange={set("address")}
                placeholder="Enter your residential address"
                className="form-input resize-none"
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-6 border-t-2 border-surface-container-high pt-8">
            <div className="flex flex-col gap-2">
              <label className="px-2 text-sm font-bold text-on-surface-variant">
                Upload Child's Photo
              </label>
              <div className="group relative">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhoto}
                  className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                />
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant bg-background p-8 transition-all group-hover:bg-surface-variant/20">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="mb-3 h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined mb-2 text-4xl text-outline">
                      add_a_photo
                    </span>
                  )}
                  <p className="text-base font-medium text-on-surface-variant">
                    {photo ? photo.name : "Drop photo here or "}
                    {!photo && <span className="text-primary underline">browse</span>}
                  </p>
                  <p className="mt-1 text-sm font-bold text-outline">JPG, PNG (Max 5MB)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bouncy-button w-full rounded-full bg-primary-container py-5 text-2xl font-extrabold text-on-primary-container shadow-lg shadow-primary-container/20 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              style={{ boxShadow: "0 4px 0 #cc6e51" }}
            >
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
            {error && (
              <p className="mt-4 rounded-2xl bg-error-container px-4 py-3 text-center text-sm font-medium text-on-error-container">
                {error}
              </p>
            )}
            <p className="mt-4 text-center text-sm font-bold text-outline">
              By submitting, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>
              .
            </p>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
