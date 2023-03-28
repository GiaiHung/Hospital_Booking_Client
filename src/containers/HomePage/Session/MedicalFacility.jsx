import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Slider from 'react-slick'

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share-container">
        <div className="section-share">
          <div className="section-content">
            <div className="header">
              <span>
                <FormattedMessage id="home-section.medical-facility" />
              </span>
              <button>
                <FormattedMessage id="home-section.see-more" />
              </button>
            </div>
            <div className="body">
              <Slider {...this.props.settings}>
                <div className="content">
                  <div className="img facility-img"></div>
                  <h3>Trung tâm mindcare 1</h3>
                </div>
                <div className="content">
                  <div className="img facility-img"></div>
                  <h3>Trung tâm mindcare 2</h3>
                </div>
                <div className="content">
                  <div className="img facility-img"></div>
                  <h3>Trung tâm mindcare 3</h3>
                </div>
                <div className="content">
                  <div className="img facility-img"></div>
                  <h3>Trung tâm mindcare 4</h3>
                </div>
                <div className="content">
                  <div className="img facility-img"></div>
                  <h3>Trung tâm mindcare 5</h3>
                </div>
                <div className="content">
                  <div className="img facility-img"></div>
                  <h3>Trung tâm mindcare 6</h3>
                </div>
              </Slider>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
