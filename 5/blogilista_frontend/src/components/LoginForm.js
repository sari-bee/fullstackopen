const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
    return (
      <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input type="text" value={username} name="username" onChange={handleUsernameChange}/>
        </div>
        <div>
          password <input type="password" value={password} name="password" onChange={handlePasswordChange}/>
        </div>
        <button type="submit">login</button>
      </form>
      </>
    )
  }

  export default LoginForm