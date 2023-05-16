import Togglable from './Togglable'
import AddBlogForm from './AddBlogForm'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BlogViewer = ({ blogs, addBlogFormRef, createBlog }) => {
    return (
      <>
        <p></p>
        <Togglable
          buttonLabel="create new blog"
          closeLabel="cancel"
          ref={addBlogFormRef}
        >
          <AddBlogForm createBlog={createBlog} />
        </Togglable>
        <p></p>
        <Table striped>
          <tbody>
            {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></td>
            </tr>
            )}
          </tbody>
        </Table> 
      </>
    )
  }

export default BlogViewer