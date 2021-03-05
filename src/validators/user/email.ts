import validator from 'validator'

export const emailValidationSchema = {
  validEmail: function (v: string) {
    if (validator.isEmail(v)) {
      return true
    }
    return 'Please provide a valid email'
  },
}
