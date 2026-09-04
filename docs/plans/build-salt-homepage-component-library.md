---
status: in-progress
type: feature
created: 2026-09-04
artifact-url: https://claude.ai/code/artifact/b2dba518-1f89-4da2-9c4a-70e96a62a615
issue: https://github.com/shawn-sandy/salt-tampa/issues/5
effort: high
workflow: never
glance: The Salt Tampa homepage exists only as a flat design file and as an older Astro component set built from a different, larger-scaled design. This plan turns the current design into nineteen React components with live Storybook stories, so a designer or developer can open one URL, click through every pattern, read its props, and see the accessibility panel — instead of reading a 9 MB bundled HTML file.
---

# Plan: Turn the Salt Tampa homepage design into a browsable component library

## Objective

Build every visual pattern in the Salt Tampa homepage design as a React component under `src/components/react/salt/`, each with a Storybook story, on top of a new `--salt-*` design-token layer transcribed from the design file.

## Context

The design file `Salt Tampa Homepage.html` (in the `slat-tampa-designs` folder) is a Claude Design canvas: a 9 MB bundled page whose real source is a 50 KB HTML template with its images packed in as base64 data. Extracting that template is how this plan was written, and it revealed two facts that shape everything below.

**The design has moved on from what the repo already has.** In August the repo imported a Salt Tampa design system: 27 `.astro` components under `src/components/astro/salt/` and a `--st-*` token set under `src/styles/salt/`. The design file attached here uses a *different* token set, `--salt-*`, at a materially different scale — 14px body text against the old 16px, a 34px section heading against the old 48px, a 10px photo radius against the old 20px. It also introduces patterns that have no equivalent in the old set: a "Coming soon" status badge, a team-member slider, a rolling three-up photo gallery, and placeholder image slots for artwork nobody has chosen yet. Retro-fitting the 27 existing components would touch the shipped home page and risk regressions there, so this plan leaves them alone and builds a new, separately-namespaced set beside them. Both token namespaces can coexist because neither shares a variable name with the other.

**Storybook here cannot render Astro components.** The project's Storybook runs `@storybook/react-vite`, and `.storybook/main.ts` documents the limitation in its own header comment: Astro components are server-rendered and have no Storybook framework, so they are sent to the Starlight guide instead. A community package, `storybook-astro`, does exist, but version 0.2.1 declares support for Astro 4 through 6 and this project runs Astro 7.1.6 — outside the supported range, from a three-version-old package with one maintainer. That is not a dependency a design system should rest on. Building the patterns in React instead means they render in the Storybook that already works, with live controls, generated prop tables, and the accessibility panel, on day one.

**There is a known styling trap to design around.** Every existing Salt `.astro` component carries a comment explaining that a global stylesheet claims `background-color`, `color`, `font-size` and `font-weight` on every `a[href]` at specificity (0,1,1), each through a CSS custom property that is never defined — so each declaration is invalid at computed-value time and silently resets the control. Buttons measured as bare cyan 16px text. The existing components work around it by doubling their class selector to reach (0,2,0). Storybook's `.storybook/preview.ts` loads the same stylesheets the site loads, so the same trap applies here. Step 2 measures it rather than assuming it, and the result decides whether every interactive pattern needs the doubled selector.

**Risk: the design file is not finished.** Six image slots are still placeholders (four partner logos, two service photos, the testimonial background), both testimonial quotes read "Testimonial coming soon.", and the donate section is a flat photograph with an invisible 12%-wide link positioned over baked-in artwork rather than real text and a real button. These are recorded in Unresolved Questions and are built as explicit placeholder components, not faked as finished content.

## Decisions

