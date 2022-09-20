import React from 'react'
// import { useState } from 'react'
import { useField } from '../hooks/index'
import { createComment } from '../reducers/BlogsReducer'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

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
        <input {...comment.validFields} />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm
