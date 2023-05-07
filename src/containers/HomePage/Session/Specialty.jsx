import React, { Component } from 'react'
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Slider from 'react-slick'
import axios from '../../../axios'

class Specialty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specialties: [],
    }
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get('/api/v1/specialty')
      if (res.data.status === 'success') {
        this.setState({
          specialties: res.data.data,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="section-share-container section-background">
        <div className="section-share">
          <div className="section-content">
            <div className="header">
              <span>
                <FormattedMessage id="home-section.popular-specialty" />
              </span>
              <button>
                <FormattedMessage id="home-section.see-more" />
              </button>
            </div>
            <div className="body">
              <Slider {...this.props.settings}>
                {this.state.specialties.length > 0 &&
                  this.state.specialties.map((specialty) => {
                    const { id, name, image } = specialty
                    return (
                      <div className="content" key={id}>
                        <div
                          className="img"
                          style={{
                            backgroundImage: `url(${image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                          }}
                        ></div>
                        <h3>{name}</h3>
                      </div>
                    )
                  })}
                {/* <div className="content">
                  <div className="img specialty-img"></div>
                  <h3>Cơ xương khớp 2</h3>
                </div>
                <div className="content">
                  <div className="img specialty-img"></div>
                  <h3>Cơ xương khớp 3</h3>
                </div>
                <div className="content">
                  <div className="img specialty-img"></div>
                  <h3>Cơ xương khớp 4</h3>
                </div>
                <div className="content">
                  <div className="img specialty-img"></div>
                  <h3>Cơ xương khớp 5</h3>
                </div>
                <div className="content">
                  <div className="img specialty-img"></div>
                  <h3>Cơ xương khớp 6</h3>
                </div> */}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Specialty)
