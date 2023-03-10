import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaHeadSideVirus, FaTooth, FaMicroscope } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import './HomeHeader.scss'

class HomeHeader extends Component {
  handleChangeLanguage(language) {
    this.props.dispatchChangeLanguage(language)
  }
  render() {
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>
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
                <div>H??? tr???</div>
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
        <div className="home-banner">
          <div className="wrapper">
            <div className="upper">
              <div className="title">
                <h1>
                  <FormattedMessage id="home-banner.title1" />
                </h1>
                <h1 className="bold">
                  <FormattedMessage id="home-banner.title2" />
                </h1>
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search - T??m ki???m..." />
              </div>
            </div>
            <div className="below">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-banner.options1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-banner.options2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-notes-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-banner.options3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <FaMicroscope />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-banner.options4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <FaHeadSideVirus />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-banner.options5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <FaTooth />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home-banner.options6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
