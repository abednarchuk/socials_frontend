import React, { useState, useEffect } from 'react'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, signOut, selectUserLoading } from '../../redux/user/user.slice'
// Router
import { Link, useHistory } from 'react-router-dom'
// MateriallUI
import { useStyles, StyledMenu, StyledMenuItem } from './navigation.styles'
import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  Icon,
  LinearProgress,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

export const Navigation = () => {
  const [userLoading, setUserLoading] = useState(false)
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null)
  const classes = useStyles()
  const user = useSelector(selectUser)
  const isUserLoading = useSelector(selectUserLoading)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    setUserLoading(isUserLoading)
  }, [isUserLoading])

  const onSignOut = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    setUserMenu(null)
    dispatch(signOut())
    history.push('/')
  }

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget)
  }

  const handleUserMenuClose = (event: React.MouseEvent<EventTarget>) => {
    setUserMenu(null)
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Grid container className={classes.navbar}>
            <Grid item md={2} sm={2} xs={false} />
            <Grid item md={1} sm={1} xs={2} className={classes.justifyCenter}>
              <Link to='/'>
                <IconButton>
                  <HomeIcon />
                </IconButton>
              </Link>
            </Grid>
            <Grid item md={1} sm={2} xs={4}>
              <Typography variant='h6'>Socials</Typography>
            </Grid>
            <Grid item md={3} sm={2} xs={false} />

            <Grid item container md={3} sm={4} xs={6} className={classes.justifyCenter}>
              {!user ? (
                <>
                  <Link to='/signin'>
                    <Button variant='text' className={classes.linkStyles}>
                      Sign in
                    </Button>
                  </Link>
                  <Link to='/signup'>
                    <Button variant='text' className={classes.linkStyles}>
                      Sign up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button onClick={handleUserMenuClick}>
                    <Icon>
                      <AccountCircleIcon />
                    </Icon>
                    <Box mx={1} />
                    <Typography className={classes.noTextTransform} variant='button'>
                      {user.name}
                    </Typography>
                  </Button>
                  <StyledMenu
                    anchorEl={userMenu}
                    open={Boolean(userMenu)}
                    keepMounted
                    onClose={handleUserMenuClose}>
                    <StyledMenuItem>
                      <ListItemText onClick={onSignOut}>Sign Out</ListItemText>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                    </StyledMenuItem>
                  </StyledMenu>
                </>
              )}
            </Grid>
            <Grid item md={2} sm={2} xs={false} />
          </Grid>
        </Toolbar>
      </AppBar>
      {userLoading ? <LinearProgress color='secondary' /> : null}
    </>
  )
}
