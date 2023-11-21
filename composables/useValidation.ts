// Add field validation rules here
export const required = (value: string) => {
  return !!value || 'Field is required'
}

export const isEmail = (value: string) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(value) || 'Invalid e-mail'
}

export const maxLength = (value: string) => {
  return value.length <= 250 || 'Field is required'
}
