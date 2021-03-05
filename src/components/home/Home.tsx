import { Box, Button, Container, Grid, Typography, Link as LinkStyled } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user/user.slice'

import { makeStyles } from '@material-ui/core/styles'

export const Home = () => {
  const classes = useStyles()
  const user = useSelector(selectUser)
  return (
    <Box className={classes.backgroundImage}>
      <Box className={classes.tint}>
        <Container className={classes.container} maxWidth='sm'>
          <Grid container className={classes.gridContent} direction='column'>
            <Grid item sm={2} className={classes.gridItem} />
            <Grid item sm={1} className={classes.gridItem}>
              <Typography variant='h4' component='h2' align='center'>
                Socials Showcase
              </Typography>
            </Grid>
            <Grid item sm={1} className={classes.gridItem} />
            <Grid item sm={4} className={classes.gridItem}>
              <Typography variant='h6' component='h4' align='center'>
                Sign up and showcase your social media links
              </Typography>
            </Grid>
            <Grid item sm={1} className={classes.gridItem} />
            <Grid item sm={2} className={classes.gridItem}>
              {!user ? (
                <>
                  <Box mx={2}>
                    <LinkStyled
                      variant='button'
                      component={Link}
                      color='textSecondary'
                      to='/signin'>
                      Sign In
                    </LinkStyled>
                  </Box>
                  <Box mx={2}>
                    <LinkStyled
                      variant='button'
                      component={Link}
                      color='textSecondary'
                      to='/signup'>
                      Sign Up
                    </LinkStyled>
                  </Box>
                </>
              ) : (
                <>
                  <Box mx={2}>
                    <LinkStyled
                      variant='button'
                      component={Link}
                      color='textSecondary'
                      to='/signin'>
                      Add Socials
                    </LinkStyled>
                  </Box>
                </>
              )}
            </Grid>
            <Grid item sm={1} className={classes.gridItem} />
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    backgroundImage: `url(http://localhost:3000/socials.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  tint: {
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  gridContent: {
    position: 'relative',
    height: '100%',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
  },
  center: {},
  container: {
    height: 600,
    padding: theme.spacing(2, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))
