import { List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <>
      <Typography variant={'h2'}>{user.name}</Typography>
      <Typography variant={'h4'}>added blogs</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem divider key={blog.id}>
            <ListItemText>{blog.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default User
