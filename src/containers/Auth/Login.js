import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as actions from '../../store/actions'
import './Login.scss'
import { userService } from '../../services'
// import { FormattedMessage } from 'react-intl'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isShownPassword: false,
      errMessage: '',
    }
  }

  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  handleLogin = async () => {
    try {
      this.setState({
        errMessage: '',
      })
      const { data } = await userService.handleLogin(
        this.state.username,
        this.state.password
      )
      if (data.status === 'success') {
        this.props.userLoginSuccess(data.data)
      }
    } catch (error) {
      console.log(error)
      this.setState({
        errMessage: error.response.data.message,
      })
    }
  }

  handleShowHidePassword = () => {
    this.setState({
      isShownPassword: !this.state.isShownPassword,
    })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleLogin()
    }
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="form-control login-input"
                value={this.state.username}
                onChange={(e) => this.handleOnChangeUsername(e)}
              />
            </div>
            <div className="col-12 form-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={this.state.isShownPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="form-control login-input"
                  value={this.state.password}
                  onChange={(e) => this.handleOnChangePassword(e)}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                />
                <i
                  className={`fas ${
                    this.state.isShownPassword ? 'fa-eye' : 'fa-eye-slash'
                  } eye`}
                  onClick={() => {
                    this.handleShowHidePassword()
                  }}
                ></i>
              </div>
            </div>
            <div className="col-12">
              {this.state.errMessage && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {this.state.errMessage}
                </p>
              )}
            </div>
            <div className="col-12">
              <button className="login-btn" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12 forgot-password">
              <span>Forgot your password</span>
            </div>
            <div className="col-12 login-with">
              <span>Or login with:</span>
            </div>
            <div className="social-icons col-12">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
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
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
