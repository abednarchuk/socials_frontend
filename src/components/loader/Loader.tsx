import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    loader: {
      position: 'absolute',
      top: 'calc(32%)',
      left: 'calc(50% - 50px)',
      width: '100px !important',
      height: '100px !important',
      zIndex: 3,
    },
    tint: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 2,
      top: 64,
      left: 0,
    },
  })
)

export const Loader = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress color='secondary' className={classes.loader} />
    </div>
  )
}

export const Tint = () => {
  const classes = useStyles()
  return <div className={classes.tint} />
}
