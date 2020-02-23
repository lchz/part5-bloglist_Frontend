import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user,
    }

    const returnedBlog = await blogService.create(newBlog)

    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setErrorMessage(`A new blog ${title} by ${author} added`)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const Notification = ({message}) => {
    if (message.length === 0 || message === null) {
      return null
    }

    if (message.includes('added')) {
      return (
        <div className='success'>
          {message}
        </div>
      )
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }


  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>

      <Notification message={errorMessage} />

      <form onSubmit={handleLogin}>
        <div>
          username:
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password:
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  )

  const newBlogForm = () => (

    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input 
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input 
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input 
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

    </div>
  )

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
                        <Blog key={blog.id} blog={blog} />
                      )}
                    </div>
      }
    </div>
  )
}

export default App