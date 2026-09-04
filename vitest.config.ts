import { createRequire } from 'node:module'

import { getViteConfig } from 'astro/config'

const require = createRequire(import.meta.url)

/**
 * React must resolve to ONE module instance across the whole test run.
 *
 * Astro's `getViteConfig` pipeline hands Vitest a Vite server whose dependency
 * optimizer pre-bundles `react` into `node_modules/.vite/vitest/<hash>/deps/`,
 * while `react-dom` reaches the runner through Node and requires the real
 * `node_modules/react`. That leaves two React module records: react-dom sets
 * the hook dispatcher on its copy, the component under test reads it from the
 * other, and every `useState` throws "Cannot read properties of null (reading
 * 'useState')" — which is why no hook-using React component could be tested
 * here before.
 *
 * Resolving each React entry point to its absolute file and marking it
 * external takes it out of Vite's graph entirely, so both sides share Node's
 * single module cache.
 */
const REACT_ENTRIES = new Map(
  [
    'react',
    'react-dom',
    'react-dom/client',
    'react-dom/test-utils',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
  ].map(specifier => [specifier, require.resolve(specifier)])
)

export default getViteConfig({
  plugins: [
    {
      name: 'salt:single-react',
      enforce: 'pre',
      resolveId(source) {
        const resolved = REACT_ENTRIES.get(source)
        return resolved ? { id: resolved, external: true } : null
      },
    },
  ],
  test: {
    // Vitest configuration options
    // exclude e2e test folder
    exclude: ['**/e2e/**', '**/__tests__/**', '**/node_modules/**'],
    // Enable React testing with happy-dom
    environment: 'happy-dom',
    // Setup files for React testing
    setupFiles: ['./tests/setup.ts'],
  },
})
