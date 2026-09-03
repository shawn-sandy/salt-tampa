/**
 * Global Storybook preview configuration.
 *
 * Loads the same stylesheets `src/layouts/Base.astro` loads so that components
 * render in Storybook exactly as they do on the site. The SCSS entry point is
 * imported directly (rather than the compiled `index.css`) so Storybook never
 * depends on `npm run sass:build` having been run first.
 *
 * @module .storybook/preview
 */

import type { Preview } from '@storybook/react-vite'

import '@fpkit/acss/styles'
import '../src/styles/index.scss'
import '../src/styles/salt/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Accessibility checks run on every story; see the "Accessibility" panel.
    // 'todo' surfaces violations without failing the story.
    a11y: { test: 'todo' },

    docs: {
      toc: true,
    },
  },

  tags: ['autodocs'],
}

export default preview
