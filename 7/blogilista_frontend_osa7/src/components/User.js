const User = ({ user }) => {
  return (
    <div className="userStyle">
        {user.name} {user.blogs.length}
    </div>
  )
}

export default User
