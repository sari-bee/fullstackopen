const LogoutUserViewer = ({ handleLogout, user }) => {
    return (
      <>
        <h3>blogs</h3>
        <form onSubmit={handleLogout}>
          {user.name} logged in{' '}
          <button type="submit" id="logout-button">
            logout
          </button>
        </form>
        <p></p>
      </>
    )
  }

export default LogoutUserViewer