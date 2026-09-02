/**
 * Storybook configuration for astro-basics.
 *
 * Storybook renders the project's React components (`src/components/react`,
 * `src/components/dashboard`) through the Vite builder. Astro (`.astro`)
 * components are server-rendered and are not supported by Storybook — document
 * those in the Starlight guide instead.
 *
 * @module .storybook/main
 */

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  // Story globs are scoped to `src/components` so the Starlight content
  // collection in `src/content` is not picked up as Storybook docs pages.
  // Free-standing MDX docs pages live alongside this config in `.storybook`.
  stories: ['../.storybook/**/*.mdx', '../src/components/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-links'],

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        // Use the standalone Storybook Vite config rather than the root
        // `vite.config.ts`, which boots the full Astro pipeline.
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },

  // Serve `public/` so stories can reference the same assets the site uses.
  staticDirs: ['../public'],

  typescript: {
    // Generate prop tables from the exported `Props` types.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}

export default config
