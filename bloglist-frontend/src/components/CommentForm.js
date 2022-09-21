import React from 'react'
// import { useState } from 'react'
import { useField } from '../hooks/index'
import { createComment } from '../reducers/BlogsReducer'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const CommentForm = () => {
  const comment = useField()
  const dispatch = useDispatch()
  const blogId = useParams().id
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createComment(blogId, comment.validFields.value))
    comment.reset()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField size="small" label="comment" {...comment.validFields} />
        <Button variant="contained" size="small" type="submit">
          add comment
        </Button>
      </form>
    </div>
  )
}

export default CommentForm
