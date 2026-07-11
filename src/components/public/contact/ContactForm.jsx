import { useState } from "react";
import Reveal from "../../common/Reveal";
import { sendContactMessage } from "../../../lib/sendAdmissionEmail";

const EMPTY = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("sending");

    try {
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });
      setStatus("sent");
      setForm(EMPTY);
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again or call us directly.");
    }
  };

  return (
    <Reveal className="relative rounded-[2rem] border-2 border-surface-variant bg-white p-8 shadow-[0_10px_30px_-5px_rgba(209,228,251,0.5)] md:p-12">
      <span
        className="material-symbols-outlined floating-envelope absolute -top-4 right-8 hidden text-[64px] text-secondary-container md:block"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        mail
      </span>
      <h2 className="mb-8 text-3xl font-extrabold text-primary">Send us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 ml-4 block text-sm font-bold text-on-surface-variant">
            Little Hero's Guardian Name
          </label>
          <input
            required
            type="text"
            value={form.name}
            onChange={set("name")}
            placeholder="Your Name"
            className="form-input w-full rounded-full bg-surface-container-low px-6 py-4 focus:border-secondary-container"
          />
        </div>
        <div>
          <label className="mb-2 ml-4 block text-sm font-bold text-on-surface-variant">
            Email Address
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="hello@example.com"
            className="form-input w-full rounded-full bg-surface-container-low px-6 py-4 focus:border-secondary-container"
          />
        </div>
        <div>
          <label className="mb-2 ml-4 block text-sm font-bold text-on-surface-variant">
            Phone Number
          </label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="+91 98765 43210"
            className="form-input w-full rounded-full bg-surface-container-low px-6 py-4 focus:border-secondary-container"
          />
        </div>
        <div>
          <label className="mb-2 ml-4 block text-sm font-bold text-on-surface-variant">
            Your Message
          </label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={set("message")}
            placeholder="How can we help you?"
            className="form-input w-full resize-none rounded-2xl bg-surface-container-low px-6 py-4 focus:border-secondary-container"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`bouncy-button flex w-full items-center justify-center gap-3 rounded-full py-5 text-xl font-black uppercase tracking-wider transition-colors disabled:opacity-70 ${
            status === "sent"
              ? "bg-tertiary-container text-white"
              : "bg-primary-container text-on-primary-container"
          }`}
          style={status !== "sent" ? { boxShadow: "0 4px 0 #cc6e51" } : undefined}
        >
          {status === "sending" && "Sending…"}
          {status === "sent" && "Sent Successfully! 🎉"}
          {(status === "idle" || status === "error") && (
            <>
              Send Message
              <span className="material-symbols-outlined">send</span>
            </>
          )}
        </button>
        {error && (
          <p className="rounded-2xl bg-error-container px-4 py-3 text-center text-sm font-medium text-on-error-container">
            {error}
          </p>
        )}
      </form>
    </Reveal>
  );
}
