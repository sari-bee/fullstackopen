import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const OneUserViewer = ({ users }) => {
    const id = useParams().id
    const us = users.find(u => u.id === id)
    return (
      <div>
        <h3>{us.name}</h3>
        <p></p>
        <h6><b>added blogs</b></h6>
        <Table striped>
          <tbody>
            {us.blogs.map(b =>
              <tr key={b.id}>
                <td>{b.title}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }

export default OneUserViewer