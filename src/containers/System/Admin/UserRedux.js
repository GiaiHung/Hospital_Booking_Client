import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import axios from '../../../axios'
import { LANGUAGES } from '../../../utils/constant'
import './UserRedux.scss'

class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: [],
    }
  }

  async componentDidMount() {
    const res = await axios.get('/api/v1/allcode?type=gender')
    if (res.data.status === 'success') {
      this.setState({
        genderArr: res.data.data,
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
                    <select id="inputState" className="form-control">
                      {this.state.genderArr.length > 0 &&
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
                    <input type="text" className="form-control" id="inputZip" />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputZip">
                      <FormattedMessage id="manage-user.role-id" />
                    </label>
                    <input type="text" className="form-control" id="roleId" />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputZip">
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <input type="text" className="form-control" id="image" />
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
