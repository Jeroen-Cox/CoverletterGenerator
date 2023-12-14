import { mount, shallowMount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import CoverLetterList from './coverLetterList.vue'
import CoverLetter from './coverLetter.vue'

const vuetify = createVuetify({
  components,
  directives
})

describe('The coverletterList component should render correctly', () => {
  it('should render the correct amount of coverletters', async () => {
    const instance = shallowMount(CoverLetterList, {
      props: {
        coverLetters: [
          { content: 'example', creationDate: '2023-12-13T21:04:25.933Z', uid: '"posMUVXS1QGEtHRER6oH"' },
          { content: 'example 2', creationDate: '2023-11-13T21:04:25.933Z', uid: '"sopMUVXS1QGEtHRER6oH"' }
        ]
      },
      global: {
        components: {
          CoverLetter,
          CoverLetterList
        },
        plugins: [vuetify]
      }
    })
    expect(instance.find('h1').text()).toBe('Coverletters: 2')
    const coverletters = instance.findAllComponents(CoverLetter)
    expect(coverletters).toHaveLength(2)
  })
  it('should render 0 coverletters when there are no coverletters', async () => {
    const instance = shallowMount(CoverLetterList, {
      props: {
        coverLetters: []
      },
      global: {
        components: {
          CoverLetter,
          CoverLetterList
        },
        plugins: [vuetify]
      }
    })
    expect(instance.find('h1').text()).toBe('Coverletters: 0')
    const coverletters = instance.findAllComponents(CoverLetter)
    expect(coverletters).toHaveLength(0)
  })
  it('should render an empty string when coverletters is undefined', async () => {
    const instance = shallowMount(CoverLetterList, {
      props: {
        coverLetters: undefined
      },
      global: {
        components: {
          CoverLetter,
          CoverLetterList
        },
        plugins: [vuetify]
      }
    })
    expect(instance.find('h1').text()).toBe('Coverletters:')
    const coverletters = instance.findAllComponents(CoverLetter)
    expect(coverletters).toHaveLength(0)
  })
})
