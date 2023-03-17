import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { FaUpload } from 'react-icons/fa'
import Lightbox from 'react-image-lightbox'
import { fetchReduxData } from '../../../store/actions'
import { LANGUAGES } from '../../../utils/constant'
import './UserRedux.scss'
import 'react-image-lightbox/style.css'

class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImageUrl: '',
      isOpen: false,
    }
  }

  async componentDidMount() {
    await this.props.getGender()
    await this.props.getPosition()
    await this.props.getRole()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gendersRedux !== this.props.gendersRedux) {
      this.setState({
        genderArr: this.props.gendersRedux,
      })
    }
    if (prevProps.positionsRedux !== this.props.positionsRedux) {
      this.setState({
        positionArr: this.props.positionsRedux,
      })
    }
    if (prevProps.rolesRedux !== this.props.rolesRedux) {
      this.setState({
        roleArr: this.props.rolesRedux,
      })
    }
  }

  handleUploadImage(e) {
    const file = e.target.files[0]

    if (file) {
      const objectUrl = URL.createObjectURL(file)
      this.setState({
        previewImageUrl: objectUrl,
      })
    }
  }

  render() {
    return (
      <div className="user-redux-container">
        <div className="title">User Redux Management</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <form className="user-redux-form">
                <div className="form">
                  <div className="form-group col-6">
                    <label htmlFor="inputEmail4">
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="form">
                  <div className="form-group col-6">
                    <label htmlFor="inputAddress">
                      <FormattedMessage id="manage-user.firstname" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="John"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="inputAddress2">
                      <FormattedMessage id="manage-user.lastname" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress2"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="form">
                  <div className="form-group col-md-4">
                    <label htmlFor="inputCity">
                      <FormattedMessage id="manage-user.phone-number" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputCity">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    {/* Gender select */}
                    <select id="inputState" className="form-control">
                      {this.state.genderArr?.length > 0 &&
                        this.state.genderArr.map((gender, index) => (
                          // No correction
                          <option key={index}>
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
                    <label htmlFor="inputZip">
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    {/* Position select */}
                    <select id="inputState" className="form-control">
                      {this.state.positionArr?.length > 0 &&
                        this.state.positionArr.map((position, index) => (
                          // No correction
                          <option key={index}>
                            {this.props.language === LANGUAGES.VI
                              ? position.value_vi
                              : position.value_en}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputZip">
                      <FormattedMessage id="manage-user.role-id" />
                    </label>
                    {/* Role select */}
                    <select id="inputState" className="form-control">
                      {this.state.roleArr?.length > 0 &&
                        this.state.roleArr.map((role, index) => (
                          // No correction
                          <option key={index}>
                            {this.props.language === LANGUAGES.VI
                              ? role.value_vi
                              : role.value_en}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputZip">
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
                  <button type="submit" className="btn btn-primary mx-4 mt-3">
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
