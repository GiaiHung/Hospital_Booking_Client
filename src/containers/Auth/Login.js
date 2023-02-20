import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as actions from '../../store/actions'
import './Login.scss'
// import { FormattedMessage } from 'react-intl'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isShownPassword: false,
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
  handleLogin = () => {
    console.log(
      'username',
      this.state.username,
      'password',
      this.state.password
    )
  }
  handleShowHidePassword = () => {
    this.setState({
      isShownPassword: !this.state.isShownPassword,
    })
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
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
