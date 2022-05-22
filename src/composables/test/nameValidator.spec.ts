import { useNameValidator } from '../nameValidator'

describe('useNameValidator', () => {
  it('returns true when the name is valid', () => {
    const validator = useNameValidator('abc123')
    expect(validator.value).toBe(true)
  })

  it('returns true when the name contains at least one character', () => {
    const validator = useNameValidator('p')
    expect(validator.value).toBe(true)
  })

  it('returns true when the name contains whitespaces', () => {
    const validator = useNameValidator('abc 123')
    expect(validator.value).toBe(true)
  })

  it('returns true when the name contains öäü', () => {
    const validator = useNameValidator('öäüß 123')
    expect(validator.value).toBe(true)
  })

  it('returns true when the name contains a minus', () => {
    const validator = useNameValidator('some-name')
    expect(validator.value).toBe(true)
  })

  it('returns true when the name contains an underscore', () => {
    const validator = useNameValidator('some_name')
    expect(validator.value).toBe(true)
  })

  it('returns true when the name contains a dot', () => {
    const validator = useNameValidator('some.name')
    expect(validator.value).toBe(true)
  })

  it('returns false when the name contains multiple invalid chars', () => {
    const validator = useNameValidator('abc 123 !@#$')
    expect(validator.value).toBe(false)
  })

  it('returns false when the name contains just spaces', () => {
    const validator = useNameValidator('   ')
    expect(validator.value).toBe(false)
  })

  it('returns false when the name is too long', () => {
    const validator = useNameValidator('This is a very long name')
    expect(validator.value).toBe(false)
  })
})