- Patterns are built as React, not as Astro components rendered through `storybook-astro` — the package's peer range stops at Astro 6 and this repo is on Astro 7.1.6, so adopting it would be an unverified compatibility bet on a single-maintainer package at the base of the design system.
- The new tokens keep the design file's own `--salt-*` prefix rather than being folded into the existing `--st-*` set — the two scales genuinely differ, and merging them would silently reflow the shipped home page.
- The 27 existing `.astro` components stay untouched. This plan adds beside them; it does not migrate the current home page, which stays on `--st-*`.
- Steps run single-pass rather than red-green-verify. Most of this library is presentational markup where a failing test would assert the JSX rather than any behaviour; the three pieces that carry real logic get focused tests in step 14 instead.
- Stories are colocated with their component as `<Component>.stories.tsx`, matching the four stories already in `src/components/react/`.
- Story artwork reuses the photographs already imported at `src/assets/salt/images/`, rather than extracting new base64 images from the design bundle.
- The token layer deviates from the design file in exactly two places: body copy moves from 12.5px to 14px and the smallest size from 10.5px to 12px. Every other token is transcribed verbatim. The design's proportions survive the change; its smallest text was tight enough to hurt readability, and a design system that ships a legibility floor makes it permanent on every page built on it.
- MEASURED (step 2): the `a[href]` specificity trap reproduces in Storybook and claims five properties, not the four predicted. `@fpkit/acss` declares `a[href] { color: var(--link-color); font-size: var(--link-fs); font-weight: var(--link-fw); background-color: var(--link-bg); border-radius: var(--link-radius) }` at (0,1,1). A single `.salt-action` class at (0,1,0) lost all five: the probe measured `background-color: rgba(0, 0, 0, 0)` against a declared `#d97347`, `font-size: 16px` against `13px`, `font-weight: 400` against `500`, `color: rgb(0, 0, 0)` against `#ffffff`, and `border-radius: 4px` against `6px`. Every `.salt-*` class that can land on an `<a href>` is therefore written as a doubled selector to reach (0,2,0).
- MEASURED (step 15): no React component using a hook could be tested in this repo at all, and this plan's tests were the first to try. Astro's `getViteConfig` hands Vitest a Vite server whose dependency optimizer pre-bundles `react` into `node_modules/.vite/vitest/<hash>/deps/react.js`, while `react-dom` reaches the runner through Node and requires the real `node_modules/react`. Two React module records result: react-dom sets the hook dispatcher on one, the component under test reads it from the other, and every `useState` throws `Cannot read properties of null`. A bare two-line `useState` component reproduced it, so it is not a defect in this library. `vitest.config.ts` now carries a small `salt:single-react` plugin that resolves each React entry point to its absolute file and marks it external, which puts both sides on Node's single module cache. The full suite is unchanged by it: 57 failed / 477 passed before and after, with this plan's 13 tests added on top. The pre-existing `RoleGuard.react.test.tsx` passes because it uses no hooks.
- Both sliders cross-fade between slides rather than swapping instantly, wrapped in a `prefers-reduced-motion: no-preference` media query so the transition disappears for anyone who has asked their system for less motion. The design file specifies no motion at all, so this is an addition — a plain swap reads as a glitch at this size.

## Files

