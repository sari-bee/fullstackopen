import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const LoginForm = ({ loginUser }) => {

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    loginUser({
      username: username,
      password: password,
    })
  }

  return (
    <>
      <br/>
      <h4>log in to application</h4>
      <br/>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <br/>
        <Form.Label>password</Form.Label>
        <Form.Control
            type="password"
            name="password"
        />
        <br/>
        <button type="submit">
          login
        </button>
        </Form.Group>
      </Form>
    </>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
}

export default LoginForm
