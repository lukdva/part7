import { AppBar, Button, Toolbar, Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
        </Box>
        <UserInfo color="inherit" />
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
