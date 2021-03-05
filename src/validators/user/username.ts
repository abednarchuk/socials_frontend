export const usernameValidationSchema = {
  specialCharactersAtBeginning: function (v: string) {
    if (/^(?![_.])/.test(v)) {
      return true
    }
    return 'No . or _ at the beginning'
  },
  specialCharactersInside: function (v: string) {
    if (/^(?!.*[_.]{2})/.test(v)) {
      return true
    }
    return 'No __ or _. or ._ or .. inside'
  },
  specialCharactersAtEnd: function (v: string) {
    if (/(?<![_.])$/.test(v)) {
      return true
    }
    return 'No . or _ at the end'
  },
  inputText: function (v: string) {
    if (/^[a-zA-Z0-9._]/.test(v)) {
      return true
    }
    return 'Only letters, numbers, . and _ allowed'
  },
  minLength: function (v: string) {
    if (v.length > 5) {
      return true
    }
    return 'Username must be longer than 4 characters'
  },
  maxLength: function (v: string) {
    if (v.length < 30) {
      return true
    }
    return 'Username must be shorter than 30 characters'
  },
}
