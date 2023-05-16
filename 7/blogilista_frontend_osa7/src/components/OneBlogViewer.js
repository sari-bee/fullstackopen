import { useParams, useNavigate } from 'react-router-dom'

const OneBlogViewer = ({ blogs, user, addLike, deleteBlog }) => {

  const navigate = useNavigate()

  const handleAddLike = (event) => {
    event.preventDefault()
    addLike(bl.id)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteBlog(bl.id)
    navigate('/')
  }

  const deleteButton = () => {
    if (bl.user.username === user.username) {
      return (
        <>
          <button onClick={handleDelete} id="delete-button">
            remove
          </button>
        </>
      )
    } else {
      return <></>
    }
  }

  const id = useParams().id
    const bl = blogs.find(b => b.id === id)
    return (
      <div>
        <h4>{bl.title} by {bl.author}</h4>
        <p><a href={bl.url}>{bl.url}</a><br/>
        {bl.likes} likes  <button onClick={handleAddLike}>like</button><br/>
        added by {bl.user.name}<br/>
        {deleteButton()}</p>
      </div>
    )
  }

export default OneBlogViewer