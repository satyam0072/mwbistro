import { Phone, MessageCircle, MapPin } from "lucide-react";
import { SITE, waLink } from "@/data/site";
import { Chapter, Reveal } from "@/components/Reveal";

const Contact = () => (
    <section id="contact" data-testid="contact-section" className="py-20 sm:py-28 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Chapter num="07" label="Find Us" />
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                    <Reveal delay={0.05}>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2C1E16] tracking-tight">
                            Visit MW Bistro
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="mt-8 rounded-3xl bg-[#FFFDF9] border border-[#D4AF37]/25 p-7 sm:p-8">
                            <p className="font-serif text-xl text-[#2C1E16]">
                                {SITE.name} <span className="italic text-[#B8912B]">({SITE.subtitle})</span>
                            </p>
                            <p className="mt-4 text-sm leading-relaxed text-[#6B584C]" data-testid="contact-address">
                                {SITE.addressLines.map((l) => (
                                    <span key={l} className="block">{l}</span>
                                ))}
                            </p>
                            <div className="mt-5 space-y-1.5 text-sm">
                                <p className="text-[#6B584C]">
                                    Phone:{" "}
                                    <a data-testid="contact-phone-link" href={SITE.phoneHref} className="text-[#B8912B] font-medium hover:underline">
                                        {SITE.phone}
                                    </a>
                                </p>
                                <p className="text-[#6B584C]">
                                    WhatsApp:{" "}
                                    <a
                                        data-testid="contact-whatsapp-link"
                                        href={waLink("Hello MW Bistro, I would like to book a table.")}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[#B8912B] font-medium hover:underline"
                                    >
                                        {SITE.whatsappDisplay}
                                    </a>
                                </p>
                            </div>
                            <div className="mt-7 grid sm:grid-cols-3 gap-3">
                                <a
                                    data-testid="contact-call-btn"
                                    href={SITE.phoneHref}
                                    className="flex items-center justify-center gap-2 rounded-full bg-[#18110D] text-[#F3E5AB] text-xs font-semibold px-4 py-3.5 hover:bg-[#2C1E16] transition-colors"
                                >
                                    <Phone className="w-4 h-4" /> Call Now
                                </a>
                                <a
                                    data-testid="contact-whatsapp-btn"
                                    href={waLink("Hello MW Bistro, I would like to book a table.")}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-[#0B3510] text-xs font-semibold px-4 py-3.5 hover:bg-[#3be07a] transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4" /> WhatsApp
                                </a>
                                <a
                                    data-testid="contact-directions-btn"
                                    href={SITE.mapsDirections}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/50 text-[#B8912B] text-xs font-semibold px-4 py-3.5 hover:bg-[#D4AF37]/10 transition-colors"
                                >
                                    <MapPin className="w-4 h-4" /> Get Directions
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.2}>
                    <div className="rounded-3xl overflow-hidden img-frame h-[340px] sm:h-[440px]" data-testid="contact-map">
                        <iframe
                            title="MW Bistro (Bus Cafe) location — P&M, Mall Rd, Kurji, Patna"
                            src={SITE.mapsEmbed}
                            className="w-full h-full border-0"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </Reveal>
            </div>
        </div>
    </section>
);

export default Contact;
