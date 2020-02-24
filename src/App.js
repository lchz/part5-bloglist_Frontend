import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)


  const sortBlogs = (b1, b2) => {
    return (b2.likes - b1.likes)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(sortBlogs)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
        setUsername('')
        setPassword('')
      }, 3000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='Log in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
        message={errorMessage}
      />
    </Togglable>
  )



  const blogFormRef = React.createRef()

  const addBlog = async (blogObject) => {

    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)

    } catch (exception) {
      setErrorMessage('New blog failed to add')
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  }

  const newBlogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  /** Update likes */
  const updateLikes = async (event, blog) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes+1 }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    console.log('returned:', returnedBlog)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
  }


  const deleteBlog = async (blog) => {

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {

      try {
        await blogService.deleting(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setErrorMessage(`Successfully removed ${blog.title} by ${blog.author}`)

      } catch (exception) {
        setErrorMessage(`Failed to delete ${blog.title} by ${blog.title}`)
      }

      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

    }

  }



  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  )

  const sameUser = (blog) => {
    return user.username === blog.user.username
  }


  return (
    <div>
      {user === null ? loginForm()
        :
        <div>
          <h2>blogs</h2>

          <Notification message={errorMessage} />

          <div>{user.name} logged in {logoutForm()}</div>
          <br></br>

          {newBlogForm()} <br></br>

          {blogs.map(blog =>
            <Blog key={blog.id}
              blog={blog}
              sameUser={sameUser(blog)}
              updateLikes={(event) => updateLikes(event, blog)}
              deleteBlog={() => deleteBlog(blog)}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App