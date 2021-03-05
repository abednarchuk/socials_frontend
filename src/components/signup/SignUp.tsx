import { FC, useState, useEffect } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useStyles } from './signUp.styles'

import { useSelector, useDispatch } from 'react-redux'
import {
  signUp,
  ISignUp,
  selectAuthError,
  selectUser,
  removeAuthError,
  selectUserLoading,
} from '../../redux/user/user.slice'

import {
  Box,
  FormLabel,
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  Grid,
  Link,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
// Components
import { Loader, Tint } from '../loader/Loader'
// VALIDATORS
import {
  validatePassword,
  validateName,
  validateEmail,
  validateUsername,
} from '../../validators/user.validators'

export const SignUp: FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [nameValidation, setNameValidation] = useState<string[] | null>(null)
  const [usernameValidation, setUsernameValidation] = useState<string[] | null>(null)
  const [emailValidation, setEmailValidation] = useState<string[] | null>(null)
  const [passwordValidation, setPasswordValidation] = useState<string[] | null>(null)
  const [passwordConfirmValidation, setPasswordConfirmValidation] = useState<string[] | null>(null)

  const [userLoading, setUserLoading] = useState(false)

  const isUserLoading = useSelector(selectUserLoading)
  let authGeneralError = useSelector(selectAuthError)
  const user = useSelector(selectUser)

  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    setUserLoading(isUserLoading)
  }, [isUserLoading])

  useEffect(() => {
    if (user) {
      history.push('/')
    }
  }, [user])

  useEffect(() => {
    return () => {
      dispatch(removeAuthError())
    }
  }, [])

  useEffect(() => {
    setNameValidation(null)
  }, [name])
  useEffect(() => {
    setUsernameValidation(null)
  }, [username])
  useEffect(() => {
    setEmailValidation(null)
  }, [email])
  useEffect(() => {
    setPasswordValidation(null)
    setPasswordConfirmValidation(null)
  }, [password])
  useEffect(() => {
    setPasswordValidation(null)
    setPasswordConfirmValidation(null)
  }, [passwordConfirm])

  const signUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // VALIDATION
    setNameValidation(validateName(name))
    setUsernameValidation(validateUsername(username))
    setEmailValidation(validateEmail(email))
    setPasswordValidation(validatePassword(password))
    if (password !== passwordConfirm) {
      setPasswordConfirmValidation(['Passwords do not match'])
    }

    const signUpProps: ISignUp = {
      name,
      username,
      email,
      password,
    }
    authGeneralError = undefined
    if (
      validateName(name) === null &&
      validateUsername(username) === null &&
      validateEmail(email) === null &&
      validatePassword(password) === null &&
      password === passwordConfirm
    ) {
      dispatch(signUp(signUpProps))
    }
  }

  let error = false
  if (authGeneralError) {
    error = true
  }

  return (
    <>
      {userLoading ? (
        <>
          <Loader /> <Tint />
        </>
      ) : null}
      <Container component='main' maxWidth='xs' className={classes.main}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={signUpSubmit}>
            <TextField
              autoComplete='fullname'
              name='fullName'
              margin='normal'
              variant='outlined'
              required
              fullWidth
              id='fullName'
              label='Full Name'
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(nameValidation) ? true : false}
              helperText={
                Boolean(nameValidation) ? nameValidation?.map((err) => `${err}. `) : false
              }
            />
            <TextField
              autoComplete='username'
              margin='normal'
              name='username'
              variant='outlined'
              required
              fullWidth
              id='username'
              label='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(usernameValidation) ? true : false}
              helperText={
                Boolean(usernameValidation) ? usernameValidation?.map((err) => `${err}. `) : false
              }
            />
            <TextField
              variant='outlined'
              required
              margin='normal'
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailValidation) ? true : false}
              helperText={
                Boolean(emailValidation) ? emailValidation?.map((err) => `${err}. `) : false
              }
            />
            <TextField
              variant='outlined'
              required
              fullWidth
              margin='normal'
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(passwordValidation) ? true : false}
              helperText={
                Boolean(passwordValidation) ? passwordValidation?.map((err) => `${err}. `) : false
              }
            />
            <TextField
              variant='outlined'
              required
              margin='normal'
              fullWidth
              name='passwordConfirm'
              label='Confirm Password'
              type='password'
              id='passwordConfirm'
              autoComplete='current-password'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              error={Boolean(passwordValidation) ? true : false}
              helperText={
                Boolean(passwordConfirmValidation)
                  ? passwordConfirmValidation?.map((err) => `${err}. `)
                  : false
              }
            />
            <Box margin='15px 0 15px 0' textAlign='center'>
              {error ? <FormLabel error>* {authGeneralError}</FormLabel> : null}
            </Box>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link component={RouterLink} to='/signin' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
}
