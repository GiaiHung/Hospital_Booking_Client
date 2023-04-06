import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeFooter.scss'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions'

class HomeNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChangeLanguage(language) {
    this.props.dispatchChangeLanguage(language)
  }

  render() {
    return (
      <div className="home-header-container">
        <div className="home-header-content">
          <Link className="left-content" to="/home">
            <i className="fas fa-bars"></i>
            <div className="header-logo"></div>
          </Link>
          <div className="center-content">
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="home-header.specialty" />
                </b>
              </div>
              <div className="light-font">
                <FormattedMessage id="home-header.search-doctor" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="home-header.health-facility" />
                </b>
              </div>
              <div className="light-font">
                <FormattedMessage id="home-header.select-room" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="home-header.doctor" />
                </b>
              </div>
              <div className="light-font">
                <FormattedMessage id="home-header.select-doctor" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="home-header.fee" />
                </b>
              </div>
              <div className="light-font">
                <FormattedMessage id="home-header.check-health" />
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="support">
              <i className="fas fa-question"></i>
              <div>Hỗ trợ</div>
            </div>
            <div className="flags">
              <span
                className={`${this.props.language === 'vi' && 'active'}`}
                onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
              >
                VN
              </span>
              <span
                className={`${this.props.language === 'en' && 'active'}`}
                onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
              >
                EN
              </span>
            </div>
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
    dispatchChangeLanguage: (language) => dispatch(changeLanguageApp(language)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavbar)
