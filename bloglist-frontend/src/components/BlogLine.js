import { ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogLine = ({ blog }) => {
  //   const blogLineStyle = {
  //     paddingTop: 10,
  //     paddingLeft: 2,
  //     border: 'solid',
  //     borderWidth: 1,
  //     marginBottom: 5,
  //   }

  return (
    <ListItem button divider component={Link} to={`/blogs/${blog.id}`}>
      <ListItemText>{`${blog.title} ${blog.author}`}</ListItemText>
    </ListItem>
  )
}

export default BlogLine
