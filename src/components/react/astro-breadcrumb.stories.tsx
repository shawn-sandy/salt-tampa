/**
 * Storybook stories for the AstroBreadcrumb component.
 *
 * The underlying `@fpkit/react` breadcrumb builds its trail from
 * `window.location.pathname` and uses `routes` only as a lookup table that maps
 * a path segment to a friendly name and URL. Inside Storybook the pathname is
 * always `/iframe.html`, so these stories use a decorator to simulate the page
 * path the component would see on the real site.
 *
 * @module components/react/astro-breadcrumb.stories
 */

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'

import AstroBreadcrumb from '#components/react/astro-breadcrumb'

/**
 * Simulates the browser being on `pathname` while a story is mounted, then
 * restores Storybook's own URL on unmount.
 *
 * The story's `?id=` query string is preserved so Storybook can still resolve
 * the story on reload.
 *
 * @param pathname - Site path the breadcrumb should render a trail for.
 * @returns A Storybook decorator that renders its story at that path.
 */
const atPath = (pathname: string): Decorator =>
  function AtPathDecorator(Story) {
    // Patch the URL during the first render — before the breadcrumb's mount
    // effect reads `window.location.pathname` — and remember the URL to put
    // back when the story unmounts.
    const [originalUrl] = useState(() => {
      const previous = `${window.location.pathname}${window.location.search}`
      window.history.pushState(null, '', `${pathname}${window.location.search}`)
      return previous
    })

    useEffect(
      () => () => {
        window.history.replaceState(null, '', originalUrl)
      },
      [originalUrl]
    )

    return <Story />
  }

const meta = {
  title: 'React/AstroBreadcrumb',
  component: AstroBreadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wraps the `@fpkit/react` breadcrumb and always prefixes the site-wide routes from `#utils/site-config`. The trail itself comes from the current URL; `routes` supplies the display name and link for each known path segment.',
      },
    },
  },
} satisfies Meta<typeof AstroBreadcrumb>

export default meta

type Story = StoryObj<typeof meta>

/**
 * A blog page. `posts` is a site-wide route, so it renders as "Blog" rather
 * than the raw segment.
 */
export const BlogPost: Story = {
  args: {},
  decorators: [atPath('/posts/1')],
}

/** A docs page, also resolved from the site-wide routes. */
export const DocsPage: Story = {
  args: {},
  decorators: [atPath('/docs/1')],
}

/**
 * A page passing its own route in. Custom routes are appended after the
 * site-wide ones, which is how a page names a segment the site config does not
 * know about.
 */
export const WithAdditionalRoute: Story = {
  args: {
    routes: [{ name: 'Getting Started', url: '/guide/getting-started', path: 'getting-started' }],
  },
  decorators: [atPath('/guide/getting-started')],
}

/**
 * An unknown segment falls back to rendering the raw path segment as its label.
 */
export const UnknownSegment: Story = {
  args: {},
  decorators: [atPath('/projects/alpha')],
}