- src/styles/salt/_salt-tokens.css (new) — the `--salt-*` design tokens transcribed from the design file. The canvas declares 41, not the 38 this plan first estimated; all 41 are present, plus 2 documented additions (`--salt-scrim-header`, `--salt-scrim-hero-text`)
- src/styles/salt/_salt-patterns.css (new) — the `.salt-*` classes every component below uses
- src/styles/salt/index.css (modified) — import the two new stylesheets
- src/components/react/salt/Action.tsx (new) — the one action control behind all four button flavours; ships with its story
- src/components/react/salt/Badge.tsx (new) — the "Coming soon" status pill; ships with its story
- src/components/react/salt/IconButton.tsx (new) — the 34px circular previous/next control in three tones; ships with its story
- src/components/react/salt/ImageSlot.tsx (new) — photograph or labelled placeholder; ships with its story
- src/components/react/salt/Wordmark.tsx (new) — the logo at navigation and footer sizes; ships with its story
- src/components/react/salt/SocialLinks.tsx (new) — the Facebook and LinkedIn icon pair; ships with its story
- src/components/react/salt/SectionIntro.tsx (new) — centred heading, lead paragraph and action pair; ships with its story
- src/components/react/salt/ServiceCard.tsx (new) — photograph, title, optional badge, body; ships with its story
- src/components/react/salt/MissionPanel.tsx (new) — heading and paragraph for the orange band; ships with its story
- src/components/react/salt/TeamMemberCard.tsx (new) — portrait with a scrim caption; ships with its story
- src/components/react/salt/TeamMemberBio.tsx (new) — name, role, biography and slider controls; ships with its story
- src/components/react/salt/TeamSlider.tsx (new) — owns the wrap-around member index; ships with its story
- src/components/react/salt/TestimonialPanel.tsx (new) — quote over a photograph with a scrim; ships with its story
- src/components/react/salt/GalleryStrip.tsx (new) — rolling three-up photo strip; ships with its story
- src/components/react/salt/PartnerGrid.tsx (new) — four-up partner logo row; ships with its story
- src/components/react/salt/SiteHeader.tsx (new) — the overlay navigation bar; ships with its story
- src/components/react/salt/Hero.tsx (new) — photograph, scrim and event call-to-action pair; ships with its story
- src/components/react/salt/DonateBand.tsx (new) — the donate section, rebuilt as real text and a real button; ships with its story
- src/components/react/salt/SiteFooter.tsx (new) — brand, navigation, legal row; ships with its story
- src/components/react/salt/Homepage.stories.tsx (new) — the whole page assembled from the components above
- .storybook/SaltPatterns.mdx (new) — token tables and the pattern index
- .storybook/Introduction.mdx (modified) — point readers at the new Salt section
- tests/components/SaltPatterns.react.test.tsx (new) — the three behavioural tests
- vitest.config.ts (modified) — a `salt:single-react` resolver plugin, not foreseen by this plan; see Decisions
- .claude/launch.json (new) — lets the browser tooling start Storybook for verification

## Steps

### Phase: Foundation

1. [x] Create `src/styles/salt/_salt-tokens.css` holding the 38 `--salt-*` tokens exactly as the design file declares them (colours, four radii, the type scale, three scrim gradients, the layout widths and the 40px gutter), raising exactly two of them above the drawn value — `--salt-text-sm` from 12.5px to 14px and `--salt-text-xs` from 10.5px to 12px — with a comment in the file naming both as deliberate deviations, then create an empty `src/styles/salt/_salt-patterns.css` alongside it and add both files to the `@import` list in `src/styles/salt/index.css`. Why: every component below reads these values; the existing `--st-*` set is a different scale that would render the new patterns at the wrong size, and the design's two smallest sizes are tight enough that shipping them would bake a legibility floor into every future page. Verify: run `npm run storybook`, open any existing story, and confirm `getComputedStyle(document.documentElement)` resolves `--salt-orange` to `#d97347` and `--salt-text-xs` to `12px` in the browser console.
2. [x] Measure the `a[href]` specificity trap in Storybook by rendering a throwaway story containing a single `<a class="salt-action" href="#">` with a background colour and font size set from the new stylesheet, then reading its computed `background-color` and `font-size`. Why: the existing Astro components document that a global stylesheet resets every link's background, colour, font size and weight through undefined custom properties, and `.storybook/preview.ts` loads those same stylesheets — if it reproduces here, every interactive pattern needs a doubled class selector, and finding that out after nineteen components are written means nineteen rewrites. Verify: report both measured values; if they do not match what `_salt-patterns.css` declares, record the doubled-selector requirement in the Decisions section before continuing.

### Phase: Primitives

3. [x] Build `Action.tsx` as the single action control covering all four flavours the design uses — `solid` (orange fill), `ghost` (bare label with a trailing arrow), `light` (white fill with a shadow) and `pill` (fully rounded navigation chip) — rendering an `<a>` when `href` is set and the control is enabled, and a `<button>` otherwise, so a disabled control is never a live link. Why: the design draws these as four separately-styled boxes, but they are one control with different fills and radii; one component with a variant prop is what keeps the hover, focus and disabled behaviour consistent across all four. Verify: the story shows all four variants, and switching the `disabled` control to true changes the rendered element from `<a>` to `<button disabled>` in the browser inspector.
4. [x] Build `Badge.tsx` (the uppercase "Coming soon" pill in orange tint) and `IconButton.tsx` (the 34px circular previous/next control in its `orange`, `sage` and `outline` tones), giving `IconButton` a required `label` prop that becomes its `aria-label`. Why: the icon button appears in three places with three different tones and carries only an arrow glyph, so without a required label a screen reader announces nothing but the arrow. Verify: both stories render, and the accessibility panel reports no violations for the `IconButton` story.
5. [x] Build `ImageSlot.tsx` (renders an `<img>` when given a `src`, and a labelled dashed placeholder box otherwise, in `rounded`/`rect` shapes and `cover`/`contain` fits), `Wordmark.tsx` (the logo at its 20px navigation and 18px footer sizes) and `SocialLinks.tsx` (the Facebook and LinkedIn icon pair). Why: the design leaves six images unchosen and marks them with a custom `<image-slot>` element, so the library needs a real component for "picture not chosen yet" rather than a broken image. Verify: the `ImageSlot` story shows both the filled and the empty state, and the empty state renders visible placeholder text rather than an empty box.

