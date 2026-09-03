# Storybook Integration

Storybook renders the project's React components in isolation with live controls,
generated prop tables, and an automated accessibility audit.

- **Version**: Storybook 10.6 with the `@storybook/react-vite` framework
- **Config**: `.storybook/`
- **Stories**: co-located as `src/components/**/*.stories.tsx`
- **Dev server**: <http://localhost:6006>

## Commands

```bash
npm run storybook        # Start the dev server on port 6006
npm run build-storybook  # Produce a static build in storybook-static/
```

`storybook-static/` is git-ignored and excluded from ESLint and Prettier.

## What is covered

| Component type          | Location                   | In Storybook            |
| ----------------------- | -------------------------- | ----------------------- |
| React (client)          | `src/components/react`     | Yes                     |
| Astro (server-rendered) | `src/components/astro`     | No — see the note below |
| Dashboard (protected)   | `src/components/dashboard` | No — all `.astro` today |

Storybook has no framework for Astro components. `.astro` files are
server-rendered and often depend on `Astro.locals`, so they are documented in
the Starlight guide under `/guide/components` instead. Where an Astro component
wraps a React island, story the island.

## Configuration files

### `.storybook/main.ts`

Declares the story globs, the addons, and the Vite builder.

Two settings are load-bearing:

- **Story globs are scoped to `src/components`.** A broader `src/**/*.mdx` glob
  sweeps in the Starlight content collection under `src/content`, and Storybook
  fails to index it (`Error: Unable to index ./src/content/docs/guide.mdx`).
- **`builder.viteConfigPath` points at `.storybook/vite.config.ts`.** See below.

### `.storybook/vite.config.ts`

A standalone Vite config used only by Storybook.

The root `vite.config.ts` wraps `getViteConfig()` from `astro/config`, which
boots the entire Astro pipeline — adapter, Starlight, MDX content collections.
If Storybook picks that config up, the Astro build takes over and Storybook
emits an empty bundle while still reporting success. Pointing Storybook at its
own config avoids this.

This config also restates the project's mandatory `#*` path aliases (see
[CLAUDE.md](../../../CLAUDE.md) > Import Rules), which Storybook cannot read from
`astro.config.mjs`. Each top-level `src/` directory is aliased individually
rather than with a catch-all `#*` pattern, so that `#`-prefixed subpath imports
inside `node_modules` packages keep resolving against their own `package.json`.

> **Adding a new top-level directory under `src/`?** Add it to the `SRC_ALIASES`
> array in `.storybook/vite.config.ts`, or imports from it will fail to resolve
> in Storybook only.

### `.storybook/preview.ts`

Loads the same three stylesheets as `src/layouts/Base.astro`, so components look
in Storybook exactly as they do on the site:

```ts
import '@fpkit/acss/styles'
import '../src/styles/index.scss'
import '../src/styles/salt/index.css'
```

The SCSS **source** is imported rather than the compiled `src/styles/index.css`,
so Storybook does not depend on `npm run sass:build` having been run first.

## Writing a story

Stories sit next to their component and follow the project's normal rules.

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import RoleBadge from '#components/react/RoleBadge'

const meta = {
  title: 'React/RoleBadge',
  component: RoleBadge,
  args: { role: 'member' },
} satisfies Meta<typeof RoleBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Admin: Story = { args: { role: 'admin' } }
```

Requirements:

- Import the component through its `#` path alias, never a relative path.
- Type the default export with `satisfies Meta<typeof Component>` and each story
  with `StoryObj<typeof meta>`. Because stories live under `src/`, they are
  covered by `npm run type-check`, which catches args that do not match the
  component's props.
- Prefer components that take plain props. Anything reading Clerk session state
  or the database should receive that data as props, or have a presentational
  sibling to story instead (see `ContactForm` and `view/ContactFormView`).

### Components that submit forms

`ContactForm.stories.tsx` uses a `preventNativeSubmit` decorator that replaces
`HTMLFormElement.prototype.submit` with a no-op while a story is mounted.
`ContactForm` calls `form.submit()` directly, which is a native DOM call that
`preventDefault()` cannot stop.

That stops the POST only. On valid input the component then assigns
`window.location.href = '/success'`, which still navigates the preview iframe —
page code cannot intercept that assignment. The `ValidationErrors` and
`InvalidEmail` stories drive the form through `play` functions and never reach
that branch, so they exercise the validation summary in place.

### Components that read the URL

`@fpkit/react`'s `Breadcrumb` builds its trail from `window.location.pathname`
and uses its `routes` prop only as a lookup table for segment names. Inside
Storybook the pathname is always `/iframe.html`, so
`astro-breadcrumb.stories.tsx` uses an `atPath()` decorator that patches the URL
during the first render and restores it on unmount. Reuse that pattern for any
component that reads location.

## Documenting Storybook in the Starlight guide

`src/content/docs/guide/components/storybook.mdx` uses Starlight's `<Code>`
component for the commands inside `<Tabs>`, not Markdown fences. Prettier
collapses a fenced block that is indented inside JSX onto a single line
(` ```bash npm run storybook ``` `), which stops it rendering as a code block.
For the same reason, avoid `{/* ... */}` MDX comments in that file — Prettier
rewrites the asterisks as Markdown emphasis and produces invalid MDX.

## Accessibility

`@storybook/addon-a11y` runs axe against every story and reports results in the
**Accessibility** panel. It is configured with `a11y: { test: 'todo' }`, so
violations are surfaced but do not fail a story. Treat them as review items
alongside the `wcag-compliance-reviewer` skill.

## Known warnings

- `@fpkit/react`'s `Breadcrumb` logs a React "unique key prop" warning from
  inside the library. It is pre-existing and unrelated to the Storybook setup.
