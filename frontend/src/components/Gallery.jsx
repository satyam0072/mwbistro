import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "@/data/site";
import { Chapter, Reveal } from "@/components/Reveal";

const PHOTOS = [
    { src: IMAGES.bus, caption: "The bus café, glowing after dark" },
    { src: IMAGES.canopy, caption: "Garden canopy dinners under lantern light" },
    { src: IMAGES.birthdayNeon, caption: "Birthday surprises — neon, balloons & roses" },
    { src: IMAGES.birthdayGold, caption: "Celebration setups, styled your way" },
    { src: IMAGES.birthdayRed, caption: "Evenings made for two" },
];

const Gallery = () => {
    const [selected, setSelected] = useState(null);

    const move = (dir) => setSelected((s) => (s + dir + PHOTOS.length) % PHOTOS.length);

    return (
        <section id="gallery" data-testid="gallery-section" className="py-20 sm:py-28 bg-[#F4EDE3]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <Chapter num="05" label="Gallery" />
                <Reveal delay={0.05}>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2C1E16] tracking-tight mb-12">
                        Moments Under the Fairy Lights
                    </h2>
                </Reveal>

                <div className="columns-2 lg:columns-3 gap-4 [column-fill:balance]">
                    {PHOTOS.map((p, i) => (
                        <Reveal key={p.src} delay={0.05 * i} className="mb-4 break-inside-avoid">
                            <button
                                data-testid={`gallery-photo-${i}`}
                                onClick={() => setSelected(i)}
                                className="group relative block w-full rounded-2xl overflow-hidden img-frame"
                            >
                                <img
                                    src={p.src}
                                    alt={p.caption}
                                    loading="lazy"
                                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <span className="absolute inset-0 bg-gradient-to-t from-[#18110D]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="absolute bottom-3 left-4 right-4 text-left text-xs sm:text-sm text-[#F5EFE6] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {p.caption}
                                </span>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected !== null && (
                    <motion.div
                        data-testid="gallery-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-[#18110D]/95 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setSelected(null)}
                    >
                        <button
                            data-testid="lightbox-close"
                            aria-label="Close"
                            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-[#D4AF37]/40 text-[#F5EFE6] flex items-center justify-center hover:bg-[#D4AF37]/20"
                            onClick={() => setSelected(null)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <button
                            data-testid="lightbox-prev"
                            aria-label="Previous"
                            className="absolute left-3 sm:left-8 w-11 h-11 rounded-full border border-[#D4AF37]/40 text-[#F5EFE6] flex items-center justify-center hover:bg-[#D4AF37]/20"
                            onClick={(e) => { e.stopPropagation(); move(-1); }}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <motion.figure
                            key={selected}
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35 }}
                            className="max-w-3xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={PHOTOS[selected].src}
                                alt={PHOTOS[selected].caption}
                                className="w-full max-h-[75vh] object-contain rounded-2xl"
                            />
                            <figcaption className="mt-4 text-center font-serif italic text-[#C4B5A5]">
                                {PHOTOS[selected].caption}
                            </figcaption>
                        </motion.figure>
                        <button
                            data-testid="lightbox-next"
                            aria-label="Next"
                            className="absolute right-3 sm:right-8 w-11 h-11 rounded-full border border-[#D4AF37]/40 text-[#F5EFE6] flex items-center justify-center hover:bg-[#D4AF37]/20"
                            onClick={(e) => { e.stopPropagation(); move(1); }}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
