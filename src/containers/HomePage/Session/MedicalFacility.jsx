import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import axios from '../../../axios'

class MedicalFacility extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clinics: [],
    }
  }
  async componentDidMount() {
    const res = await axios.get('/api/v1/clinic')
    if (res.data.status === 'success') {
      this.setState({
        clinics: res.data.data,
      })
    }
  }

  render() {
    const { clinics } = this.state
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
                {clinics.length > 0 &&
                  clinics.map((clinic) => {
                    let imageBase64 = ''
                    if (clinic.image) {
                      imageBase64 = new Buffer(clinic.image, 'base64').toString(
                        'binary'
                      )
                    }
                    return (
                      <Link to={`/detail-clinic/${clinic.id}`} key={clinic.id}>
                        <div className="content">
                          <div
                            className="img"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                              backgroundPosition: 'center',
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                            }}
                          ></div>
                          <h3>{clinic.name}</h3>
                        </div>
                      </Link>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
