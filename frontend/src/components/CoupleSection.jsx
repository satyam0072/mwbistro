import { Heart } from "lucide-react";
import { IMAGES, scrollToId } from "@/data/site";
import { Chapter, Reveal } from "@/components/Reveal";

const CoupleSection = () => (
    <section data-testid="couple-section" className="py-20 sm:py-28 bg-[#18110D] relative overflow-hidden">
        <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(212,175,55,0.12), transparent)" }}
        />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="relative">
                    <Reveal>
                        <div className="rounded-3xl overflow-hidden img-frame">
                            <img
                                src={IMAGES.canopy}
                                alt="Garden canopy with drapes and lanterns at MW Bistro"
                                className="w-full h-[320px] sm:h-[440px] object-cover"
                                loading="lazy"
                            />
                        </div>
                    </Reveal>
                    <Reveal delay={0.2} className="absolute -bottom-8 -right-3 sm:-right-8 w-40 sm:w-56">
                        <div className="rounded-2xl overflow-hidden img-frame shadow-2xl">
                            <img
                                src={IMAGES.birthdayNeon}
                                alt="Birthday decoration with neon sign at MW Bistro"
                                className="w-full h-40 sm:h-56 object-cover"
                                loading="lazy"
                            />
                        </div>
                    </Reveal>
                    <Heart className="absolute -top-4 -left-2 w-6 h-6 text-[#C86D51] fill-[#C86D51]/50 animate-floaty" />
                </div>

                <div className="pt-10 lg:pt-0">
                    <Chapter num="03" label="For Couples" dark />
                    <Reveal delay={0.1}>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5EFE6] tracking-tight flex flex-wrap items-center gap-3">
                            Made for Moments That Matter
                            <Heart className="w-7 h-7 text-[#C86D51] fill-[#C86D51] animate-glow" />
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="mt-6 text-base leading-relaxed text-[#C4B5A5] max-w-lg">
                            Whether it’s a cozy date, a birthday celebration, a casual meetup or an evening
                            hangout, MW Bistro offers a relaxed setting where good food and beautiful moments
                            come together.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <button
                            data-testid="couple-plan-btn"
                            onClick={() => scrollToId("#booking")}
                            className="mt-9 rounded-full bg-[#D4AF37] text-[#18110D] font-semibold text-sm px-8 py-3.5 hover:bg-[#F3E5AB] hover:-translate-y-0.5 transition-[background-color,transform] duration-300"
                        >
                            Plan Your Visit
                        </button>
                    </Reveal>
                </div>
            </div>
        </div>
    </section>
);

export default CoupleSection;
