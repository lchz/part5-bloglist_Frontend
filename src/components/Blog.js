import React from 'react'
import Togglable from './Togglable'
import FullBlog from './FullBlog'


const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const viewFullBlog = () => {

    if (blog.user.username === user.username) {
      return (
        <div>
          <Togglable buttonLabel='view'>
            <FullBlog blog={blog}
              user={user}
              updateLikes={() => updateLikes(blog)}
              deleteBlog={() => deleteBlog(blog)}
              removeButton={true}
            />
          </Togglable>
        </div>
      )

    } else {

      return (
        <Togglable buttonLabel='view'>
          <FullBlog blog={blog}
            user={user}
            updateLikes={() => updateLikes(blog)}
            deleteBlog={() => deleteBlog(blog)}
            removeButton={false}
          />
        </Togglable>
      )
    }

  }

  return (
    <div className='blog'>

      {blog.title} - {blog.author}
      {viewFullBlog()}

    </div>
  )

}

export default Blog
