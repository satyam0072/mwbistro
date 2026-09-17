import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { NAV_LINKS, SITE, scrollToId, waLink } from "@/data/site";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const go = (href) => {
        setOpen(false);
        setTimeout(() => scrollToId(href), open ? 250 : 0);
    };

    return (
        <>
            <header
                data-testid="navbar"
                className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
                    scrolled || open
                        ? "bg-[#18110D]/85 backdrop-blur-xl border-b border-[#D4AF37]/15 shadow-lg"
                        : "bg-transparent border-b border-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
                    <button
                        data-testid="nav-logo"
                        onClick={() => go("#home")}
                        className="flex items-center gap-2.5 text-left"
                    >
                        <span className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center">
                            <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/40" />
                        </span>
                        <span>
                            <span className="block font-serif text-lg leading-none text-[#F5EFE6]">
                                {SITE.name}
                            </span>
                            <span className="block font-mono text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase mt-0.5">
                                {SITE.subtitle}
                            </span>
                        </span>
                    </button>

                    <nav className="hidden lg:flex items-center gap-7" data-testid="nav-links">
                        {NAV_LINKS.map((l) => (
                            <button
                                key={l.href}
                                data-testid={`nav-link-${l.label.toLowerCase()}`}
                                onClick={() => go(l.href)}
                                className="text-sm text-[#F5EFE6]/80 hover:text-[#D4AF37] transition-colors duration-300"
                            >
                                {l.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            data-testid="nav-book-btn"
                            onClick={() => go("#booking")}
                            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#18110D] text-sm font-semibold px-5 py-2.5 hover:bg-[#F3E5AB] transition-colors duration-300"
                        >
                            Book a Table
                        </button>
                        <button
                            data-testid="nav-menu-toggle"
                            aria-label="Toggle menu"
                            onClick={() => setOpen(!open)}
                            className="lg:hidden w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#F5EFE6]"
                        >
                            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        data-testid="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#18110D]/97 backdrop-blur-xl pt-24 px-8 lg:hidden"
                    >
                        <nav className="flex flex-col gap-2">
                            {NAV_LINKS.map((l, i) => (
                                <motion.button
                                    key={l.href}
                                    data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i }}
                                    onClick={() => go(l.href)}
                                    className="text-left font-serif text-3xl text-[#F5EFE6] py-3 border-b border-[#D4AF37]/10"
                                >
                                    {l.label}
                                </motion.button>
                            ))}
                        </nav>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="mt-8 flex flex-col gap-3"
                        >
                            <button
                                data-testid="mobile-book-btn"
                                onClick={() => go("#booking")}
                                className="w-full rounded-full bg-[#D4AF37] text-[#18110D] font-semibold py-3.5"
                            >
                                Book a Table
                            </button>
                            <a
                                data-testid="mobile-whatsapp-btn"
                                href={waLink("Hello MW Bistro, I would like to book a table.")}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full rounded-full bg-[#25D366] text-[#0B3510] font-semibold py-3.5 text-center"
                            >
                                Book via WhatsApp
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
