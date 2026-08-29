---
status: in-progress
type: feature
created: 2026-08-26
modified: 2026-08-26
repo-name: salt-tampa
---

# Port the Salt Tampa landing page to the home page

## context

### What the reviewed file actually is

`Salt Tampa Outreach - Landing Page (offline).html` is 6.5 MB in 386 lines. It is not a page — it
is a shipping container. Opening it, the structure is:

- A `<script type="__bundler/manifest">` holding 6.4 MB of base64 assets keyed by UUID.
- A `<script type="__bundler/template">` holding the real 54 KB document as a JSON string.
- An unpacking runtime that mints blob URLs and swaps the UUIDs back into `src`/`url()`.
- The unpacked document loads React + ReactDOM + `_ds_bundle.js` and compiles JSX **in the
  browser** via Babel standalone.

`_ds_bundle.js` is a compiled copy of the JSX that sits beside it in the same folder, under
`components/` and `ui_kits/website/`. **That folder is the source; the HTML is a preview build.**
The port therefore reads the `.jsx` files, never the bundle.

### What is worth keeping

The token layer. `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css` were
transcribed from the source `.fig` and carry semantic aliases on top of the raw values —
`--surface-band`, `--text-on-terracotta`, `--border-hairline`, `--focus-ring`. That is a real
design system and it drops in nearly as-is.

The component structure is also sound: 24 leaf components plus four section components
(`Hero`, `Services`, `TeamSection`, `Home`), 853 lines of JSX total. Small.

### What has to change before it can ship

Ten findings, each verified against the source files rather than inferred.

**1. It is a 1440px picture of a desktop, with no responsive behaviour at all.**
`#root{width:1440px;margin:0 auto}`. `Hero` is `height: 960` with three absolutely-positioned
bands at literal `top: 150 / 330 / 171`. `ImageCarousel` is `height: 753` with the strip at
`left: -289, top: 152`. `DonateBand` is `height: 900`, `Testimonial` `height: 960`. Nothing
reflows, nothing wraps, no media query exists anywhere. On a phone this is a horizontal-scroll
page. **This is the single largest piece of work in the port** — larger than the markup
conversion — and it is not a translation job, it is a layout redesign for every band.

**2. 52 MB of images.**

| File | Size |
| --- | --- |
| `hero-skyline.png` | 11 MB |
| `team-andrea.jpg` | 8.3 MB |
| `team-holly.jpg` | 8.2 MB |
| `carousel-2.jpg` | 7.9 MB |
| `service-shower.jpg` | 4.1 MB |
| `team-niehel.jpg` | 3.6 MB |
| `outreach-tent.jpg` | 3.4 MB |
| `donate-bg.png` | 3.3 MB |
| `hero-overlay.png` | 1.3 MB |

These are unprocessed export files. A healthy total page weight is 1–2 MB. Everything must go
through `astro:assets` for resizing, format negotiation and `srcset`.

**3. Styling is 100% inline React style objects.** Every component writes `style={{...}}`. No
classes, no stylesheet. Inline styles cannot express a media query, `:hover`, `:focus-visible`,
or `prefers-color-scheme`. That is why the buttons fake hover with JS state and why the page has
no focus rings. Converting to `.astro` with a scoped `<style>` block fixes all four at once, and
is the reason the port is a rewrite of the style layer rather than a copy of it.

**4. Token collisions with the existing repo -- 14 of them, measured.** `src/styles/index.css` and
the Salt token files declare the same name with different values in fourteen places: `--paper`,
`--radius-none`, and the entire `--space-1` .. `--space-12` scale. The two spacing scales are
unrelated -- the repo's is a linear rem ramp (`--space-9: 2.25rem`, 36px), Salt's is the
non-linear pixel scale drawn in the Figma (`--space-9: 64px`). Importing them unprefixed would
silently reflow every existing page. `--paper` is also theme-aware in the repo (`#fcfcfd` light,
`#0d1014` dark) while Salt's is a fixed off-white, so a bare override breaks dark mode too.

**5. Placeholder and broken copy is shipped throughout.**
- `"We prodive many services during out saturdays at trinity cafe"` — two typos, live in
  `Services.jsx`.
- The "Meet our team members" heading is followed by a contact-form blurb:
  `"Complete the form below to send us a message."` There is no form.
- Footer copyright reads `"2023 Ddsgnr. All right reserved."` — the template author's name, wrong
  year, and "right" should be "rights".
- Partner logos are `Logofy`, `LOGO company`, `logocompany`, `Partner`.
- Oscar's headshot reuses `outreach-tent.jpg`; `Testimonial` uses Andrea's *headshot* as a
  full-bleed background photograph.
