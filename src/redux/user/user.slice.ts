import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import {
  validatePassword,
  validateName,
  validateEmail,
  validateUsername,
} from '../../validators/user.validators'
import { passwordValidationSchema } from '../../validators/user/password'
import { usernameValidationSchema } from '../../validators/user/username'

interface IUser {
  currentUser: ICurrentUser | null
  fetchingUser: IFetchingUser
}
interface ICurrentUser {
  id: string
  name: string
  username: string
  email: string
}

interface IFetchingUser {
  fetchingUser: boolean
  status: ('success' | 'fail' | 'error') | null
  error?: IUserError | null
}

interface IUserError {
  generalError?: string
  name?: string[] | null
  username?: string[] | null
  email?: string[] | null
  password?: string[] | null
}

export interface ISignUp {
  name: string
  username: string
  email: string
  password: string
}

export interface ISignIn {
  username: string
  password: string
}

const initialState: IUser = {
  currentUser: null,
  fetchingUser: {
    fetchingUser: false,
    status: null,
    error: null,
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startFetchingUser: (state) => {
      state.fetchingUser.fetchingUser = true
    },
    errorFetchingUser: (state, action: PayloadAction<Partial<IFetchingUser>>) => {
      state.fetchingUser.fetchingUser = false
      state.fetchingUser.error = action.payload.error ? action.payload.error : null
      state.fetchingUser.status = action.payload.status ? action.payload.status : null
    },
    successFetchingUser: (state, action: PayloadAction<ICurrentUser>) => {
      state.fetchingUser.fetchingUser = false
      const { id, name, username, email } = action.payload
      const user: ICurrentUser = { id, name, username, email }
      state.currentUser = user
      state.fetchingUser.status = null
      state.fetchingUser.error = null
    },
    deleteUser: (state) => {
      state.currentUser = null
    },
    removeAuthError: (state) => {
      state.fetchingUser.error = null
    },
  },
})

export const {
  startFetchingUser,
  errorFetchingUser,
  successFetchingUser,
  deleteUser,
  removeAuthError,
} = userSlice.actions

export const signUp = (signUpParams: ISignUp): AppThunk => async (dispatch) => {
  // Start fetching user
  dispatch(startFetchingUser())
  // Try to signup user
  const response = await fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(signUpParams),
  })
  const data = await response.json()

  // If failed to login, set error message in state
  if (data.status === 'fail') {
    return dispatch(
      errorFetchingUser({ status: data.status, error: { generalError: data.message } })
    )
  } else if (data.status === 'success') {
    // If success, add user to store
    const { _id, name, username, email } = data.data.user
    const user: ICurrentUser = {
      id: _id,
      name,
      username,
      email,
    }
    dispatch(successFetchingUser(user))
  }
}

export const signIn = (logInProps: ISignIn): AppThunk => async (dispatch) => {
  // Start fetching user
  dispatch(startFetchingUser())
  // Try to login user
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(logInProps),
  })
  const data = await response.json()

  // If failed to login, set error message in state
  if (data.status === 'fail') {
    dispatch(errorFetchingUser({ status: data.status, error: { generalError: data.message } }))
  } else if (data.status === 'success') {
    // If success, add user to store
    const { _id, name, username, email } = data.data.user
    const user: ICurrentUser = {
      id: _id,
      name,
      username,
      email,
    }
    dispatch(successFetchingUser(user))
  }
}

export const signOut = (): AppThunk => async (dispatch) => {
  const response = await fetch('http://localhost:5000/logout', {
    method: 'GET',
    credentials: 'include',
  })
  const data = await response.json()

  if ((data.status = 'success')) {
    dispatch(deleteUser())
  }
}

export const getCurrentUser = (): AppThunk => async (dispatch) => {
  // Start fetching user
  dispatch(startFetchingUser())

  const response = await fetch('http://localhost:5000/getMe', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  const data = await response.json()
  // If failed to login, set error message in state
  if (data.status === 'fail') {
    dispatch(errorFetchingUser({ status: data.status }))
  } else if (data.status === 'success') {
    // If success, add user to store
    const { _id, name, username, email } = data.data.user
    const user: ICurrentUser = {
      id: _id,
      name,
      username,
      email,
    }
    dispatch(successFetchingUser(user))
  }
}

export const selectUser = (state: RootState) => state.user.currentUser
export const selectAuthError = (state: RootState) => state.user.fetchingUser.error?.generalError
export const selectUserLoading = (state: RootState) => state.user.fetchingUser.fetchingUser

export default userSlice.reducer
