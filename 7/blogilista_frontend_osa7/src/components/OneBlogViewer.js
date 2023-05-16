import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const OneBlogViewer = ({ blogs }) => {
    const id = useParams().id
    const bl = blogs.find(b => b.id === id)
    return (
      <div>
        <h3>{bl.title}</h3>
      </div>
    )
  }

export default OneBlogViewer