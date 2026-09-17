import { Heart, Bus, UtensilsCrossed, Camera, Coffee, Sparkles } from "lucide-react";
import { Chapter, Reveal } from "@/components/Reveal";

const REASONS = [
    { icon: Heart, title: "Couple-Friendly Atmosphere" },
    { icon: Bus, title: "Unique Bus Café Experience" },
    { icon: UtensilsCrossed, title: "Delicious Food" },
    { icon: Camera, title: "Instagram-Worthy Ambience" },
    { icon: Coffee, title: "Cozy Seating" },
    { icon: Sparkles, title: "Perfect for Dates & Hangouts" },
];

const WhyVisit = () => (
    <section data-testid="why-visit-section" className="py-20 sm:py-28 bg-[#F4EDE3]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Chapter num="02" label="Why Us" />
            <Reveal delay={0.05}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2C1E16] tracking-tight mb-12">
                    Why Visit MW Bistro?
                </h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {REASONS.map((r, i) => (
                    <Reveal key={r.title} delay={0.07 * i}>
                        <div
                            data-testid={`why-card-${i}`}
                            className="group h-full rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/20 p-6 sm:p-7 hover:border-[#D4AF37]/50 hover:-translate-y-1 hover:shadow-[0_20px_48px_-10px_rgba(212,175,55,0.25)] transition-[border-color,box-shadow,transform] duration-500"
                        >
                            <r.icon className="w-6 h-6 text-[#B8912B] mb-4 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="font-serif text-base sm:text-lg text-[#2C1E16] leading-snug">{r.title}</h3>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default WhyVisit;
