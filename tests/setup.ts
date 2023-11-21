import { cleanup } from '@testing-library/vue'
import matchers from '@testing-library/jest-dom/matchers'

import { expect, afterEach, afterAll, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import allHandlers from '@/tests/mocks/handlers/index'

// Extend vitest matchers with jest-dom matchers, more options.
expect.extend(matchers)
vi.mock('#imports', () => ({
  definePageMeta: (meta: any) => {}
}))
//  Setup mocking server
const server = setupServer(...allHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => {
  // After each test, cleanup the DOM.
  cleanup()
  //  Reset mocking server
  server.resetHandlers()
})
