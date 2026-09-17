import { useEffect, useState } from "react";
import axios from "axios";
import { API, waLink } from "@/data/site";
import { Chapter, Reveal } from "@/components/Reveal";

const FALLBACK_CATEGORIES = ["Starters", "Main Course", "Fast Food", "Snacks", "Beverages", "Desserts"];

const MenuSection = () => {
    const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
    const [items, setItems] = useState([]);
    const [active, setActive] = useState(FALLBACK_CATEGORIES[0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${API}/menu`)
            .then((res) => {
                setCategories(res.data.categories || FALLBACK_CATEGORIES);
                setItems(res.data.items || []);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const shown = items.filter((i) => i.category === active && i.available);

    return (
        <section id="menu" data-testid="menu-section" className="py-20 sm:py-28 bg-[#FAF6F0]">
            <div className="max-w-5xl mx-auto px-5 sm:px-8">
                <Chapter num="04" label="Taste" />
                <Reveal delay={0.05}>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2C1E16] tracking-tight">
                        Our Menu
                    </h2>
                    <p className="mt-3 text-sm text-[#6B584C]">
                        Sample menu — dishes and prices shown are placeholders and will be updated by the restaurant.
                    </p>
                </Reveal>

                <Reveal delay={0.15}>
                    <div className="mt-8 flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap" data-testid="menu-tabs">
                        {categories.map((c) => (
                            <button
                                key={c}
                                data-testid={`menu-tab-${c.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => setActive(c)}
                                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 border ${
                                    active === c
                                        ? "bg-[#18110D] text-[#F3E5AB] border-[#18110D]"
                                        : "bg-[#FFFDF9] text-[#6B584C] border-[#D4AF37]/25 hover:border-[#D4AF37]/60"
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <div className="mt-8 space-y-4" data-testid="menu-items">
                    {loading && <p className="text-sm text-[#6B584C]">Loading menu…</p>}
                    {!loading && shown.length === 0 && (
                        <p className="text-sm text-[#6B584C]">Items for this category will be added soon.</p>
                    )}
                    {shown.map((item, i) => (
                        <Reveal key={item.id} delay={0.05 * i}>
                            <div
                                data-testid={`menu-item-${item.id}`}
                                className="rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/20 p-5 sm:p-6 hover:border-[#D4AF37]/50 transition-colors duration-300"
                            >
                                <div className="flex items-baseline gap-3">
                                    <span
                                        className={`w-3 h-3 rounded-sm border-2 shrink-0 translate-y-0.5 ${
                                            item.veg ? "border-green-700" : "border-[#8B3A2A]"
                                        }`}
                                        title={item.veg ? "Veg" : "Non-veg"}
                                    />
                                    <h3 className="font-serif text-lg text-[#2C1E16]">{item.name}</h3>
                                    {item.is_sample && (
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8912B] bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-2 py-0.5">
                                            Sample
                                        </span>
                                    )}
                                    <span className="flex-1 border-b border-dotted border-[#D4AF37]/40" />
                                    <span className="font-mono text-sm text-[#B8912B] whitespace-nowrap">
                                        {item.price > 0 ? `₹${item.price}` : "₹000"}
                                    </span>
                                </div>
                                {item.description && (
                                    <p className="mt-2 text-sm text-[#6B584C] pl-6">{item.description}</p>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.1}>
                    <div className="mt-10 text-center">
                        <a
                            data-testid="menu-full-btn"
                            href={waLink("Hello MW Bistro, please share your full menu.")}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[#18110D] text-[#F3E5AB] font-semibold text-sm px-8 py-3.5 hover:bg-[#2C1E16] transition-colors duration-300"
                        >
                            View Full Menu
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default MenuSection;