### Phase: Patterns

6. [x] Build `SectionIntro.tsx` — centred heading, lead paragraph, and a pair of `Action` components below it. Why: the services section and the team section use this block identically, down to the same two button labels, so it is the clearest reusable pattern on the page. Verify: the story renders with the services copy and the team copy through controls, and the two match the design's centred 1000px-wide layout.
7. [x] Build `ServiceCard.tsx` (a 250px photograph above a title, an optional `Badge`, and body copy) and `MissionPanel.tsx` (a heading and paragraph sized for the orange band). Why: the design shows five service cards including one carrying a "Coming soon" badge and one with an unchosen photograph, and two mission panels, so both need to handle their variations rather than only the happy case. Verify: the `ServiceCard` story renders all three states — photograph, badge, and empty image slot — and the three-up grid reflows to one column below 640px when the viewport is resized.
8. [x] Build `TeamMemberCard.tsx` (a 400px portrait with a gradient scrim caption carrying name, role and `SocialLinks`), `TeamMemberBio.tsx` (name, uppercase orange role, biography and the previous/next controls with a counter) and `TeamSlider.tsx`, which owns the member index and wraps it around at both ends. Why: the design file's slider logic lives in a canvas-only scripting layer that does not survive export, so the wrap-around behaviour has to be rebuilt rather than ported. Verify: in the `TeamSlider` story, pressing previous on the first member shows the last and the counter reads "2 / 2".
9. [x] Build `TestimonialPanel.tsx` (a quote and eyebrow over a scrimmed photograph with previous/next controls), `GalleryStrip.tsx` (three visible tiles from a longer list, advancing one tile at a time and wrapping) and `PartnerGrid.tsx` (a four-up logo row of `ImageSlot`s). Why: these are the last three patterns on the page and each holds or displays a list, so they complete the set the homepage composition in step 12 needs. Verify: in the `GalleryStrip` story, pressing next advances the strip by one photograph rather than three, and pressing it as many times as there are photographs returns to the starting tiles.
10. [x] Add the shared slide transition to `_salt-patterns.css` — a short opacity cross-fade applied to the team portrait, the team biography and the gallery tiles as their content changes — declared inside a `@media (prefers-reduced-motion: no-preference)` block so it is absent by default and present only for people who have not asked their system for reduced motion. Why: the design file specifies no motion, but an instant content swap at this size reads as a glitch rather than a deliberate change; gating it on the media query means the animation is opt-out by the operating system rather than something a person has to endure. Verify: with the browser emulating `prefers-reduced-motion: reduce`, `getComputedStyle` on a slide element reports a `transition-duration` of `0s`; with it set to `no-preference`, the same read reports a non-zero duration.

### Phase: Page sections

11. [x] Build `SiteHeader.tsx` (the transparent navigation bar overlaying the hero, with `Wordmark`, four links and a `pill` donate `Action`) and `Hero.tsx` (a photograph, a gradient scrim, and the event eyebrow, headline and two calls to action), replacing the design's container-query `cqw` type sizes with fixed sizes that hold at small viewports. Why: the design sizes the hero's type as a percentage of the container width, which renders the eyebrow at roughly five pixels on a 320px phone — faithful to the drawing, unreadable in practice. Verify: at a 320px viewport in the `Hero` story, every text element measures at least 12px via `getComputedStyle`, and the two calls to action stack rather than overflow.
12. [x] Build `DonateBand.tsx` — the donate section rebuilt as a real heading, real body copy and a real `Action` over a background photograph — and `SiteFooter.tsx` (brand, four-link navigation, a legal row and the copyright line). Why: the design draws the donate section as a flat photograph with its message baked into the pixels and an invisible link positioned over it, which no screen reader can read, no search engine can index, and no translator can translate. Verify: the `DonateBand` story's heading and button text appear in the accessibility tree via `mcp__Claude_Browser__read_page`, not only in the image.

