import { makeStyles, withStyles, MenuProps, Menu, MenuItem } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  navbar: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  linkStyles: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  noTextTransform: {
    textTransform: 'none',
  },
}))

export const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    width: 150,
    height: 35,
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      minWidth: 0,
      color: theme.palette.common.white,
    },
  },
}))(MenuItem)
