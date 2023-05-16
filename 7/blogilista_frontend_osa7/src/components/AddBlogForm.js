import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

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
      <h4>create new</h4>
      <Form onSubmit={handleAdd}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            name="title"
          />
          <br/>
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            name="author"
          />
          <br/>
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            name="url"
          />
          <br/>
        <button type="submit">
          create
        </button>
        </Form.Group>
      </Form>
    </>
  )
}

AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default AddBlogForm