### Phase: Verify

13. [x] Write `Homepage.stories.tsx`, assembling every component above into the full page in the design's order — header, hero, services, mission, team, partners, donate, gallery, testimonials, footer. Why: a component library is only complete if the page it came from can be rebuilt out of it, and anything the page still needs that the library does not provide shows up here and nowhere else. Verify: the story renders the whole page with no raw markup outside the Salt components, and side-by-side with the design file's own layout the section order and proportions match.
14. [x] Write `.storybook/SaltPatterns.mdx` documenting the `--salt-*` token tables (colour swatches, the type scale, radii and spacing) and indexing the nineteen patterns, and add a line to `.storybook/Introduction.mdx` pointing readers at the new Salt section. Why: `Introduction.mdx` currently tells readers that Astro components are not in Storybook and to read the Starlight guide instead, which is now only half true and would send people to the wrong place. Verify: both pages render in Storybook's sidebar and every token table row shows a live swatch rather than a bare hex string.
15. [x] Write `tests/components/SaltPatterns.react.test.tsx` covering the three pieces of real logic — that `Action` renders an `<a>` with an `href` but a `<button disabled>` when disabled even with an `href` present, that `TeamSlider` wraps from the first member to the last, and that `GalleryStrip` advances its window by one and wraps at the end. Why: these three carry branches and modular arithmetic that can silently break; the rest of the library is markup, where a test would assert the JSX rather than any behaviour. Verify: `npx vitest run tests/components/SaltPatterns.react.test.tsx` exits 0 with three passing tests.
16. [x] Run the full gate — `npm run type-check`, `npx prettier --write` over only the files this plan created, `npm run lint:styles` for the two new stylesheets, `npx vitest run tests/components/SaltPatterns.react.test.tsx`, and `npm run build-storybook` — then walk every story with Storybook's accessibility panel open and fix each reported violation. Why: the accessibility panel is set to `'todo'` in `preview.ts`, meaning violations are reported but never fail a story, so nothing catches them unless someone looks. Verify: every command exits 0, and the accessibility panel reports zero violations on all nineteen pattern stories plus the homepage composition.
17. [x] Measure and fix the two accessibility risks the design carries — the 34px previous/next controls, which are below the 44×44px target size WCAG 2.5.8 asks for, and the body text colour `#71717a` on white at 12.5px — by measuring the real contrast ratio and the real hit-box in the browser and correcting whichever fails. Why: the design draws both at values that look close to the line, and a design system that ships the failure makes it permanent across every page built on it. Verify: report the measured contrast ratio and the measured hit-box dimensions from the browser, and confirm each meets its threshold after the fix.

## Tests

Tier 1 — This plan changes application code
- Objective: the Salt homepage can be rebuilt entirely from the library. File: tests/components/SaltPatterns.react.test.tsx; Type: smoke; Asserts: rendering the composed homepage mounts the header, hero, services, mission, team, partners, donate, gallery, testimonials and footer regions without error; Run: npx vitest run tests/components/SaltPatterns.react.test.tsx
- Unit: the link-versus-button rule in Action. File: tests/components/SaltPatterns.react.test.tsx; Targets: Action; Key cases: href renders an anchor, no href renders a button, href plus disabled renders a disabled button and not a live link
- Unit: TeamSlider index wrap-around. File: tests/components/SaltPatterns.react.test.tsx; Targets: TeamSlider; Key cases: next from the last member returns to the first, previous from the first returns to the last, the counter text tracks the index
- Unit: GalleryStrip rolling window. File: tests/components/SaltPatterns.react.test.tsx; Targets: GalleryStrip; Key cases: next advances by one photograph not three, the window wraps at the end of the list, a list shorter than three does not repeat a tile out of order

