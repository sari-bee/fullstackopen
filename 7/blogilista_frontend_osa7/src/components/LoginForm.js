import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    loginUser({
      username: username,
      password: password,
    })
    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
}

export default LoginForm
