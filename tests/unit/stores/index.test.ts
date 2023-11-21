import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/stores/index'

describe('initial state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('keeps track of user authentication status', () => {
    const store = useUserStore()
    expect(store.isUserSignedIn).toBe(false)
    expect(store.loading).toBe(false)
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('loginUser', () => {
    it('logs the user in', () => {
      const store = useUserStore()
    })
  })
})