## Acceptance Criteria

- [ ] NOT MET, deliberately. The design canvas declares **41** `--salt-*` tokens, not 38, and all 41 are transcribed. `--salt-orange` does NOT resolve to `#d97347`: step 17 measured white text on it at 3.23:1 against the 4.5:1 WCAG 1.4.3 threshold, so it resolves to `#b25e3a` (measured 4.61:1) — the lightest value on the same hue that clears the bar. Four sibling colours and one scrim moved for the same measured reason, and two scrims were added; every one is annotated in the token file with its drawn value and its measured ratio.
- [x] The two deliberate type deviations resolve as planned: `--salt-text-sm` to `14px` and `--salt-text-xs` to `12px`, each carrying a comment in the token file saying why it differs from the design
- [x] Nineteen components exist under `src/components/react/salt/`, each with a colocated `.stories.tsx` that appears in the Storybook sidebar — 59 stories in total, all present in `/index.json`
- [x] `Homepage.stories.tsx` renders the complete homepage using only Salt components. The only non-component markup is the `<section>` and `<div>` wrappers that carry the layout classes `.salt-section`, `.salt-card-grid` and `.salt-mission-band` from `_salt-patterns.css`; no element in the composition carries a style of its own.
- [ ] NOT MET, and not caused by this plan. `npm run type-check` reports **126 errors, 0 of them in any file this plan created or modified** — they sit in Supabase, Clerk and API code (`src/libs/database.ts`, `src/utils/user-sync.ts`, `src/pages/api/**`) and are present on an untouched checkout. The Salt library itself type-checks clean.
- [x] `npx vitest run tests/components/SaltPatterns.react.test.tsx` exits 0 — 13 passing: the objective smoke test plus the Action, TeamSlider and GalleryStrip groups. Each of the three logic groups was mutation-checked: breaking the disabled-link branch, the slider wrap and the gallery step turned 6 tests red.
- [x] `npm run build-storybook` exits 0 and produces `storybook-static/`
- [x] axe-core (the engine behind the accessibility panel) reports **zero violations across all 59 stories**, run against each story's own top-level page rather than a nested iframe, at WCAG 2.0/2.1/2.2 A and AA.
- [x] All six previous/next controls measure **34×34px visually and 44×44px as a pointer target** (one reads 44×45 from pixel rounding), measured by hit-testing outward from each centre with `elementFromPoint`.
- [x] Body text `--salt-body` `#71717a` on white measures **4.83:1**, above the 4.5:1 threshold, so it is transcribed verbatim. Text sitting over photographs was measured separately against the lightest pixel beneath it: hero eyebrow **8.31:1**, hero headline **8.94:1**, header links **8.56:1**, donate heading **5.91:1**, donate body **5.48:1** — all after the two scrims added in step 17, which replaced measured readings of 1.39:1, 1.09:1 and 3.46:1.
- [x] At a 316px viewport the hero's smallest text measures **13px** and its two calls to action stack (tops 332px and 378px) with `scrollWidth` equal to the viewport — no horizontal overflow.
- [ ] PARTIALLY MET. Under `no-preference` every slide element reports `transition-duration: 0.24s` on `transition-property: opacity`, as designed. Under `reduce` this plan's CSS contributes nothing — the whole rule lives inside the `no-preference` query — but the measured value is `1e-05s`, not `0s`, because a pre-existing repo-wide rule `*, ::before, ::after { transition: … 0.01ms }` inside `@media (prefers-reduced-motion: reduce)` pins every element on the page. Effectively instant; not literally `0s`.
- [x] The existing 27 `.astro` components under `src/components/astro/salt/` and the `--st-*` tokens are unchanged — `git diff --stat` over both prints nothing.

## Verification

Run `npm run storybook` and open `http://localhost:6006`. The sidebar carries a Salt section with nineteen pattern entries plus the Homepage composition and the SaltPatterns documentation page. Open the Homepage story: the page renders top to bottom — overlay navigation, hero with its event call-to-action pair, five service cards including the badged one, the orange mission and vision band, the team slider, the partner row, the donate band, the rolling gallery, the testimonial panel, and the footer with its legal row. Click through the team slider and the gallery: both wrap at their ends without a blank frame, and each slide cross-fades rather than snapping. Then set the browser to emulate `prefers-reduced-motion: reduce`, reload, and click through both again: the content changes instantly, with no fade.

