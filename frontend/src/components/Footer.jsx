import { Heart, Instagram, Facebook, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { NAV_LINKS, SITE, scrollToId, waLink } from "@/data/site";

const Footer = () => (
    <footer data-testid="footer" className="bg-[#18110D] border-t border-[#D4AF37]/15 pt-16 pb-24 md:pb-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="grid md:grid-cols-3 gap-12">
                <div>
                    <p className="font-serif text-2xl text-[#F5EFE6] flex items-center gap-2.5">
                        <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]/40" /> {SITE.name}
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase mt-1.5">{SITE.subtitle}</p>
                    <p className="mt-5 font-serif italic text-sm text-[#C4B5A5]">“{SITE.tagline}”</p>
                    <div className="mt-6 flex gap-3">
                        <a data-testid="footer-instagram" href="#" aria-label="Instagram (coming soon)" className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#C4B5A5] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a data-testid="footer-facebook" href="#" aria-label="Facebook (coming soon)" className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#C4B5A5] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
                            <Facebook className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div>
                    <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-5">Quick Links</p>
                    <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {NAV_LINKS.map((l) => (
                            <button
                                key={l.href}
                                data-testid={`footer-link-${l.label.toLowerCase()}`}
                                onClick={() => scrollToId(l.href)}
                                className="text-left text-sm text-[#C4B5A5] hover:text-[#F3E5AB] transition-colors"
                            >
                                {l.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div>
                    <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-5">Visit Us</p>
                    <p className="text-sm text-[#C4B5A5] leading-relaxed">
                        {SITE.addressLines.map((l) => (
                            <span key={l} className="block">{l}</span>
                        ))}
                    </p>
                    <p className="mt-3 text-sm text-[#C4B5A5] flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> {SITE.phone}
                    </p>
                    <p className="mt-1.5 text-sm text-[#C4B5A5] flex items-center gap-2">
                        <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> {SITE.whatsappDisplay}
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button
                            data-testid="footer-book-btn"
                            onClick={() => scrollToId("#booking")}
                            className="rounded-full bg-[#D4AF37] text-[#18110D] text-xs font-semibold px-5 py-3 hover:bg-[#F3E5AB] transition-colors"
                        >
                            Book a Table
                        </button>
                        <a
                            data-testid="footer-whatsapp-btn"
                            href={waLink("Hello MW Bistro, I would like to book a table.")}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-[#25D366]/60 text-[#25D366] text-xs font-semibold px-5 py-3 text-center hover:bg-[#25D366]/10 transition-colors"
                        >
                            Book via WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-14 pt-7 border-t border-[#D4AF37]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#C4B5A5]/70">© 2026 MW Bistro (Bus Cafe). All Rights Reserved.</p>
                <Link data-testid="footer-admin-link" to="/admin" className="text-xs text-[#C4B5A5]/50 hover:text-[#D4AF37] transition-colors">
                    Manage Menu
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;
