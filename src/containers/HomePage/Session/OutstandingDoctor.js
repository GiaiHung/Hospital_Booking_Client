import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import { fetchTopDoctor } from '../../../store/actions'
import { withRouter } from 'react-router-dom'

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topDoctors: [],
    }
  }

  componentDidMount() {
    this.props.loadTopDoctor()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        topDoctors: this.props.topDoctors,
      })
    }
  }

  handleViewDoctorDetail(doctor) {
    this.props.history.push(`detail-doctor/${doctor.id}`)
  }

  render() {
    return (
      <div className="section-share-container section-background">
        <div className="section-share">
          <div className="section-content">
            <div className="header">
              <span>
                <FormattedMessage id="home-section.outstanding-doctor" />
              </span>
              <button>
                <FormattedMessage id="home-section.see-more" />
              </button>
            </div>
            <div className="body">
              <Slider {...this.props.settings}>
                {this.state.topDoctors.length > 0 &&
                  this.state.topDoctors.map((doctor, index) => {
                    let image =
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKivqpXhVyCDAWt5orsRaQsJeJWk-yM8Ic4vZZYMsJ4-kxiHXuYClLy_5nnUPaZqeIWM&usqp=CAU'
                    if (doctor.image) {
                      image = new Buffer(doctor.image, 'base64').toString(
                        'binary'
                      )
                    }
                    const fullName =
                      this.props.language === 'vi'
                        ? doctor.lastName + ' ' + doctor.firstName
                        : doctor.firstName + ' ' + doctor.lastName
                    return (
                      <div className="content padding" key={index}>
                        <div
                          className="customize-border"
                          onClick={() => this.handleViewDoctorDetail(doctor)}
                        >
                          <div
                            className="img outstanding-doctor-img"
                            style={{
                              backgroundImage: `url(${image})`,
                              backgroundPosition: 'center',
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                            }}
                          ></div>
                          <h3>
                            {fullName}{' '}
                            {this.props.language === 'vi'
                              ? doctor.positionData.value_vi
                              : doctor.positionData.value_en}
                          </h3>
                          <p>Cơ xương khớp</p>
                        </div>
                      </div>
                    )
                  })}
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
    topDoctors: state.home.topDoctors,
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(fetchTopDoctor()),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
)
