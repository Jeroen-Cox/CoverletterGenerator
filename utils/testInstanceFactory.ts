import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

const testInstanceFactory = (component: any) =>
  shallowMount(component, {
    global: {
      plugins: [createTestingPinia()]
    }
  })

export default testInstanceFactory
