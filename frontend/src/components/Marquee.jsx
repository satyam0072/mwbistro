import { Heart } from "lucide-react";

const PHRASES = [
    "Cozy Dates",
    "Birthday Celebrations",
    "Fairy-Light Evenings",
    "Bus Café Dining",
    "Coffee & Conversations",
    "Moments That Matter",
];

const Row = () => (
    <div className="flex shrink-0 items-center">
        {PHRASES.map((p) => (
            <span key={p} className="flex items-center">
                <span className="font-serif italic text-xl sm:text-2xl text-[#F5EFE6]/85 px-6 whitespace-nowrap">{p}</span>
                <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]/50 shrink-0" />
            </span>
        ))}
    </div>
);

const Marquee = () => (
    <div data-testid="marquee" className="bg-[#18110D] border-y border-[#D4AF37]/15 py-5 overflow-hidden">
        <div className="marquee-track flex w-max">
            <Row />
            <Row />
        </div>
    </div>
);

export default Marquee;
