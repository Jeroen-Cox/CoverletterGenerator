import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useUserStore } from '@/stores/index'
import { createTestingPinia } from '@pinia/testing'
import Login from '@/pages/login/index.vue'

describe('Login', () => {
  const vuetify = createVuetify({ components, directives })

  const renderWrapper = () => {
    const pinia = createTestingPinia({
      initialState: { user: { loading: false } }
    })
    setActivePinia(pinia)
    return render(Login, {
      global: {
        plugins: [vuetify, pinia],
        stubs: {
          SystemVersions: true
        },

        mocks: {
          $t: (msg: string) => msg,
          required: () => true,
          isEmail: () => true,
          login: () => 200
        }
      }
    })
  }

  it('page mounts properly', async () => {
    const wrapper = renderWrapper()
    expect(wrapper).toBeTruthy()
    const emailField = screen.getByRole('textbox', { name: /e\-mail/i })
    expect(emailField).toBeTruthy()
    const passwordField = screen.getByLabelText(/password password/i)
    expect(passwordField).toBeTruthy()
    const submitButton = screen.getByTestId('loginBtn')
    expect(submitButton).toBeTruthy()
  })

  it('navigates user to 2fa setup page if login correct and 2fa not setup', async () => {
    const wrapper = renderWrapper()
    expect(wrapper).toBeTruthy()
    const emailField = screen.getByRole('textbox', { name: /e\-mail/i })
    await userEvent.type(emailField, 'jeroen@thecloseapp.com')
    expect(emailField).toHaveValue('jeroen@thecloseapp.com')
    const passwordField = screen.getByLabelText(/password password/i)
    await userEvent.type(passwordField, 'password')
    expect(passwordField).toHaveValue('password')
    const submitButton = screen.getByTestId('loginBtn')
    screen.debug()
    await userEvent.click(submitButton)
    screen.debug()
  })
})
