import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import CoverLetter from './coverLetter.vue'

const vuetify = createVuetify({
  components,
  directives
})

describe('The coverletter component should render the props correctly', () => {
  // mock useFormattedDate composable
  const useFormattedDateMock = vi.fn(() => '2023-12-07 20:00:43')
  vi.stubGlobal('useFormattedDate', useFormattedDateMock)

  it('should render the content correctly', () => {
    const instance = mount(CoverLetter, {
      props: {
        content: 'example text',
        index: 2,
        date: '2023-12-07T23:00:43.795Z'
      },

      global: {
        components: {
          CoverLetter
        },
        plugins: [vuetify]
      }
    })

    expect(instance.find('.v-card-text').text()).toBe('example text')
  })
  it('should render the index correctly', () => {
    const instance = mount(CoverLetter, {
      props: {
        content: 'example text',
        index: 2,
        date: '2023-12-07T23:00:43.795Z'
      },

      global: {
        components: {
          CoverLetter
        },
        plugins: [vuetify]
      }
    })

    expect(instance.find('.v-card-title').text()).toBe('Letter: 2')
  })
  it('should render the date correctly', () => {
    const instance = mount(CoverLetter, {
      props: {
        content: 'example text',
        index: 2,
        date: '2023-12-07T23:00:43.795Z'
      },

      global: {
        components: {
          CoverLetter
        },
        plugins: [vuetify]
      }
    })

    expect(instance.find('.v-card-subtitle').text()).toBe('Date: 2023-12-07 20:00:43')
  })
})
