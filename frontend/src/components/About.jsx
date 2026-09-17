import { Bus, Heart, Sparkles } from "lucide-react";
import { Chapter, Reveal } from "@/components/Reveal";

const FEATURES = [
    {
        icon: Bus,
        title: "Unique Bus Café",
        desc: "A dining experience with a distinctive bus-café setting.",
    },
    {
        icon: Heart,
        title: "Cozy Atmosphere",
        desc: "A warm and comfortable environment for spending quality time.",
    },
    {
        icon: Sparkles,
        title: "Memorable Moments",
        desc: "A relaxed space for dates, birthdays, meetups and evening hangouts.",
    },
];

const About = () => (
    <section id="about" data-testid="about-section" className="py-20 sm:py-28 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Chapter num="01" label="Our Story" />
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-14">
                <Reveal delay={0.05}>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2C1E16] tracking-tight">
                        About MW Bistro
                    </h2>
                </Reveal>
                <Reveal delay={0.15}>
                    <p className="text-base leading-relaxed text-[#6B584C]">
                        MW Bistro is a unique bus café in Patna created for people who want more than just a meal.
                        Enjoy tasty food, a cozy atmosphere and a memorable setting designed for relaxed
                        conversations, dates, birthdays and casual hangouts.
                    </p>
                </Reveal>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
                {FEATURES.map((f, i) => (
                    <Reveal key={f.title} delay={0.1 * i}>
                        <div
                            data-testid={`about-card-${i}`}
                            className="group h-full rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/20 p-7 shadow-[0_12px_36px_-8px_rgba(28,18,12,0.10)] hover:shadow-[0_20px_48px_-10px_rgba(212,175,55,0.22)] hover:-translate-y-1 transition-[box-shadow,transform] duration-500"
                        >
                            <span className="w-12 h-12 rounded-full bg-[#D4AF37]/12 border border-[#D4AF37]/30 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/20 transition-colors duration-500">
                                <f.icon className="w-5 h-5 text-[#B8912B]" />
                            </span>
                            <h3 className="font-serif text-lg text-[#2C1E16] mb-2">{f.title}</h3>
                            <p className="text-sm leading-relaxed text-[#6B584C]">{f.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default About;
