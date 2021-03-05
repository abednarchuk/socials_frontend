import React, { FC, useState, useEffect } from 'react'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
  signIn,
  ISignIn,
  selectAuthError,
  selectUser,
  removeAuthError,
  selectUserLoading,
} from '../../redux/user/user.slice'
// Router
import { Link as RouterLink, useHistory } from 'react-router-dom'
// MaterialUI
import { useStyles } from './signIn.styles'
import {
  Button,
  TextField,
  Box,
  FormLabel,
  Typography,
  Container,
  Avatar,
  Grid,
  Link,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
// Components
import { Loader, Tint } from '../loader/Loader'
// Validators
import { validatePassword, validateUsername } from '../../validators/user.validators'

export const SignIn: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameValidation, setUsernameValidation] = useState<string[] | null>(null)
  const [passwordValidation, setPasswordValidation] = useState<string[] | null>(null)

  const [userLoading, setUserLoading] = useState(false)
  let authGeneralError = useSelector(selectAuthError)
  const user = useSelector(selectUser)
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()

  const isUserLoading = useSelector(selectUserLoading)

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
    setUsernameValidation(null)
  }, [username])
  useEffect(() => {
    setPasswordValidation(null)
  }, [password])

  const signInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // VALIDATION
    setUsernameValidation(validateUsername(username) ? ['Invalid Username'] : null)
    setPasswordValidation(validatePassword(password) ? ['Invalid Password'] : null)

    const signInProps: ISignIn = {
      username,
      password,
    }
    authGeneralError = undefined
    if (validateUsername(username) === null && validatePassword(password) === null) {
      dispatch(signIn(signInProps))
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
          <Loader />
          <Tint />
        </>
      ) : null}

      <Container component='main' maxWidth='xs' className={classes.main}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={signInSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(usernameValidation) ? true : false}
              helperText={
                Boolean(usernameValidation) ? usernameValidation?.map((err) => `${err}. `) : false
              }
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
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
            <Box margin='15px 0 15px 0' textAlign='center'>
              {error ? <FormLabel error>* {authGeneralError}</FormLabel> : null}
            </Box>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
}
