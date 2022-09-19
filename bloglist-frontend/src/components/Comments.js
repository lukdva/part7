import React from 'react'

const Comments = ({ comments }) => {
  console.log(comments)
  return (
    <div>
      <h3>comments</h3>
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
