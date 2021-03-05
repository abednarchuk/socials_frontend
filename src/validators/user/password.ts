export const passwordValidationSchema = {
  containsOneNumber: function (v: string) {
    if (/^(?=.*[0-9])/.test(v)) {
      return true
    }
    return 'Password must contain at least 1 number'
  },
  containsOneLowercaseLetter: function (v: string) {
    if (/^(?=.*[a-z])/.test(v)) {
      return true
    }
    return 'Password must contain at least 1 lowercase letter'
  },
  containsOneUppercaseLetter: function (v: string) {
    if (/^(?=.*[A-Z])/.test(v)) {
      return true
    }
    return 'Password must contain at least 1 uppercase letter'
  },
  containsOneSpecialCharacter: function (v: string) {
    if (/(?=.*[.,!@#$%^&+=*()\[\]{}<;~"':>_-])/.test(v)) {
      return true
    }
    return 'Password must contain at least 1 special character: .,!@#$%^&+=*()[]{}<;~"\':>_-'
  },
}
