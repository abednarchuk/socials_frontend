import { useEffect, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// Redux
import { getCurrentUser, selectUser, selectUserLoading } from './redux/user/user.slice'
// Router
import { Route, Switch } from 'react-router-dom'
// Components
import { SignIn } from './components/signin/SignIn'
import { SignUp } from './components/signup/SignUp'
import { Navigation } from './components/navigation/Navigation'
import { Home } from './components/home/Home'
// MaterialUI
import { CssBaseline } from '@material-ui/core'

export const App: FC = () => {
  const user = useSelector(selectUser)
  const userIsLoading = useSelector(selectUserLoading)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!userIsLoading && !user) {
      dispatch(getCurrentUser())
    }
  }, [])
  return (
    <>
      <Navigation />
      <CssBaseline />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </>
  )
}