Open each pattern story and confirm the Controls panel lists its props with types (generated by `react-docgen-typescript`) and the Accessibility panel reports zero violations. Resize to 320px on the Hero and Services stories and confirm nothing overflows horizontally.

Then run, in order: `npm run type-check`, `npx vitest run tests/components/SaltPatterns.react.test.tsx`, and `npm run build-storybook`. All three exit 0. Finally, `git diff --stat src/components/astro/salt/ src/styles/salt/_colors.css src/styles/salt/_typography.css src/styles/salt/_spacing.css src/styles/salt/_effects.css src/styles/salt/_base.css` prints nothing, confirming the existing design system was left alone.

## Next Steps

- Retire the duplication between the React and Astro Salt sets
  The repo will hold two Salt component sets built from two versions of the design. Decide which is canonical before both drift.
  ```text
  In the salt-tampa repo, the React Salt library at src/components/react/salt/ (built from the
  current design, on --salt-* tokens) and the older Astro set at src/components/astro/salt/
  (built from an earlier design, on --st-* tokens) now overlap. Audit both against
  src/pages/index.astro and src/pages/salt-kit.astro, then propose one of: migrate the home page
  onto the React set and delete the Astro set; keep the Astro set for the site and treat the React
  set as documentation only; or generate one from the other. Write the recommendation as a plan
  document under docs/plans/ following ~/.claude/rules/plan-authoring.md. Verify by confirming the
  plan names every file that would be deleted or changed and that the home page still builds with
  `npm run build`.
  ```
- Use the React Salt components on a real page
  A library nobody imports is documentation. Astro can render React components with a client directive.
  ```text
  In the salt-tampa repo, build a page at src/pages/salt-v2.astro that renders the React Salt
  components from src/components/react/salt/ through Astro's React integration, matching the layout
  in Homepage.stories.tsx. Use client:load only on the two interactive components (TeamSlider and
  GalleryStrip) and render the rest as static server-side HTML with no client directive. Verify
  with `npm run build` exiting 0 and by loading the page in the browser preview, confirming zero
  hydration warnings in the console and that both sliders respond to clicks.
  ```
- Wish list: generate the Astro components from the React ones
  Speculative. Would remove the drift risk entirely but needs a build step nothing here has today.

## Unresolved Questions

- Six images in the design are still placeholders: the four partner logos, the "Meals & Essentials" service photo, the "Health screening" (coming soon) service photo, and the testimonial background. Stories will use `ImageSlot`'s empty state for these. Who is choosing the artwork, and by when?
- Both testimonial quotes in the design read "Testimonial coming soon." Is there real copy, or should `TestimonialPanel`'s story ship with that placeholder text?
- The design's donate section is a photograph with its message baked into the pixels. Step 12 rebuilds it as real text over a background image, which means someone has to write that heading and body copy. What should it say?
- The design's team section names two people, Nehiel and Andrea, but the repo's `src/assets/salt/images/` also holds `team-holly.jpg` from the earlier import. Is Holly still on the team?
- The design file's token stylesheet is headed "Serve513 — Color Tokens" and declares a full sky-blue and navy palette that the Salt page never uses. Is that a leftover from another project, or is a second brand expected here?

## Resources

- `/Users/shawnsandy/design-box/slat-tampa-designs/Salt Tampa Homepage.html` — the design canvas this plan is built from. The readable source is the JSON inside its `<script type="__bundler/template">` tag, roughly 50 KB, not the 9 MB file itself.
- `.storybook/main.ts` — its header comment states the Astro-in-Storybook limitation that decided the React approach.
- `src/components/astro/salt/Button.astro` — its comments document the `a[href]` specificity trap that step 2 measures.
- `src/pages/salt-kit.astro` — the existing specimen page for the older `--st-*` component set; useful for comparing the two design generations side by side.
- npm registry entry for `storybook-astro@0.2.1` — peer range `astro: ^4.0.0 || ^5.0.0 || ^6.0.0`, which is what rules it out against this repo's Astro 7.1.6.
