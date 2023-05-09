import PropTypes from 'prop-types'

const AddBlogForm = ({ createBlog }) => {

  const handleAdd = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    createBlog({
      title: title,
      author: author,
      url: url,
    })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          title{' '}
          <input
            type="text"
            name="title"
            id="title-input"
          />
        </div>
        <div>
          author{' '}
          <input
            type="text"
            name="author"
            id="author-input"
          />
        </div>
        <div>
          url{' '}
          <input
            type="text"
            name="url"
            id="url-input"
          />
        </div>
        <button type="submit" id="submit-button">
          create
        </button>
      </form>
    </>
  )
}

AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default AddBlogForm
