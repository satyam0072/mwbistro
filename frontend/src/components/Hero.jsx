import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MapPin, Heart, ChevronDown } from "lucide-react";
import { IMAGES, SITE, scrollToId } from "@/data/site";
import { MaskLine } from "@/components/Reveal";

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
    const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <section id="home" ref={ref} data-testid="hero-section" className="relative min-h-[100svh] flex items-end overflow-hidden bg-[#18110D]">
            <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
                <img
                    src={IMAGES.bus}
                    alt="MW Bistro bus café glowing at night in Patna"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#18110D] via-[#18110D]/55 to-[#18110D]/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#18110D]/70 via-transparent to-transparent" />

            <Heart className="absolute top-28 right-[12%] w-5 h-5 text-[#D4AF37]/50 fill-[#D4AF37]/30 animate-floaty hidden sm:block" />
            <Heart className="absolute top-1/3 right-[28%] w-3.5 h-3.5 text-[#C86D51]/60 fill-[#C86D51]/40 animate-floaty hidden sm:block" style={{ animationDelay: "1.5s" }} />

            <motion.div style={{ opacity: fade }} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-24 sm:pb-28 pt-40 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.25em] bg-[#D4AF37]/10 text-[#F3E5AB] border border-[#D4AF37]/30 mb-7"
                    data-testid="hero-badge"
                >
                    Cozy • Romantic • Memorable
                </motion.div>

                <h1 className="font-serif text-[#F5EFE6] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                    <MaskLine delay={0.25}>MW Bistro</MaskLine>
                    <MaskLine delay={0.4} className="italic gold-text-gradient text-3xl sm:text-4xl lg:text-5xl mt-1">
                        (Bus Cafe)
                    </MaskLine>
                </h1>

                <MaskLine delay={0.6} className="mt-6">
                    <p className="font-serif italic text-lg sm:text-xl text-[#F3E5AB]">“{SITE.tagline}”</p>
                </MaskLine>
                <MaskLine delay={0.75} className="mt-3 max-w-xl">
                    <p className="text-sm sm:text-base text-[#F5EFE6]/75 leading-relaxed">
                        A unique bus café in Patna, perfect for delicious food, cozy dates and memorable moments.
                    </p>
                </MaskLine>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.95, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-9 flex flex-wrap gap-3"
                >
                    <button
                        data-testid="hero-book-btn"
                        onClick={() => scrollToId("#booking")}
                        className="rounded-full bg-[#D4AF37] text-[#18110D] font-semibold text-sm px-7 py-3.5 hover:bg-[#F3E5AB] hover:-translate-y-0.5 transition-[background-color,transform] duration-300"
                    >
                        Book a Table
                    </button>
                    <a
                        data-testid="hero-call-btn"
                        href={SITE.phoneHref}
                        className="inline-flex items-center gap-2 rounded-full border border-[#F5EFE6]/40 text-[#F5EFE6] text-sm font-medium px-7 py-3.5 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
                    >
                        <Phone className="w-4 h-4" /> Call Now
                    </a>
                    <a
                        data-testid="hero-directions-btn"
                        href={SITE.mapsDirections}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[#F5EFE6]/40 text-[#F5EFE6] text-sm font-medium px-7 py-3.5 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
                    >
                        <MapPin className="w-4 h-4" /> Get Directions
                    </a>
                </motion.div>
            </motion.div>

            <motion.button
                data-testid="hero-scroll-cue"
                onClick={() => scrollToId("#about")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#F5EFE6]/60 hover:text-[#D4AF37] transition-colors"
                aria-label="Scroll down"
            >
                <ChevronDown className="w-6 h-6 animate-bounce" />
            </motion.button>
        </section>
    );
};

export default Hero;
