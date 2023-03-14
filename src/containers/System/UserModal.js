import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class UserModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phonenumber: '',
      gender: '1',
      roleId: '3',
    }
  }

  componentDidMount() {
    if (this.props.util === 'edit') {
      const { firstName, lastName, address, phonenumber, gender } =
        this.props.currentUser
      this.setState({
        ...this.state,
        firstName,
        lastName,
        address,
        phonenumber,
        gender,
      })
    }
  }

  toggle = () => {
    this.props.toggleModalUser()
  }

  checkValidateInput() {
    let isValid = true
    const checkFields =
      this.props.util === 'create'
        ? [
            'email',
            'password',
            'firstName',
            'lastName',
            'address',
            'phonenumber',
            'gender',
            'roleId',
          ]
        : ['firstName', 'lastName', 'address', 'phonenumber', 'gender']
    for (let i = 0; i < checkFields.length; i++) {
      if (!this.state[checkFields[i]]) {
        alert('Missing field: ' + checkFields[i])
        isValid = false
        return
      }
    }
    return isValid
  }

  handleOnChangeInput(e) {
    const copyState = { ...this.state }
    copyState[e.target.name] = e.target.value
    this.setState({ ...copyState })
  }

  async handleUpdateAndCreateUser() {
    if (this.props.util === 'create') {
      if (this.checkValidateInput()) {
        await this.props.createUser(this.state)
        this.setState({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          address: '',
          phonenumber: '',
          gender: '1',
          roleId: '3',
        })
      }
    } else {
      if (this.checkValidateInput()) {
        const updateState = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phonenumber: this.state.phonenumber,
          gender: this.state.gender,
        }
        await this.props.updateUser(updateState)
        this.setState({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          address: '',
          phonenumber: '',
          gender: '1',
          roleId: '3',
        })
      }
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        toggle={() => {
          this.toggle()
        }}
        className={'user-modal'}
      >
        <ModalHeader
          toggle={() => {
            this.toggle()
          }}
        >
          Modal title
        </ModalHeader>
        <ModalBody>
          <div className="user-modal-body">
            {this.props.util === 'create' && (
              <>
                <div className="input-container">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.handleOnChangeInput(e)}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => this.handleOnChangeInput(e)}
                    value={this.state.password}
                  />
                </div>
              </>
            )}
            <div className="input-container">
              <label htmlFor="">Firstname</label>
              <input
                type="text"
                placeholder="Firstname"
                name="firstName"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Lastname</label>
              <input
                type="text"
                placeholder="Lastname"
                name="lastName"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-w-input">
              <label htmlFor="">Address</label>
              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.address}
              />
            </div>
            <div className="input-container">
              <label>Phone number</label>
              <input
                type="text"
                id="phonenumber"
                name="phonenumber"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.phonenumber}
              />
            </div>
            <div className="input-container">
              <label>Gender</label>
              <select
                name="gender"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.gender}
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            {this.props.util === 'create' && (
              <div className="input-container">
                <label>Role</label>
                <select
                  name="roleId"
                  onChange={(e) => this.handleOnChangeInput(e)}
                  value={this.state.roleId}
                >
                  <option value="1">Doctor</option>
                  <option value="2">Patient</option>
                  <option value="3">Admin</option>
                </select>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn btn-primary d-flex align-items-center"
            onClick={() => {
              this.handleUpdateAndCreateUser()
            }}
          >
            {this.props.util === 'create' ? 'Add new' : 'Update'}
          </Button>{' '}
          <Button
            color="secondary"
            className="btn btn-primary d-flex align-items-center"
            onClick={() => {
              this.toggle()
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserModal)
