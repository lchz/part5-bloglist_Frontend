import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  message }) => {

  return (
    <div>
      <h2>Log in to application</h2>

      <Notification message={message} />

      <form onSubmit={handleSubmit}>
        <div>
                  username:
          <input
            type="text"
            value={username}
            id='username'
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          password:
          <input
            type="password"
            value={password}
            id='password'
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>

        <button id='login-button' type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm