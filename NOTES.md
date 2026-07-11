# Witt Co. — Existing Site Notes (index.html)

Reference notes on the current single-page site, captured before building the new site so no business info/content gets lost.

## Business
- **Name:** Witt Co. (styled "WITT CO." with "CO." in aqua)
- **Tagline/positioning:** "Crystal Clear Pools" — professional pool service
- **Industry:** Residential & commercial pool cleaning, maintenance, and equipment upgrades
- **Copyright:** © 2025 Witt Co. Pool Service. All rights reserved.

## Contact Info
- **Phone:** (850) 428-4137
- **Email:** wittcopoolpros@gmail.com
- **Hours:** Mon–Sat, 7am – 6pm
- **Service area:** Destin, FL + surrounding Emerald Coast area ("locally owned & operated")
- **Lead form:** Embedded GoHighLevel iframe form
  - `https://link.wittcopoolpros.com/widget/form/94lxNe8dB6l0a4tfWwa6`
  - Script: `https://link.wittcopoolpros.com/js/form_embed.js`
  - (This is the real, live lead-capture form — worth carrying over to the new site.)

## Page Structure (single page, anchor-linked nav)
1. **Nav** — logo, links to Services / Service Area / Contact, "Get a Quote" CTA button
2. **Hero** (`#hero`)
   - Eyebrow: "Professional Pool Service"
   - H1: "CRYSTAL CLEAR POOLS."
   - Subhead: "Witt Co. keeps your pool pristine year-round — from routine maintenance and cleaning to full equipment upgrades."
   - CTAs: "Schedule Service" (→ contact), "Our Services" (→ services)
   - Stats: **500+** Pools Serviced, **10+** Years Experience
   - Decorative animated water/wave/bubble background
3. **Services** (`#services`)
   - **Cleaning & Maintenance** 🌊 — weekly/bi-weekly plans, chemical balancing & water testing, skimming/brushing/vacuuming, filter cleaning & backwashing, algae prevention & treatment
   - **Equipment Upgrades** ⚙️ — variable-speed pump installation, heater/heat pump upgrades, LED lighting systems, automated control systems, saltwater conversion
4. **Service Area** (`#area`)
   - Copy: "Witt Co. proudly serves homeowners and commercial properties across the region. Don't see your city listed? Give us a call — we may still be able to help."
   - Tags: Destin, FL / + Surrounding Areas
   - Visual card: "Locally Owned & Operated" — "Proudly serving Destin, FL and the surrounding Emerald Coast." + "Check My Area" CTA
5. **Contact** (`#contact`)
   - Heading: "Let's Talk Pools"
   - Copy: "Ready for a cleaner pool or an equipment upgrade? Reach out and we'll get back to you within one business day."
   - Contact detail blocks: phone, email, hours (see above)
   - Embedded lead-gen form (iframe, see above)
6. **Footer** — logo repeat + copyright

## Design/Brand System
- **Colors:**
  - `--navy: #0a1628` (primary bg)
  - `--deep: #0d1f3c` (alt section bg)
  - `--blue: #1a5fa8`
  - `--aqua: #00c2e0` (accent/CTA)
  - `--aqua-light: #7de8f7` (hover state)
  - `--white: #f5f9ff`
  - `--muted: #8ba4c0`
- **Fonts:** Bebas Neue (display/headings), DM Sans (body) — loaded via Google Fonts
- **Style notes:** dark navy theme, aqua accents, uppercase letter-spaced labels, animated water waves/bubbles in hero, scroll fade-up animations via IntersectionObserver, service cards with bottom-border hover accent, responsive breakpoint at 900px

## Tech
- Single static `index.html`, no build tooling, inline `<style>` and `<script>`, no external JS framework
- Third-party: Google Fonts, GoHighLevel embedded form/script

## Reusable for new site
- Business name, phone, email, hours, service area (Destin, FL + Emerald Coast)
- Two core service categories and their bullet lists
- Stats (500+ pools serviced, 10+ years experience)
- Live lead-capture form embed (still points to wittcopoolpros.com GoHighLevel account)
