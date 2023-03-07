import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

class OutstandingDoctor extends Component {
  render() {
    return (
      <div className="section-share-container section-background">
        <div className="section-share">
          <div className="section-content">
            <div className="header">
              <span>Bác sĩ nổi bật tuần qua</span>
              <button>Xem thêm</button>
            </div>
            <div className="body">
              <Slider {...this.props.settings}>
                <div className="content padding">
                  <div className="customize-border">
                    <div className="img outstanding-doctor-img"></div>
                    <h3>Giáo sự, tiến sĩ 1</h3>
                    <p>Cơ xương khớp</p>
                  </div>
                </div>
                <div className="content padding">
                  <div className="customize-border">
                    <div className="img outstanding-doctor-img"></div>
                    <h3>Giáo sự, tiến sĩ 2</h3>
                    <p>Cơ xương khớp</p>
                  </div>
                </div>
                <div className="content padding">
                  <div className="customize-border">
                    <div className="img outstanding-doctor-img"></div>
                    <h3>Giáo sự, tiến sĩ 3</h3>
                    <p>Cơ xương khớp</p>
                  </div>
                </div>
                <div className="content padding">
                  <div className="customize-border">
                    <div className="img outstanding-doctor-img"></div>
                    <h3>Giáo sự, tiến sĩ 4</h3>
                    <p>Cơ xương khớp</p>
                  </div>
                </div>
                <div className="content padding">
                  <div className="customize-border">
                    <div className="img outstanding-doctor-img"></div>
                    <h3>Giáo sự, tiến sĩ 5</h3>
                    <p>Cơ xương khớp</p>
                  </div>
                </div>
                <div className="content padding">
                  <div className="customize-border">
                    <div className="img outstanding-doctor-img"></div>
                    <h3>Giáo sự, tiến sĩ 6</h3>
                    <p>Cơ xương khớp</p>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
