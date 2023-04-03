import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaHeadSideVirus, FaTooth, FaMicroscope } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'
import './HomeHeader.scss'
import HomeNavbar from './HomeNavbar'

class HomeHeader extends Component {
  render() {
    return (
      <>
        <HomeNavbar />
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
                <input type="text" placeholder="Search - Tìm kiếm..." />
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
