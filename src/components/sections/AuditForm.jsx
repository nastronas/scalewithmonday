import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { FORM_OPTIONS } from "@/data/site";
import { cn } from "@/lib/cn";

/*
  AuditForm (id="audit") — Web3Forms growth audit request. Controlled React with
  loading, success and error states. Honeypot field, hidden subject and from
  name. Imported by Home and Contact. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

const ACCESS_KEY = "865c2be7-84fd-4f18-b5cd-4e833c951c82";

const fieldClass =
  "w-full rounded-xl border border-line bg-card px-4 py-3 text-[0.95rem] text-foreground placeholder:text-muted/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
const labelClass = "mb-2 block text-sm font-medium text-foreground";

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4z"
      />
    </svg>
  );
}

export function AuditForm({ heading, subheading }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [spend, setSpend] = useState("");
  const [revenue, setRevenue] = useState("");
  const [goal, setGoal] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "New growth audit request, Monday");
    formData.append("from_name", "Monday Website");

    const payload = {
      ...Object.fromEntries(formData),
      // custom dropdowns are controlled by React state
      spend,
      revenue,
      goal,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
        setSpend("");
        setRevenue("");
        setGoal("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="audit" className="py-24 md:py-36">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <Eyebrow accent className="mx-auto w-fit">
              Free growth audit
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
              {heading ?? "Book your free growth audit."}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-muted md:text-lg">
              {subheading ??
                "Tell us where you are and where you want to go. We will show you exactly how we would scale it."}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            {status === "success" ? (
              <div className="rounded-2xl border border-line bg-card p-10 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/12">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                  Request received.
                </h3>
                <p className="mt-3 text-muted">
                  We will reply within one business day.
                </p>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus("idle")}
                  >
                    Send another request
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-line bg-panel/60 p-6 backdrop-blur-sm md:p-9"
              >
                {/* honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor="brand" className={labelClass}>
                      Brand name
                    </label>
                    <input
                      id="brand"
                      name="brand"
                      type="text"
                      required
                      aria-required="true"
                      placeholder="Your brand"
                      className={fieldClass}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="website" className={labelClass}>
                      Website
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://"
                      className={fieldClass}
                    />
                  </div>

                  <Dropdown
                    name="spend"
                    label="Monthly ad spend"
                    placeholder="Select a range"
                    options={FORM_OPTIONS.spend}
                    value={spend}
                    onChange={setSpend}
                  />
                  <Dropdown
                    name="revenue"
                    label="Monthly revenue"
                    placeholder="Select a range"
                    options={FORM_OPTIONS.revenue}
                    value={revenue}
                    onChange={setRevenue}
                  />

                  <div className="sm:col-span-2">
                    <Dropdown
                      name="goal"
                      label="Primary goal"
                      placeholder="What matters most right now"
                      options={FORM_OPTIONS.goal}
                      value={goal}
                      onChange={setGoal}
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      placeholder="First and last name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      placeholder="you@brand.com"
                      className={fieldClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelClass}>
                      Anything else we should know?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your goals, timelines, or current bottlenecks."
                      className={cn(fieldClass, "resize-y")}
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-5 rounded-xl border border-primary/30 bg-primary/8 px-4 py-3 text-sm text-foreground"
                  >
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                  <p className="text-sm text-muted">
                    No commitment. We reply within one business day.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Spinner />
                        Sending
                      </>
                    ) : (
                      "Send my audit request"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
