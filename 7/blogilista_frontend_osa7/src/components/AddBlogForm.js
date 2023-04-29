import { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          title <input type="text" value={title} name="title" id="title-input" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author <input type="text" value={author} name="author" id="author-input" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url <input type="text" value={url} name="url" id="url-input" onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit" id="submit-button">create</button>
      </form>
    </>
  )
}

AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default AddBlogForm