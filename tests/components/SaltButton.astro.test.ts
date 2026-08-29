// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import Button from '#components/astro/salt/Button.astro'

/**
 * `Button` renders no framework components -- `Icon` is a plain `.astro` file --
 * so the bare container is enough and no renderers need loading.
 */
const render = async (props?: Record<string, unknown>): Promise<string> => {
  const container = await AstroContainer.create()
  return container.renderToString(Button, props ? { props } : {})
}

/** The tag name of the rendered root element. */
function rootTag(html: string): string {
  return (
    html
      .trim()
      .match(/^<([a-z0-9]+)/i)?.[1]
      ?.toLowerCase() ?? ''
  )
}

describe('Salt Button', () => {
  it('renders an anchor carrying the href when enabled', async () => {
    const html = await render({ href: '/donate' })

    expect(rootTag(html)).toBe('a')
    expect(html).toContain('href="/donate"')
  })

  it('renders a button when no href is supplied', async () => {
    const html = await render({})

    expect(rootTag(html)).toBe('button')
    expect(html).not.toContain('href=')
  })

  /**
   * Regression: a `disabled` control that also carried an `href` used to render
   * a live `<a href>` marked only with `aria-disabled`, which browsers happily
   * follow by click or by Enter. The disabled state has to be carried by an
   * element the browser actually refuses to activate.
   */
  it('does not render a followable link when disabled', async () => {
    const html = await render({ href: '/donate', disabled: true })

    expect(rootTag(html)).toBe('button')
    expect(html).toContain('disabled')
    // The destination must not survive anywhere in the markup.
    expect(html).not.toContain('/donate')
    expect(html).not.toContain('href=')
  })

  it('keeps the disabled attribute on a plain disabled button', async () => {
    const html = await render({ disabled: true })

    expect(rootTag(html)).toBe('button')
    expect(html).toContain('disabled')
  })
})
