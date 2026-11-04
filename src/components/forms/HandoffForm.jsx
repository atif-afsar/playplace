import { useId, useRef, useState } from "react";
import { handoffChannels, mailtoUrl, whatsappUrl } from "../../lib/handoff";
import { CONTACT, telHref } from "../../config/site";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Notice from "../ui/Notice";

const PHONE_DIGITS = /^\d{10,13}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(field, raw) {
  const value = typeof raw === "string" ? raw.trim() : raw;
  if (field.type === "checkbox") {
    return field.required && !value ? field.requiredMessage || "Please tick this box to continue." : "";
  }
  if (!value) {
    if (!field.required) return "";
    return field.requiredMessage || `Please enter ${field.errorName || field.label.toLowerCase()}.`;
  }
  if (field.type === "tel" && !PHONE_DIGITS.test(value.replace(/[\s+()-]/g, ""))) {
    return "Please enter a valid phone number (10 digits, with or without +91).";
  }
  if (field.type === "email" && !EMAIL.test(value)) return "Please enter a valid email address.";
  if (field.minLength && value.length < field.minLength) {
    return `Please enter at least ${field.minLength} characters.`;
  }
  return "";
}

const inputClass = (invalid) =>
  `block w-full rounded-2xl border-2 bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/70 transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25 ${
    invalid ? "border-coral" : "border-line hover:border-navy/25"
  }`;

/**
 * Frontend-only enquiry form.
 *
 * It never stores or transmits data. After browser-side validation it opens
 * WhatsApp or the visitor's email app with a prefilled message. The visitor
 * sends that message themselves, so no "submitted successfully" state is shown.
 */
