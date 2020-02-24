import React from 'react'

const FullBlog = ({ blog, updateLikes, deleteBlog, removeButton }) => {

  const showRemoveButton = { display: removeButton ? '' : 'none' }

  return (
    <div>
      <div>
        {blog.url}
      </div>

      <div>
        likes: {blog.likes}
        <button onClick={updateLikes}>like</button>
      </div>

      <div>
        {blog.user.name}
      </div>

      {/*  */}
      <div style={showRemoveButton}>
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div >
  )
}


export default FullBlog