import { nameValidationSchema } from './user/name'
import { usernameValidationSchema } from './user/username'
import { emailValidationSchema } from './user/email'
import { passwordValidationSchema } from './user/password'

type ValidationSchema =
  | typeof nameValidationSchema
  | typeof usernameValidationSchema
  | typeof emailValidationSchema
  | typeof passwordValidationSchema

const validate = (field: string, schema: ValidationSchema): string[] | null => {
  const errors: string[] = []
  Object.values(schema).map((valFunc) => {
    let validation = valFunc(field)
    if (validation !== true) errors.push(validation)
  })
  if (errors.length === 0) return null
  return errors
}

export const validateName = (name: string) => validate(name, nameValidationSchema)
export const validateUsername = (username: string) => validate(username, usernameValidationSchema)
export const validateEmail = (email: string) => validate(email, emailValidationSchema)
export const validatePassword = (password: string) => validate(password, passwordValidationSchema)
