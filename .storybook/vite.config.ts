/**
 * Vite configuration used exclusively by Storybook.
 *
 * The project's root `vite.config.ts` wraps `getViteConfig()` from
 * `astro/config`, which boots the full Astro pipeline (adapter, Starlight, MDX
 * content collections). That pipeline takes over the build and leaves Storybook
 * with an empty bundle, so Storybook is pointed at this standalone config
 * instead via `framework.options.builder.viteConfigPath`.
 *
 * @module .storybook/vite.config
 */

import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'

/** Top-level directories under `src/` reachable through the `#*` path alias. */
const SRC_ALIASES = [
  'assets',
  'components',
  'constants',
  'content',
  'data',
  'hooks',
  'img',
  'layouts',
  'libs',
  'scripts',
  'styles',
  'types',
  'utils',
  'views',
] as const

export default defineConfig({
  /**
   * Restate the project's mandatory `#*` path aliases (see CLAUDE.md > Import
   * Rules) for the Storybook builder.
   *
   * Each directory is aliased individually rather than with a catch-all `#*`
   * pattern so that `#`-prefixed subpath imports inside `node_modules` packages
   * keep resolving against their own `package.json`.
   */
  resolve: {
    alias: SRC_ALIASES.map(dir => ({
      find: `#${dir}`,
      replacement: fileURLToPath(new URL(`../src/${dir}`, import.meta.url)),
    })),
  },
})
