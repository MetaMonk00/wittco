# Website Build Brief

**Fill this out, hand it back to Claude along with the `template/` folder, and you get a finished site.**
Anything you leave blank, Claude will ask about or make a sensible call on — but the more you fill in, the closer the first draft lands.

---

## How to use this (read me first)

1. Copy this file and rename it for the client, e.g. `brief-smith-plumbing.md`.
2. Fill in every `______` you can. Delete sections that don't apply.
3. Attach the client's **logo** and any **photos** to the chat.
4. Say to Claude: *"Build this site using the template folder and this brief."*

**What Claude should do with a filled-in copy of this file:**
> Use `template/` as the starting skeleton. Replace every `{{TOKEN}}` in the HTML with the values from
> this brief, fill the `:root` palette and font variables in `template/css/style.css`, set the real rates
> in `template/js/quote.js`, and drop the client's logo into `template/assets/`. Keep the existing layout,
> pill shapes, animated background and responsive rules unless this brief says otherwise. Delete any
> section the brief marks "skip". Verify every page renders in a browser before committing.

---

## 1. The business

| Field | Value |
|---|---|
| Business name | `______` |
| What they do (one line) | `______` |
| Phone | `______` |
| Email | `______` |
| Hours | `______` |
| Service area / address | `______` |
| Website domain (if any) | `______` |
| Existing lead form to embed? | `______` (paste the embed code, or "no") |

**Tagline / slogan:** `______`

**Three proof points** — the numbers that build trust (e.g. "500+ jobs completed", "10+ years", "Mon–Sat 7–6"):
1. `______`
2. `______`
3. `______`

---

## 2. Look & feel

**Main brand color:** `______` (hex if you have it, or just "navy blue", "forest green")
Claude will build six shades from this — dark for the hero and footer, mid for buttons, light for chips.

**Accent colors** — up to four small pops, usually pulled straight from the logo:
`______`, `______`, `______`, `______`

**Fonts:** `______` (or say "pick something that fits" — name the mood: friendly and rounded, sharp and modern, classic and serious)

**Shape:** `______` (default is pills everywhere — fully rounded buttons and inputs. Say "boxy" or "slightly rounded" to change it.)

**Background:** `______` (default is an animated gradient with floating bubbles and a wave edge. Say "static", or describe something else — drifting clouds, subtle grid, photo hero.)

**Reference sites** — anything you want it to feel like:
`______`

---

## 3. Logo & images

- [ ] Logo attached — **file type:** `______`
- [ ] Background needs removing? `______`
- [ ] Photos attached — list what each one is: `______`

If no real photos exist, Claude will use icon tiles instead of images (that's what the template does).

---

## 4. Pages

Default is four pages. Check what you want, add anything missing.

- [ ] **Home** — hero, services preview, quote teaser, how-it-works, service area, call-to-action
- [ ] **Services** — the detail pages for what they sell
- [ ] **Quote** — the interactive estimate tool (see §6)
- [ ] **Contact** — contact cards + lead form
- [ ] Other: `______`

---

## 5. Services

**Two main services** get the big detailed treatment:

**Service 1 — name:** `______`
Description (one or two sentences): `______`
Bullet points (aim for five):
- `______`
- `______`
- `______`
- `______`
- `______`

**Service 2 — name:** `______`
Description: `______`
Bullets:
- `______`
- `______`
- `______`
- `______`
- `______`

**Who they serve** — four customer types shown as icon tiles:
1. `______`
2. `______`
3. `______`
4. `______`

**How it works** — the three-step process:
1. `______`
2. `______`
3. `______`

---

## 6. Quote tool

The tool has **two modes** the visitor toggles between, and a live price that updates as they answer.

**Mode A name:** `______` (e.g. Residential, Basic, One-time)
**Mode B name:** `______` (e.g. Commercial, Enterprise, Recurring)

**Skip the quote tool entirely?** `______` (yes/no — if yes, Claude removes the page and its links)

### Mode A questions

| # | Question | Options | Price effect |
|---|---|---|---|
| 1 | `______` | `______` | `______` |
| 2 | `______` | `______` | `______` |
| 3 | `______` (add-ons, multi-select) | `______` | `+$____ each` |

### Mode B questions

| # | Question | Options | Price effect |
|---|---|---|---|
| 1 | `______` | `______` | `______` |
| 2 | `______` | `______` | `______` |
| 3 | `______` | `______` | `______` |
| 4 | `______` (quantity dropdown) | `______` | `______` |

**Price is shown per:** `______` (month / visit / job / year)
**Show a range or a single number?** `______` (default: a ±10% range, since it's an estimate)
**What happens on submit?** `______` (default: opens a pre-filled email to the business. Other options: post to their CRM form, or a webhook — paste the URL.)

---

## 7. Anything else

`______`

---

## Appendix — what the template already gives you

You don't need to ask for any of this; it's built in:

- Four responsive pages that work down to phone width, with a hamburger menu
- Pill-shaped buttons, inputs, chips, tags and toggles throughout
- Animated background: drifting gradient, rising bubbles, wave edge on every hero
- Scroll-reveal animations that fade sections in, and a nav bar that gains a shadow on scroll
- A working two-mode quote tool with live price math and a line-item breakdown
- Contact cards, a lead form shell, and a three-column footer
- `prefers-reduced-motion` support, keyboard focus states, and semantic HTML
- Deep links — `quote.html?mode=commercial` opens the second mode directly

**Files:**

| File | What it holds |
|---|---|
| `index.html` `services.html` `quote.html` `contact.html` | The four pages |
| `css/style.css` | All styling. Only the `:root` block at the top needs filling in. |
| `js/main.js` | Nav, bubbles, scroll reveal. No content in here. |
| `js/quote.js` | The quote tool's questions and pricing math. |
| `assets/` | Logo and images go here. |