- Nav links are `Services / Mission / About / Volunteer`, but only `#services`, `#about`,
  `#donate` and `#footer` exist as anchors. **`#mission` and `#volunteer` scroll nowhere.**

**5b. The image carousel is not a carousel.** `ImageCarousel` renders every image at once and
never reads its `index` prop for anything except which dot to highlight, so its dots and arrows
moved nothing. Combined with the `images.length - 1` dot count, the control was both fake and
miscounted.

**6. Every call to action is a no-op.** Donate fires
`toast("Donation flow — not wired in this kit.")`. Volunteer, Contact and the newsletter form all
fire toasts. Real destinations are required before launch.

**7. Accessibility gaps that will fail the repo's existing gates.**
- **No `<h1>` anywhere on the page.** The hero wordmark is two `<span>`s around an `<img>`.
  `e2e/homepage-design-direction.spec.ts` calls `document.querySelector('h1')`.
- Photographs are painted as CSS backgrounds on bare `<div>`s, so no service, team or carousel
  image has alt text.
- `CarouselDots` receives `count={Math.max(images.length - 1, 1)}` for a 5-image carousel —
  **4 dots for 5 slides.** A logic bug, not only an a11y one.
- Testimonial type is `#E3E3E3` over an arbitrary photograph; contrast is uncontrolled.
- No `:focus-visible` styling exists, because inline styles cannot carry it.

**8. `Layout.astro` cannot host a full-bleed landing page.** Verified: `Layout` wraps its default
slot in `<section aria-label="main-content"><article>…</article><aside><Sidebar/></aside></section>`.
A landing page cannot live inside that article/sidebar grid. `Base.astro` renders
`<Navigation>`, the header slot, `<slot/>` and `<Footer/>` — and **no `<main>`**, because `<main>`
comes from `MainSection` inside `Layout`. So `/` should render `Base` directly and supply its own
`<main id="main" tabindex="-1">`, or `e2e/skip-link.spec.ts` breaks.

**9. The existing homepage contract conflicts with the new design.**
`e2e/homepage-design-direction.spec.ts` enforces "colour marks hydration" — the accent may only
paint elements a visitor can operate. Salt Tampa puts terracotta on a full-bleed decorative band
and sand-coloured eyebrow type on top of it. That test cannot pass and must be retired
deliberately as part of the rebrand, with its accessibility assertions preserved in a replacement.

**10. Six font families.** Montserrat, Poppins, Inter, Lato, Roboto and Josefin Sans, plus
Neutrif Pro substituted by Poppins. The repo currently self-hosts exactly one face
(`inter-600.woff2`) and `Base.astro` documents that as a deliberate one-request budget. Six
families at multiple weights is a large performance regression for no visible gain — the comp
uses Inter and Lato for nearly all body copy.

### Scope decision

Confirmed with the requester: **full rebrand.** Salt Tampa becomes the site. The home page, site
title, navigation, footer and token layer all switch. The existing docs, blog, forum and dashboard
routes keep working and inherit the new brand.

## objective

Replace the Astro Kit home page with the Salt Tampa Outreach landing page, ported to responsive
server-rendered Astro components on the Salt Tampa token layer, and rebrand the site shell so
every route reads as one product.

## progress

Steps 1, 3 and 4 are done; the design system is imported and the components are ported. Recorded
here so the next session does not redo them.

**Done**

- `src/styles/salt/` -- the five token files, every name namespaced `--st-`, wired into
  `Base.astro`. Verified: zero name collisions remain against `src/styles/index.css`.
- `src/assets/salt/` -- twelve photographs downscaled to a 2400px long edge with `sips`, plus the
  logo mark, four placeholder partner marks and four icons. 52 MB -> 21 MB.
- `src/components/astro/salt/` -- all 24 components ported from JSX to `.astro` with scoped CSS,
  typed `Props`, real focus states, and fluid type in place of the fixed pixel sizes.
- `src/pages/salt-kit.astro` -- an unlinked specimen page that mounts every component, so the kit
  is compilable and reviewable before the home page is built on it. Delete once the real pages
  exercise the kit.
- Six Google Fonts families loaded from `Base.astro` head. Knowingly against the one-request
  budget; step 2 below still stands.

**Deliberately not done** -- `ui_kits/website/` (`Hero`, `Services`, `TeamSection`, `Home`). Those
are the page compositions, and every one of them is a fixed-height absolutely-positioned band.
Rebuilding them responsively is step 5, and it is a layout redesign rather than an import.

**Renames from the source, each for a stated reason**

