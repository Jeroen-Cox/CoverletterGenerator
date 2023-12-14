import { describe, it, expect } from 'vitest'
import { required, isEmail } from '@/composables/useValidation'

describe('Form validation methods', () => {
  describe('Required field validation', () => {
    it('Indicates the field was filled in', () => {
      expect(required('example string')).toBe(true)
    }),
      it('Indicates the required field was empty', () => {
        expect(required('')).toBe('Field is required')
      })
  })
  describe('Email field validation', () => {
    it('Indicates the field value was indeed an email address', () => {
      expect(isEmail('jeroencox@email.com')).toBe(true)
    }),
      it('Indicates the field value was not an email address', () => {
        expect(isEmail('jeroeniscool')).toBe('Invalid e-mail')
      })
  })
})
