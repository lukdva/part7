import { List, Typography, ListItem } from '@mui/material'
import React from 'react'
import CommentForm from './CommentForm'

const Comments = ({ comments }) => {
  console.log(comments)
  return (
    <div>
      <Typography variant={'h4'}>comments</Typography>
      <CommentForm />
      {comments && comments.length > 0 ? (
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <Typography variant={'body1'}>{comment.content}</Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant={'body1'}>No comments available</Typography>
      )}
    </div>
  )
}
export default Comments
