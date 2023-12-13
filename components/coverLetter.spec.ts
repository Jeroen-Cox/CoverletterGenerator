import { it } from 'vitest'
import { mount } from '@vue/test-utils'
import CoverLetter from './coverLetter.vue'

it('should render the index property', () => {
  const instance = mount(CoverLetter, {
    props: {
      content: 'example text'
    }
  })
  console.log(instance.html())
})
