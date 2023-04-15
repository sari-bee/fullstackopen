import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [informationVisible, setInformationVisible] = useState(false)

  const hideWhenVisible = { display: informationVisible ? 'none' : '' }
  const showWhenVisible = { display: informationVisible ? '' : 'none' }

  const handleAddLike = (event) => {
    event.preventDefault()
    addLike(blog.id)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  const deleteButton = () => {
    if (blog.user.username === user) {
      return (
        <>
          <button onClick={handleDelete}>remove</button>
        </>
      )
    } else {
      return (
        <></>
      )
    }
  }

  return (
    <div className="blogStyle">
      <div style={hideWhenVisible}>
        {blog.title} <i>{blog.author}</i> <button onClick={() => setInformationVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <b>{blog.title}</b> <i>{blog.author}</i> <button onClick={() => setInformationVisible(false)}> hide</button><br/>
        <a href={blog.url}>{blog.url}</a><br/>
        likes {blog.likes} <button onClick={handleAddLike}>like</button><br/>
        {blog.user.name}<br/>
        {deleteButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default Blog