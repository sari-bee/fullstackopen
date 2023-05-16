import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserViewer = ({ users }) => {
    return (
      <>
        <h3>users</h3>
        <div>
          <Table striped>
            <tbody>
              <tr>
                <td></td>
                <td><b>blogs created</b></td>
              </tr>
              {users
              .sort((a, b) => b.blogs.length - a.blogs.length)
              .map(u =>
              <tr key={u.id}>
                <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                <td>{u.blogs.length}</td>
              </tr>
              )}
            </tbody>
          </Table> 
        </div>
      </>
    )
  }

export default UserViewer