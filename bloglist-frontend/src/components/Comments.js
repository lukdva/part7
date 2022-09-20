import React from 'react'
import CommentForm from './CommentForm'

const Comments = ({ comments }) => {
  console.log(comments)
  return (
    <div>
      <h3>comments</h3>
      <CommentForm />
      {comments && comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      ) : (
        <div>No comments available</div>
      )}
    </div>
  )
}
export default Comments
