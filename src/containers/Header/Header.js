import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as _ from 'lodash'

import * as actions from '../../store/actions'
import Navigator from '../../components/Navigator'
import { LANGUAGES, USER_ROLE } from '../../utils/constant'
import { adminMenu, doctorMenu } from './menuApp'
import { changeLanguageApp } from '../../store/actions'
import './Header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: [],
    }
  }

  componentDidMount() {
    const user = this.props.userInfo
    if (!_.isEmpty(user)) {
      if (user.roleId === USER_ROLE.ADMIN) {
        this.setState({
          menu: adminMenu,
        })
      } else if (user.roleId === USER_ROLE.DOCTOR) {
        this.setState({
          menu: doctorMenu,
        })
      }
    }
  }

  handleChangeLanguage(language) {
    this.props.dispatchChangeLanguage(language)
  }

  render() {
    const { processLogout, language, userInfo } = this.props

    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Navigator menus={this.state.menu} />
        </div>

        <div className="right">
          <div className="languages">
            <span className="welcome">
              <FormattedMessage id="home-header.welcome" />,{' '}
              {userInfo && userInfo.firstName ? userInfo.firstName : ''}
            </span>
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
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    dispatchChangeLanguage: (language) => dispatch(changeLanguageApp(language)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