| Source | Here | Why |
| --- | --- | --- |
| `ImageCarousel` | `ImageStrip` | It is not a carousel -- see finding 5b. Ported as a scroll-snap strip with no client JS. |
| `Footer` | `Footer` (imported as `SaltFooter`) | Avoids colliding with the existing `#components/astro/Footer.astro`. |

**Behaviour changed on purpose, not transcribed**

- `RoundIconButton` requires a `label`; the source hard-coded "Previous"/"Next".
- `TextInput` requires a real `<label>`; the source used the placeholder as the accessible name.
- `NewsletterForm` requires an `action`; the source posted nowhere.
- `Footer` requires `copyright`; the source's default names the wrong organisation and year.
- `TeamCard` social marks are links with labels, or absent -- the source drew unreachable glyphs.
- `Testimonial` quotation is white on the 63% scrim, not `#E3E3E3`, so contrast does not depend on
  which photograph is passed. Marked up as `<figure>`/`<blockquote>`.
- `SectionHeading` and `PartnerRow` take a `level`, so the page can own its heading outline.

**Verification status -- the build passes; browser rendering is still UNVERIFIED**

The production build runs. On PR #1 (commit `fa96746`) the `Build (node)`, `Build (vercel)` and
`Build (netlify)` jobs and the `Type-check, unit, and e2e tests` job all passed.

An earlier revision of this section recorded `npx astro build` and `astro dev` failing during
config load with `Tsconfig not found astro/tsconfigs/base`:

```text
[astro] Unable to load your Astro config
Tsconfig not found astro/tsconfigs/base
  at async EnvironmentPluginContainer.resolveId (node_modules/astro/node_modules/vite/...)
```

That was a local worktree condition, not a defect in the import -- `tsconfig.json`,
`astro.config.mjs` and `package.json` were untouched throughout, and CI builds the same commit
cleanly. Kept here only so the diagnostic is recognisable if it recurs locally.

What *is* verified:

- The production build succeeds on three adapters, and type-check and the unit and e2e suites pass.
- All 24 components and the specimen page compile with zero diagnostics.
- Every `--st-` token referenced by a component resolves to a definition.
- Zero token-name collisions against `src/styles/index.css`.

Still unverified: rendered layout, reflow at the four widths, contrast, axe, and total page weight.
A green build proves the page compiles and ships, not that it looks right -- the e2e suite that
passed does not yet contain a Salt home page spec (`e2e/salt-tampa-home.spec.ts` is still
unwritten, see `tests` below). Do not treat the layout work as done until a browser has loaded `/`
and `/salt-kit` at the four widths.

## steps

1. **Copy the token layer into `src/styles/salt/` and reconcile the collisions.**
   Copy `tokens/{colors,typography,spacing,effects}.css` from the design system. Rename the two
   colliding names (`--paper`, and any `--ink*` overlap with `src/styles/index.css`) to
   `--st-paper` / `--st-ink-*` so the existing pages keep their current values, then import the
   files from `src/styles/index.scss`.
   *Why:* the tokens are the reusable half of the design system, and an unreconciled `--paper`
   silently re-tints every existing route.
   *Verify:* load `/about` in the browser and read `getComputedStyle(document.body).background` —
   it must be unchanged from its pre-step value, captured first.

2. **Cut the font roster from six families to three, and self-host them.**
   Keep Montserrat (display/wordmark), Inter (UI) and Lato (editorial). Map `--font-event`,
   `--font-utility`, `--font-poster` and `--font-partners` onto those three. Subset to latin, ship
   `woff2` under `public/fonts/`, and preload only the faces above the fold.
   *Why:* six families at multiple weights is a large regression against the repo's documented
   one-request font budget, and the comp barely distinguishes them.
   *Verify:* DevTools Network panel, filtered to Font, on `/` — count the requests and confirm the
   total transferred font bytes.

3. **Optimise and import the imagery through `astro:assets`.**
   Move the twelve images into `src/assets/salt/`, and replace every CSS-background photograph with
   an `<Image>` (or `<Picture>`) so Astro emits resized `srcset` and modern formats. Give each one
   real alt text; mark the hero skyline and overlay decorative with `alt=""`.
   *Why:* 52 MB of unprocessed exports, painted as CSS backgrounds, is both the page-weight problem
   and the alt-text problem — `astro:assets` solves them together.
   *Verify:* `npm run build`, then measure the total bytes of `/` from the Network panel with cache
   disabled. Gate: under 2 MB on first load.

