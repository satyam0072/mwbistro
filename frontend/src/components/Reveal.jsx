import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay, ease: EASE }}
    >
        {children}
    </motion.div>
);

export const Chapter = ({ num, label, dark = false }) => (
    <Reveal>
        <div className="flex items-center gap-3 mb-4">
            <span
                className={`font-mono text-xs tracking-[0.3em] uppercase ${
                    dark ? "text-[#D4AF37]" : "text-[#B8912B]"
                }`}
            >
                Chapter {num}
            </span>
            <span className={`h-px w-12 ${dark ? "bg-[#D4AF37]/50" : "bg-[#B8912B]/40"}`} />
            <span
                className={`font-mono text-xs tracking-[0.3em] uppercase ${
                    dark ? "text-[#C4B5A5]" : "text-[#6B584C]"
                }`}
            >
                {label}
            </span>
        </div>
    </Reveal>
);

export const MaskLine = ({ children, delay = 0, className = "" }) => (
    <span className={`block overflow-hidden ${className}`}>
        <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay, ease: EASE }}
        >
            {children}
        </motion.span>
    </span>
);
