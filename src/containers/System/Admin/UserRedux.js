import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { FaUpload } from 'react-icons/fa'
import Lightbox from 'react-image-lightbox'
import {
  getAllUsers,
  createUser,
  fetchReduxData,
  editUser,
} from '../../../store/actions'
import { LANGUAGES, USER_REDUX_ACTIONS } from '../../../utils/constant'
import { CommonUtils } from '../../../utils'
import './UserRedux.scss'
import 'react-image-lightbox/style.css'
import UserReduxTable from './UserReduxTable'

class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImageUrl: '',
      isOpen: false,

      // Input
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phonenumber: '',
      address: '',
      positionId: '',
      roleId: '',
      image: '',
      gender: '',
      current_action: USER_REDUX_ACTIONS.CREATE,
      user_edit_id: '',
    }
  }

  async componentDidMount() {
    await this.props.getGender()
    await this.props.getPosition()
    await this.props.getRole()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gendersRedux !== this.props.gendersRedux) {
      const arr = this.props.gendersRedux
      this.setState({
        gender: arr && arr.length > 0 ? arr[0].keyMap : '',
        genderArr: this.props.gendersRedux,
      })
    }
    if (prevProps.positionsRedux !== this.props.positionsRedux) {
      const arr = this.props.positionsRedux
      this.setState({
        positionId: arr && arr.length > 0 ? arr[0].keyMap : '',
        positionArr: this.props.positionsRedux,
      })
    }
    if (prevProps.rolesRedux !== this.props.rolesRedux) {
      const arr = this.props.rolesRedux
      this.setState({
        roleId: arr && arr.length > 0 ? arr[0].keyMap : '',
        roleArr: this.props.rolesRedux,
      })
    }
  }

  async handleUploadImage(e) {
    const file = e.target.files[0]

    if (file) {
      const objectUrl = URL.createObjectURL(file)
      const base64 = await CommonUtils.getBase64(file)
      this.setState({
        previewImageUrl: objectUrl,
        image: base64,
      })
    }
  }

  handleOnChangeInput(e, id) {
    const copyState = { ...this.state }
    copyState[id] = e.target.value
    this.setState({
      ...copyState,
    })
  }

  validateInput() {
    const checked = [
      'email',
      'password',
      'firstName',
      'lastName',
      'phonenumber',
      'address',
      'positionId',
      'roleId',
      'gender',
    ]
    let isValid = true
    for (let i = 0; i < checked.length; i++) {
      if (!this.state[checked[i]]) {
        alert('Missing required field ' + checked[i])
        isValid = false
        break
      }
    }
    return isValid
  }

  async handleSubmit(e) {
    e.preventDefault()
    if (!this.validateInput()) return
    const {
      email,
      password,
      firstName,
      lastName,
      phonenumber,
      address,
      positionId,
      roleId,
      gender,
      image,
      user_edit_id,
    } = this.state

    if (this.state.current_action === USER_REDUX_ACTIONS.CREATE) {
      await this.props.createUser({
        email,
        password,
        firstName,
        lastName,
        phonenumber,
        address,
        positionId,
        roleId,
        gender,
        image,
      })
    }

    if (this.state.current_action === USER_REDUX_ACTIONS.EDIT) {
      await this.props.editUser(
        {
          id: user_edit_id,
          firstName,
          lastName,
          phonenumber,
          address,
          positionId,
          roleId,
          gender,
          image,
        },
        user_edit_id
      )
    }

    this.setState({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phonenumber: '',
      address: '',
      positionId: 'P0',
      roleId: 'R1',
      image: '',
      gender: 'M',
      previewImageUrl: '',
      current_action: USER_REDUX_ACTIONS.CREATE,
      user_edit_id: '',
    })
  }

  handleUserEditFromParent = (user) => {
    let imageBase64 = ''
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary')
    }

    this.setState({
      email: user.email,
      password: 'HARDCODE',
      firstName: user.firstName,
      lastName: user.lastName,
      phonenumber: user.phonenumber,
      address: user.address,
      positionId: user.positionId,
      roleId: user.roleId,
      gender: user.gender,
      current_action: USER_REDUX_ACTIONS.EDIT,
      user_edit_id: user.id,
      previewImageUrl: imageBase64,
    })
  }

  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      phonenumber,
      address,
      positionId,
      roleId,
      gender,
    } = this.state

    return (
      <div className="user-redux-container">
        <div className="title">User Redux Management</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <form className="user-redux-form">
                <div className="form">
                  <div className="form-group col-6">
                    <label>
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      disabled={
                        this.state.current_action === USER_REDUX_ACTIONS.EDIT
                      }
                      value={email}
                      onChange={(e) => this.handleOnChangeInput(e, 'email')}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      disabled={
                        this.state.current_action === USER_REDUX_ACTIONS.EDIT
                      }
                      value={password}
                      onChange={(e) => this.handleOnChangeInput(e, 'password')}
                    />
                  </div>
                </div>
                <div className="form">
                  <div className="form-group col-6">
                    <label>
                      <FormattedMessage id="manage-user.firstname" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => this.handleOnChangeInput(e, 'firstName')}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label>
                      <FormattedMessage id="manage-user.lastname" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress2"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => this.handleOnChangeInput(e, 'lastName')}
                    />
                  </div>
                </div>
                <div className="form">
                  <div className="form-group col-md-4">
                    <label>
                      <FormattedMessage id="manage-user.phone-number" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      value={phonenumber}
                      onChange={(e) =>
                        this.handleOnChangeInput(e, 'phonenumber')
                      }
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      value={address}
                      onChange={(e) => this.handleOnChangeInput(e, 'address')}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    {/* Gender select */}
                    <select
                      id="inputState"
                      className="form-control"
                      value={gender}
                      onChange={(e) => this.handleOnChangeInput(e, 'gender')}
                    >
                      {this.state.genderArr?.length > 0 &&
                        this.state.genderArr.map((gender, index) => (
                          <option key={index} value={gender.keyMap}>
                            {this.props.language === LANGUAGES.VI
                              ? gender.value_vi
                              : gender.value_en}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="form">
                  <div className="form-group col-md-4">
                    <label>
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    {/* Position select */}
                    <select
                      id="inputState"
                      className="form-control"
                      value={positionId}
                      onChange={(e) =>
                        this.handleOnChangeInput(e, 'positionId')
                      }
                    >
                      {this.state.positionArr?.length > 0 &&
                        this.state.positionArr.map((position, index) => (
                          <option key={index} value={position.keyMap}>
                            {this.props.language === LANGUAGES.VI
                              ? position.value_vi
                              : position.value_en}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      <FormattedMessage id="manage-user.role-id" />
                    </label>
                    {/* Role select */}
                    <select
                      id="inputState"
                      className="form-control"
                      value={roleId}
                      onChange={(e) => this.handleOnChangeInput(e, 'roleId')}
                    >
                      {this.state.roleArr?.length > 0 &&
                        this.state.roleArr.map((role, index) => (
                          // No correction
                          <option key={index} value={role.keyMap}>
                            {this.props.language === LANGUAGES.VI
                              ? role.value_vi
                              : role.value_en}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <div className="preview-image-container">
                      <label htmlFor="preview-image">
                        <FaUpload className="icon" />
                        <span>
                          <FormattedMessage id="manage-user.preview-image-upload" />
                        </span>
                      </label>
                      {this.state.previewImageUrl && (
                        <div
                          className="preview-image"
                          style={{
                            backgroundImage: `url(${this.state.previewImageUrl})`,
                            backgroundPosition: 'left',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            cursor: 'pointer',
                          }}
                          onClick={() => this.setState({ isOpen: true })}
                        ></div>
                      )}
                      <input
                        type="file"
                        className="preview-image-input"
                        id="preview-image"
                        onChange={(e) => this.handleUploadImage(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form">
                  <button
                    type="submit"
                    className={`btn ${
                      this.state.current_action === USER_REDUX_ACTIONS.EDIT
                        ? 'btn-warning'
                        : 'btn-primary'
                    } mx-4 mt-3`}
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    {this.state.current_action === USER_REDUX_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.edit" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <UserReduxTable
          handleUserEditFromParent={this.handleUserEditFromParent}
        />
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImageUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gendersRedux: state.admin.genders,
    positionsRedux: state.admin.positions,
    rolesRedux: state.admin.roles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(fetchReduxData('gender')),
    getPosition: () => dispatch(fetchReduxData('position')),
    getRole: () => dispatch(fetchReduxData('role')),
    createUser: (data) => dispatch(createUser(data)),
    editUser: (data, id) => dispatch(editUser(data, id)),
    getAllUsers: () => dispatch(getAllUsers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