4. **Port the 24 leaf components to `src/components/astro/salt/*.astro`.**
   One `.astro` file per JSX component, same names. Every inline `style={{…}}` object becomes a
   scoped `<style>` block driven by the tokens from step 1. Export `type Props` for each, per
   `CLAUDE-PATTERNS.md`. Add the `:hover` / `:focus-visible` states the inline styles could not
   carry, using `--focus-ring`.
   *Why:* `.astro` with scoped CSS is what unlocks media queries, real focus states and zero client
   JS — the three things the inline-style architecture forbids.
   *Verify:* `npm run type-check` passes, and every component renders in isolation via a scratch
   route with visible focus rings under keyboard tab.

5. **Rebuild the six section components responsively.**
   `Hero`, `Services`, `TeamSection` and the three bands (`DonateBand`, `ImageStrip`,
   `Testimonial`). Replace every fixed `height` and absolute `top`/`left` with intrinsic sizing:
   the hero becomes a grid with the skyline as a background layer sized in `vh`/`aspect-ratio`, the
   service and team rows become auto-fit grids, and the carousel becomes a horizontal
   scroll-snap strip. Fix the `images.length - 1` dot count while here.
   *Why:* this is the largest and riskiest step; every band in the comp is a fixed-pixel drawing
   and none of them reflow.
   *Verify:* browser at 320, 390, 768 and 1280 px — `document.documentElement.scrollWidth` must
   equal the viewport width at each, i.e. no horizontal scroll.

6. **Rewrite the placeholder and broken copy.**
   Fix `"prodive"`/`"out saturdays"`, replace the contact-form blurb under "Meet our team members",
   correct the footer copyright, supply real partner logos or drop the row, give Oscar his own
   photograph, and use an actual testimonial subject rather than Andrea's headshot.
   *Why:* every one of these is visible to a first-time visitor and reads as an unfinished site.
   *Verify:* read the rendered page top to bottom; no lorem, no placeholder brand names, no typos.

7. **Wire the calls to action to real destinations.**
   Donate, Become a Volunteer, Contact Us and the newsletter form. Contact and volunteer can point
   at the existing `/contact-us` and `/message-us` routes; donate needs a real URL from the
   requester. Add the missing `#mission` and `#volunteer` anchor targets, or remove those nav links.
   *Why:* the comp ships four dead buttons and two nav links that scroll nowhere.
   *Verify:* click every button and nav link on the rendered page; each navigates or scrolls to a
   real target. No toast fires.

8. **Compose `/` on `Base.astro` with its own `<main>`.**
   `src/pages/index.astro` renders `Base` directly (not `Layout`), passes `hideHeader`, and wraps
   the sections in `<main id="main" tabindex="-1">`.
   *Why:* verified above — `Layout` puts the default slot inside an `<article>`/`<aside>` grid that
   a full-bleed landing page cannot occupy, and `Base` supplies no `<main>` of its own.
   *Verify:* `npx playwright test e2e/skip-link.spec.ts` passes, and the page has exactly one
   `<main>` and exactly one `<h1>`.

9. **Rebrand the site shell.**
   Update `SITE_TITLE`, `SITE_DESCRIPTION` and `SITE_LOGO` in `src/utils/site-config.ts`, port the
   Salt Tampa wordmark into `Navigation.astro` and `Footer.astro`, and replace the favicon.
   *Why:* the requester chose a full rebrand; leaving Astro Kit chrome on `/docs` makes the site
   read as two products.
   *Verify:* load `/`, `/about`, `/blog` and `/docs` — the same wordmark, nav and footer appear on
   all four.

10. **Retire and replace the old homepage design contract.**
    Delete `e2e/homepage-design-direction.spec.ts` and `HomeHero.astro`, and move its still-valid
    accessibility assertions (reflow at four widths, one `h1`, focus-visible on every control) into
    the new objective-verification spec from the `tests` section.
    *Why:* the "colour marks hydration" rule is incompatible with a design whose signature element
    is a full-bleed terracotta band; retiring it must be a deliberate, recorded decision rather than
    a silently deleted failing test.
    *Verify:* `npm test && npx playwright test` — green, with no skipped or deleted coverage that
    is not accounted for in the replacement spec.

## tests

### Objective-verification test (hero)

`e2e/salt-tampa-home.spec.ts` — a Playwright spec that loads `/` and asserts the plan's objective
directly. Every assertion fails if the port regresses to the reviewed comp's behaviour:

- **No horizontal scroll at 320, 390, 768 and 1280 px.** `scrollWidth === innerWidth` at each. This
  is the assertion the reviewed file fails today at every width below 1440.
- **Exactly one `<h1>`, and it is Salt Tampa's, not Astro Kit's.**
- **Total first-load transfer under 2 MB**, measured from `page.on('response')` body sizes. Fails
  against today's 52 MB of source imagery.
