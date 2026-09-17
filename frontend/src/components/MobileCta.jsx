import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, CalendarHeart } from "lucide-react";
import { SITE, scrollToId, waLink } from "@/data/site";

const MobileCta = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 500);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    data-testid="mobile-sticky-cta"
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    exit={{ y: 80 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#18110D]/92 backdrop-blur-xl border-t border-[#D4AF37]/20 px-4 py-3 grid grid-cols-3 gap-2.5"
                >
                    <a
                        data-testid="sticky-call-btn"
                        href={SITE.phoneHref}
                        className="flex items-center justify-center gap-1.5 rounded-full border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-semibold py-3"
                    >
                        <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                    <a
                        data-testid="sticky-whatsapp-btn"
                        href={waLink("Hello MW Bistro, I would like to book a table.")}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] text-[#0B3510] text-xs font-semibold py-3"
                    >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                    <button
                        data-testid="sticky-book-btn"
                        onClick={() => scrollToId("#booking")}
                        className="flex items-center justify-center gap-1.5 rounded-full bg-[#D4AF37] text-[#18110D] text-xs font-semibold py-3"
                    >
                        <CalendarHeart className="w-3.5 h-3.5" /> Book
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileCta;
