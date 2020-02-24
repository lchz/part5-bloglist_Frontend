import React, { useState } from 'react'


const Blog = ({ blog, updateLikes, deleteBlog, sameUser }) => {
  const [visibility, setVisibility] = useState(false)

  const removeButton = sameUser === true
    ? <button onClick={deleteBlog}>remove</button>
    : null

  if (visibility) {

    return (
      <div className='blog'>

        <div>
          {blog.title} - {blog.author}
          <button onClick={() => setVisibility(!visibility)}>hide</button>
        </div>

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

        <div>
          {removeButton}
        </div>


      </div>
    )

  }

  return (
    <div className='blog'>
      <div>
        {blog.title} - {blog.author}

        <button onClick={() => setVisibility(!visibility)}>view</button>
      </div>

    </div>
  )

}

export default Blog
