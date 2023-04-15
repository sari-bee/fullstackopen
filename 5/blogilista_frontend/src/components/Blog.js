import { useState } from 'react'

const Blog = ({blog, addLike}) => {
  const [informationVisible, setInformationVisible] = useState(false)

  const hideWhenVisible = { display: informationVisible ? 'none' : '' }
  const showWhenVisible = { display: informationVisible ? '' : 'none' }  

  const handleAddLike = (event) => {
    event.preventDefault()
    addLike(blog.id)
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
      </div>
  </div>
  )
}

export default Blog