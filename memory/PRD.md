# MW Bistro (Bus Cafe) — PRD

## Original Problem Statement
Build a modern, premium, fully mobile-responsive single-page restaurant website for MW Bistro (Bus Cafe), P&M, Mall Rd, Kurji, Patna, Bihar 800010. Phone 06202224214, WhatsApp +91 62022 4214. Cozy, romantic, elegant café aesthetic using the 5 uploaded real MW Bistro photos. Sticky nav, kinetic hero, about, why-visit, couple-friendly section, editable menu (6 categories), masonry gallery with lightbox, booking form that opens WhatsApp with a pre-filled message, call/directions CTAs, contact with embedded Google Map, premium footer, SEO title/meta. No invented facts, no fake reservation confirmations. Brand note: loved by couples.

## User Personas
- Couples planning a cozy date or birthday celebration in Patna (mobile-first, WhatsApp booking)
- Restaurant owner/manager who edits the menu via a password-protected admin page

## Architecture
- Frontend: React (CRA + craco), Tailwind, framer-motion (reveals/parallax), lenis (smooth scroll), react-router (/ and /admin), sonner toasts. Real photos served from /public/images.
- Backend: FastAPI + motor (MongoDB). Public GET /api/menu; JWT admin auth (bcrypt, 12h tokens, brute-force lockout 5 tries/15 min); protected menu CRUD + reset at /api/admin/menu*.
- Admin page: /admin — login, add/edit/delete menu items, reset to sample menu.

## Implemented (2026-09-17)
- Sticky glass navbar (desktop links, mobile drawer) with prominent Book a Table CTA
- Kinetic hero: real bus-night photo, masked line-by-line reveal, parallax, badge, Book/Call/Directions CTAs
- Slow editorial marquee band
- About (3 feature cards), Why Visit (6 cards), Couple-friendly split section with canopy + birthday photos
- Menu: 6 categories, tabbed, 18 seeded sample items (clearly marked "Sample", ₹000), served from MongoDB
- Masonry gallery (5 real photos) with lightbox (prev/next/close)
- Booking form (name, mobile, date, time, guests, seating, request) -> opens WhatsApp prefilled; thank-you state; no fake confirmation
- Contact section with address, phone, WhatsApp, 3 CTAs, embedded Google Map
- Footer with quick links, socials placeholder, copyright, Manage Menu link
- Mobile sticky bottom CTA bar (Call / WhatsApp / Book)
- SEO title + meta description + keywords
- Admin: JWT login (admin@mwbistro.in / MWBistro@2026), menu CRUD, reset samples
- Backend verified: menu list, login, me, create/update/delete, 401 on bad auth, lockout; menu reset after tests

## Backlog
- P1: Replace sample menu items with the real menu (owner can do via /admin)
- P1: Real Instagram/Facebook URLs (currently placeholders)
- P2: Opening hours section once confirmed by the restaurant
- P2: More real photos (interior seating, food) for gallery/menu cards
- P2: Booking notifications to owner email (Resend) in addition to WhatsApp
