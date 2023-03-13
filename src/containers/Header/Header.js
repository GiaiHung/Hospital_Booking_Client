import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions'
import Navigator from '../../components/Navigator'
import { LANGUAGES } from '../../utils/constant'
import { adminMenu } from './menuApp'
import { changeLanguageApp } from '../../store/actions'
import './Header.scss'

class Header extends Component {
  handleChangeLanguage(language) {
    this.props.dispatchChangeLanguage(language)
  }

  render() {
    const { processLogout, language } = this.props

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>

        <div className="right">
          <div className="languages">
            <span
              className={language === 'vi' ? 'active' : undefined}
              onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
            >
              VI
            </span>
            <span
              className={language === 'en' ? 'active' : undefined}
              onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
            >
              EN
            </span>
          </div>
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="logout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    dispatchChangeLanguage: (language) => dispatch(changeLanguageApp(language)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
