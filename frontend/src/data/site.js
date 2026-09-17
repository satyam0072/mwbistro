export const SITE = {
    name: "MW Bistro",
    subtitle: "Bus Cafe",
    tagline: "A Cozy Ride to Great Food & Beautiful Moments.",
    phone: "06202224214",
    phoneHref: "tel:06202224214",
    whatsappNumber: "91620224214",
    whatsappDisplay: "+91 62022 4214",
    addressLines: ["P&M, Mall Rd,", "Kurji, Patna,", "Bihar 800010"],
    addressFull: "MW Bistro (Bus Cafe), P&M, Mall Rd, Kurji, Patna, Bihar 800010",
    mapsDirections:
        "https://www.google.com/maps/dir/?api=1&destination=" +
        encodeURIComponent("P&M, Mall Rd, Kurji, Patna, Bihar 800010"),
    mapsEmbed:
        "https://www.google.com/maps?q=" +
        encodeURIComponent("P&M, Mall Rd, Kurji, Patna, Bihar 800010") +
        "&output=embed",
};

export const IMAGES = {
    bus: "/images/bus-night.webp",
    canopy: "/images/canopy.webp",
    birthdayNeon: "/images/birthday-neon.webp",
    birthdayGold: "/images/birthday-gold.webp",
    birthdayRed: "/images/birthday-red.webp",
};

export const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Booking", href: "#booking" },
    { label: "Contact", href: "#contact" },
];

export const waLink = (message) =>
    `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const scrollToId = (id) => {
    const el = document.querySelector(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72 });
    else el.scrollIntoView({ behavior: "smooth" });
};

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
