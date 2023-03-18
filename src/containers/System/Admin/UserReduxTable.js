import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaTrash, FaEdit } from 'react-icons/fa'
import './UserReduxTable.scss'
import { deleteUser, getAllUsers } from '../../../store/actions'

class UserReduxTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    this.props.getAllUsers()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        users: this.props.users,
      })
    }
  }

  async handleDeleteUser(id) {
    await this.props.deleteUser(id)
    await this.props.getAllUsers()
  }

  render() {
    return (
      <div className="container mt-3">
        <table className="user-redux-table">
          <tbody>
            <tr>
              <th>Email</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {this.state.users.length > 0 &&
              this.state.users.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>

                  <td
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      gap: '4px',
                    }}
                  >
                    <button
                      className="btn user-edit"
                      // onClick={() => this.handleEditUser(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn user-delete"
                      onClick={() => this.handleDeleteUser(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    deleteUser: (id) => dispatch(deleteUser(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReduxTable)