export default function HandoffForm({ fields, buildMessage, columns = 2 }) {
  const formId = useId();
  const summaryRef = useRef(null);
  const initial = Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? false : ""]));
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [handoff, setHandoff] = useState(null); // { channel, url }

  const channels = handoffChannels;
  const noChannel = !channels.whatsapp && !channels.email;

  const update = (field) => (e) => {
    const value = field.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field.name]: value }));
    if (errors[field.name]) {
      setErrors((errs) => ({ ...errs, [field.name]: validateField(field, value) }));
    }
  };

  const onBlur = (field) => () => {
    setErrors((errs) => ({ ...errs, [field.name]: validateField(field, values[field.name]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const channel = e.nativeEvent.submitter?.value || (channels.whatsapp ? "whatsapp" : "email");
    const nextErrors = {};
    fields.forEach((f) => {
      const msg = validateField(f, values[f.name]);
      if (msg) nextErrors[f.name] = msg;
    });
    setErrors(nextErrors);

    const firstInvalid = fields.find((f) => nextErrors[f.name]);
    if (firstInvalid) {
      setHandoff(null);
      summaryRef.current?.focus();
      return;
    }

    const trimmed = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
    );
    const { subject, text } = buildMessage(trimmed);
    const url = channel === "whatsapp" ? whatsappUrl(text) : mailtoUrl(subject, text);
    if (!url) return;

    if (channel === "whatsapp") window.open(url, "_blank", "noopener,noreferrer");
    else window.location.href = url;
    setHandoff({ channel, url });
  };

  const errorList = fields.filter((f) => errors[f.name]);

  if (noChannel) {
    return (
      <Notice tone="warning" icon="build">
        <strong>Enquiry hand-off is not configured.</strong> Add an approved WhatsApp number or email address in{" "}
        <code>src/config/site.js</code> (ENQUIRY). Until then, please call{" "}
        <a className="font-semibold underline" href={telHref(CONTACT.phones[0])}>
          {CONTACT.phones[0]}
        </a>
        .
      </Notice>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-describedby={`${formId}-howto`}>
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={errorList.length ? "alert" : undefined}
        className="focus:outline-none"
      >
        {errorList.length > 0 && (
          <div className="mb-6 rounded-2xl border border-coral/40 bg-pink-soft px-4 py-3 text-sm text-navy">
            <p className="font-bold">Please check the following:</p>
            <ul className="mt-1 list-disc pl-5">
              {errorList.map((f) => (
                <li key={f.name}>
                  <a href={`#${formId}-${f.name}`} className="underline">
                    {errors[f.name]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={`grid gap-5 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
        {fields.map((field) => {
          const id = `${formId}-${field.name}`;
          const errId = `${id}-error`;
          const hintId = `${id}-hint`;
          const invalid = Boolean(errors[field.name]);
          const describedBy = [field.hint && hintId, invalid && errId].filter(Boolean).join(" ") || undefined;
          const wide = field.full || field.type === "textarea" || field.type === "checkbox" || field.type === "radio";
          const common = {
            id,
            name: field.name,
            "aria-invalid": invalid || undefined,
            "aria-describedby": describedBy,
            "aria-required": field.required || undefined,
            onBlur: onBlur(field),
          };

          let control;
          if (field.type === "checkbox") {
            return (
              <div key={field.name} className="sm:col-span-2">
                <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
                  <input
                    type="checkbox"
                    {...common}
                    checked={values[field.name]}
                    onChange={update(field)}
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-line accent-navy"
                  />
                  <span>
                    {field.label}
                    {field.required && <span className="text-coral" aria-hidden="true"> *</span>}
                  </span>
                </label>
                {invalid && (
                  <p id={errId} className="mt-1.5 pl-8 text-sm font-medium text-coral">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            );
          }

          if (field.type === "radio") {
            return (
              <fieldset key={field.name} className="sm:col-span-2" aria-describedby={describedBy}>
                <legend className="mb-2 text-sm font-semibold text-navy">
                  {field.label}
                  {field.required && <span className="text-coral" aria-hidden="true"> *</span>}
                </legend>
                <div className="flex flex-wrap gap-2" id={id} tabIndex={-1}>
                  {field.options.map((opt) => {
                    const checked = values[field.name] === opt;
                    return (
                      <label
                        key={opt}
                        className={`cursor-pointer rounded-full border-2 px-5 py-2 text-sm font-bold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue ${
                          checked ? "border-navy bg-navy text-white" : "border-line bg-white text-ink hover:border-navy/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={opt}
                          checked={checked}
                          onChange={update(field)}
                          onBlur={onBlur(field)}
                          className="sr-only"
                        />
                        {opt}
                      </label>
                    );
                  })}
                </div>
                {invalid && (
                  <p id={errId} className="mt-1.5 text-sm font-medium text-coral">
                    {errors[field.name]}
                  </p>
                )}
              </fieldset>
            );
          }

          if (field.type === "select") {
            control = (
              <select {...common} value={values[field.name]} onChange={update(field)} className={inputClass(invalid)}>
                <option value="">{field.placeholder || "Select an option"}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            );
          } else if (field.type === "textarea") {
            control = (
              <textarea
                {...common}
                rows={field.rows || 4}
                value={values[field.name]}
                onChange={update(field)}
                placeholder={field.placeholder}
                maxLength={field.maxLength || 1000}
                className={`${inputClass(invalid)} resize-y`}
              />
            );
          } else {
            control = (
              <input
                {...common}
                type={field.type || "text"}
                inputMode={field.type === "tel" ? "tel" : undefined}
                autoComplete={field.autoComplete}
                value={values[field.name]}
                onChange={update(field)}
                placeholder={field.placeholder}
                maxLength={field.maxLength || 120}
                className={inputClass(invalid)}
              />
            );
          }

          return (
            <div key={field.name} className={wide ? "sm:col-span-2" : ""}>
              <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
                {field.label}
                {field.required ? (
                  <span className="text-coral" aria-hidden="true"> *</span>
                ) : (
                  <span className="font-normal text-muted"> (optional)</span>
                )}
              </label>
              {control}
              {field.hint && (
                <p id={hintId} className="mt-1.5 text-xs text-muted">
                  {field.hint}
                </p>
              )}
              {invalid && (
                <p id={errId} className="mt-1.5 text-sm font-medium text-coral">
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p id={`${formId}-howto`} className="mt-6 flex items-center gap-2 text-sm text-muted">
        <Icon name="lock" className="!text-lg text-green-ink" />
        Your message opens in {channels.whatsapp && channels.email ? "WhatsApp or email" : channels.whatsapp ? "WhatsApp" : "email"}, ready for you to send.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {channels.whatsapp && (
          <Button type="submit" name="channel" value="whatsapp" variant="whatsapp" size="lg" iconLeft="chat" arrow={false}>
            Continue on WhatsApp
          </Button>
        )}
        {channels.email && (
          <Button
            type="submit"
            name="channel"
            value="email"
            variant={channels.whatsapp ? "secondary" : "primary"}
            size="lg"
            iconLeft="mail"
            arrow={false}
          >
            Continue by email
          </Button>
        )}
      </div>

      <div aria-live="polite" className="mt-5">
        {handoff && (
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-cream px-4 py-4 text-sm leading-relaxed text-ink">
            <Icon name={handoff.channel === "whatsapp" ? "open_in_new" : "outgoing_mail"} className="mt-0.5 text-blue" />
            <p>
              {handoff.channel === "whatsapp"
                ? "WhatsApp has opened in a new tab — just press send."
                : "Your email app has opened — just press send."}{" "}
              Nothing opened?{" "}
              <a
                href={handoff.url}
                className="font-semibold text-blue underline"
                {...(handoff.channel === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                Try again
              </a>{" "}
              or call{" "}
              <a href={telHref(CONTACT.phones[0])} className="font-semibold text-blue underline">
                {CONTACT.phones[0]}
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
