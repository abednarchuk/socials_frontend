export const nameValidationSchema = {
  maxLength: function (v: string) {
    if (v.length < 50) {
      return true
    }
    return 'Name must be shorter than 50 characters'
  },
  notEmpty: function (v: string) {
    if (v.length > 0) {
      return true
    }
    return 'Please enter full name'
  },
}
