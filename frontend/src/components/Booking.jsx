import { useState } from "react";
import { MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { SITE, waLink } from "@/data/site";
import { Chapter, Reveal } from "@/components/Reveal";

const SEATING_OPTIONS = ["Indoor", "Outdoor", "Bus Café", "No Preference"];
const EMPTY = { name: "", mobile: "", date: "", time: "", guests: "2", seating: "No Preference", request: "" };

const buildMessage = (f) => {
    const lines = [
        "Hello MW Bistro, I would like to book a table.",
        "",
        `Name: ${f.name}`,
        `Date: ${f.date}`,
        `Time: ${f.time}`,
        `Guests: ${f.guests}`,
        `Seating Preference: ${f.seating}`,
    ];
    if (f.request.trim()) lines.push(`Special Request: ${f.request.trim()}`);
    lines.push("", "Please confirm availability.");
    return lines.join("\n");
};

const inputCls =
    "w-full rounded-xl border border-[#D4AF37]/25 bg-[#FAF6F0] px-4 py-3 text-sm text-[#2C1E16] placeholder-[#A08B7C] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition";

const Field = ({ label, children, testId }) => (
    <label className="block" data-testid={testId}>
        <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#6B584C] mb-1.5">{label}</span>
        {children}
    </label>
);

const Booking = () => {
    const [form, setForm] = useState(EMPTY);
    const [submitted, setSubmitted] = useState(false);
    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const submit = (e) => {
        e.preventDefault();
        window.open(waLink(buildMessage(form)), "_blank", "noopener");
        setSubmitted(true);
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <section id="booking" data-testid="booking-section" className="py-20 sm:py-28 bg-[#18110D] relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 50% 40% at 85% 15%, rgba(212,175,55,0.14), transparent)" }}
            />
            <div className="max-w-7xl mx-auto px-5 sm:px-8 relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                    <Chapter num="06" label="Reservations" dark />
                    <Reveal delay={0.1}>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5EFE6] tracking-tight">
                            Book Your Table
                        </h2>
                        <p className="mt-4 text-base text-[#C4B5A5] max-w-md leading-relaxed">
                            Plan your visit and make your moment special.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="mt-9 space-y-3 max-w-md">
                            <a
                                data-testid="booking-whatsapp-cta"
                                href={waLink("Hello MW Bistro, I would like to book a table.")}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2.5 w-full rounded-full bg-[#25D366] text-[#0B3510] font-semibold text-sm px-7 py-4 hover:bg-[#3be07a] hover:-translate-y-0.5 transition-[background-color,transform] duration-300"
                            >
                                <MessageCircle className="w-5 h-5" /> Book via WhatsApp
                            </a>
                            <a
                                data-testid="booking-call-cta"
                                href={SITE.phoneHref}
                                className="flex items-center justify-center gap-2.5 w-full rounded-full border border-[#D4AF37]/40 text-[#F3E5AB] font-medium text-sm px-7 py-4 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-300"
                            >
                                <Phone className="w-4 h-4" /> Call {SITE.phone}
                            </a>
                            <p className="text-xs text-[#C4B5A5]/70 leading-relaxed pt-2">
                                Submitting the form opens WhatsApp with your details pre-filled. Your table is
                                confirmed only once MW Bistro contacts you back.
                            </p>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.15}>
                    <div className="rounded-3xl bg-[#FFFDF9] border border-[#D4AF37]/25 p-6 sm:p-8 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.5)]">
                        {submitted ? (
                            <div className="text-center py-10" data-testid="booking-success">
                                <CheckCircle2 className="w-12 h-12 text-[#B8912B] mx-auto mb-5" />
                                <h3 className="font-serif text-xl text-[#2C1E16]">Thank you!</h3>
                                <p className="mt-3 text-sm text-[#6B584C] leading-relaxed max-w-sm mx-auto">
                                    Your booking request has been received. MW Bistro will contact you to confirm
                                    availability.
                                </p>
                                <button
                                    data-testid="booking-again-btn"
                                    onClick={() => { setForm(EMPTY); setSubmitted(false); }}
                                    className="mt-7 rounded-full border border-[#D4AF37]/50 text-[#B8912B] text-sm font-medium px-6 py-2.5 hover:bg-[#D4AF37]/10 transition-colors"
                                >
                                    Send another request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-4" data-testid="booking-form">
                                <Field label="Customer Name" testId="booking-field-name">
                                    <input data-testid="booking-name-input" required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
                                </Field>
                                <Field label="Mobile Number" testId="booking-field-mobile">
                                    <input data-testid="booking-mobile-input" required type="tel" pattern="[0-9+ ]{10,15}" value={form.mobile} onChange={set("mobile")} placeholder="Your mobile number" className={inputCls} />
                                </Field>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="Date" testId="booking-field-date">
                                        <input data-testid="booking-date-input" required type="date" min={today} value={form.date} onChange={set("date")} className={inputCls} />
                                    </Field>
                                    <Field label="Time" testId="booking-field-time">
                                        <input data-testid="booking-time-input" required type="time" value={form.time} onChange={set("time")} className={inputCls} />
                                    </Field>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="Number of Guests" testId="booking-field-guests">
                                        <input data-testid="booking-guests-input" required type="number" min="1" max="40" value={form.guests} onChange={set("guests")} className={inputCls} />
                                    </Field>
                                    <Field label="Seating Preference" testId="booking-field-seating">
                                        <select data-testid="booking-seating-select" value={form.seating} onChange={set("seating")} className={inputCls}>
                                            {SEATING_OPTIONS.map((o) => (
                                                <option key={o} value={o}>{o}</option>
                                            ))}
                                        </select>
                                    </Field>
                                </div>
                                <Field label="Special Request" testId="booking-field-request">
                                    <textarea data-testid="booking-request-input" rows="3" value={form.request} onChange={set("request")} placeholder="Birthday decor, cake, window seat…" className={`${inputCls} resize-none`} />
                                </Field>
                                <button
                                    data-testid="booking-submit-button"
                                    type="submit"
                                    className="w-full rounded-full bg-[#D4AF37] text-[#18110D] font-semibold text-sm py-4 hover:bg-[#F3E5AB] transition-colors duration-300"
                                >
                                    Submit Booking
                                </button>
                            </form>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Booking;
