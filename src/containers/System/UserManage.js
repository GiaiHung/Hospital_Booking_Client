import React, { Component } from 'react'
import { connect } from 'react-redux'
import './UserManage.scss'
import { userService } from '../../services'
import UserModal from './UserModal'

class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      util: '',
      currentUser: '',
    }
    this.toggleModalUser = this.toggleModalUser.bind(this)
  }
  async componentDidMount() {
    await this.getAllUsers()
  }
  async getAllUsers() {
    const res = await userService.getAllUsers()
    if (res.data.status === 'success') {
      this.setState({
        users: res.data.data,
      })
    }
  }
  handleAddUser() {
    this.setState({
      isModalOpen: true,
      util: 'create',
    })
  }
  async handleEditUser(user) {
    try {
      const res = await userService.getUser(user.id)
      if (res.data.status === 'success') {
        this.setState({
          isModalOpen: true,
          util: 'edit',
          currentUser: res.data.data,
        })
      }
    } catch (error) {
      alert(error.message)
    }
  }
  toggleModalUser() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }
  createUser = async (data) => {
    try {
      await userService.createUserService(data)
      await this.getAllUsers()
      this.setState({ isModalOpen: false })
      alert('User created successfully')
    } catch (error) {
      alert(error.message)
    }
  }
  updateUser = async (data) => {
    try {
      await userService.updateUserService(data, this.state.currentUser.id)
      await this.getAllUsers()
      this.setState({ isModalOpen: false })
    } catch (error) {
      alert(error.message)
    }
  }
  async handleDeleteUser(user) {
    try {
      await userService.deleteUserService(user.id)
      await this.getAllUsers()
    } catch (error) {
      alert(error.message)
    }
  }

  render() {
    return (
      <div className="users-container">
        {this.state.isModalOpen && (
          <UserModal
            isModalOpen={this.state.isModalOpen}
            util={this.state.util}
            currentUser={this.state.currentUser}
            toggleModalUser={this.toggleModalUser}
            createUser={this.createUser}
            updateUser={this.updateUser}
            centered
          />
        )}
        <div className="title text-center">
          Manage users with Hospital Booking
        </div>
        <div className="mx-3 d-flex gap-3">
          <button
            className="btn btn-primary px-3 d-flex gap-2"
            onClick={() => this.handleAddUser()}
          >
            <i className="fas fa-plus"></i>
            <span className="ml-2"> Create new users</span>
          </button>
        </div>
        <div className="users-table mt-4 mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {this.state.users &&
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
                        onClick={() => this.handleEditUser(user)}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        className="btn user-delete"
                        onClick={() => this.handleDeleteUser(user)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage)