- **Every `<img>` has an `alt` attribute** (empty allowed only on the two decorative hero layers).
- **The carousel dot count equals the slide count.** Guards the `images.length - 1` bug.
- **Every interactive control has a visible `:focus-visible` outline** — tab through and assert a
  non-`none` computed `outline-style`.
- **No control fires a toast.** `.toast` never appears in the DOM after clicking each CTA.

### Unit tests

`tests/components/salt/*.test.ts` (Vitest, one per ported leaf component) — render each component
with typed props and assert its semantic output: heading level, alt text presence, `href` on links,
and that a token-driven custom property resolves rather than falling back.

### Integration tests

`tests/integration/salt-tokens.test.ts` — assert the Salt token files parse, that every semantic
alias resolves to a defined raw value, and that no Salt token name collides with a name already
declared in `src/styles/index.css`. This is the regression test for step 1.

### E2E tests

- `e2e/home-accessibility.spec.ts` — update the existing axe run to the new page; zero critical or
  serious violations against the real route, not a Storybook iframe.
- `e2e/skip-link.spec.ts` — unchanged, must still pass; it is the guard on step 8's `<main>`.

## acceptance-criteria

- [ ] `/` renders the Salt Tampa landing page: hero, services, mission band, team, donate band,
      carousel, testimonial and footer.
- [ ] The page reflows without horizontal scroll at 320, 390, 768 and 1280 px.
- [ ] First-load transfer for `/` is under 2 MB.
- [ ] The page has exactly one `<h1>` and every image carries alt text.
- [ ] axe reports zero critical or serious violations on the rendered route.
- [ ] Every button and nav link navigates or scrolls to a real target; no toast fires.
- [ ] No placeholder copy, partner name, typo or wrong-year copyright remains.
- [ ] `/about`, `/blog` and `/docs` show the same Salt Tampa nav, footer and wordmark as `/`.
- [ ] `/about` renders with the same computed background colour as before step 1.
- [ ] `npm test`, `npx playwright test`, `npm run type-check` and `npm run lint:styles` all pass.

## verification

End-to-end, from a clean checkout:

1. `npm run build && npm run preview`, then load `/` in a real browser.
2. Walk the page at 320, 390, 768 and 1280 px; confirm no horizontal scroll and no clipped band.
3. Tab from the top of the document to the footer; every stop shows a visible focus ring and the
   skip link lands on `<main>`.
4. Network panel, cache disabled: total transfer under 2 MB, font requests within budget.
5. Run axe against the running route.
6. Click every CTA and nav link; each reaches a real destination.
7. `npm test && npx playwright test && npm run type-check`.

## next-steps

- **Recover the real Neutrif Pro face**

```text
The Salt Tampa design system substitutes Poppins for Neutrif Pro (used once, on the "Our Partners"
heading at 700/54px). Check whether Salt Tampa Outreach holds a licence for Neutrif Pro. If they
do, self-host it under public/fonts/ and point --font-partners at it. If not, confirm Poppins as
the permanent choice and delete the SUBSTITUTE comment from tokens/typography.css so the note stops
reading as unfinished work.
```

- **Port the remaining routes onto the Salt Tampa design language**

```text
The Salt Tampa rebrand covered the home page and the site shell (nav, footer, tokens, wordmark).
The interior routes — /about, /blog, /docs, /contact-us — still use Astro Kit body styling on top
of the new shell. Review each one against the Salt Tampa design system in
"/Users/shawnsandy/design-box/Salt Tampa Outreach Design System" and bring their headings, cards
and typography onto the Salt token layer.
```

- **Make the carousel and testimonial fully static**

```text
The Salt Tampa home page carousel and testimonial rotator are the only two pieces of the landing
page that could need client JavaScript. Check whether the shipped implementation used CSS
scroll-snap and stacked blockquotes as planned, or fell back to React islands. If islands are
present, try replacing them with the CSS-only versions and confirm the page ships zero client JS.
```

## unresolved-questions

- **Real donate destination**

```text
The Salt Tampa home page has a Donate button in the navbar and a full-bleed Donate band, but the
design kit wires both to a placeholder toast. Find out what Salt Tampa Outreach actually uses for
donations — a Givebutter/Donorbox/Stripe link, a PayPal page, or an internal route — and wire both
CTAs to it. Recommend an approach if no destination exists yet.
```

- **Partner logos**

```text
The Salt Tampa team section shows four partner logos named Logofy, LOGO company, logocompany and
Partner — all placeholders from the design template. Find out whether Salt Tampa Outreach has real
partner organisations whose logos should appear. If they do not, recommend whether to drop the
partner row entirely or replace it with something real, and explain the tradeoff.
```
