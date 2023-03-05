import React, { Component } from 'react'
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Specialty.scss'
import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpg'

class Specialty extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <div className="specialty">
        <div className="specialty-content">
          <div className="header">
            <span>Chuyên khoa phổ biến</span>
            <button>Xem thêm</button>
          </div>
          <div className="body">
            <Slider {...settings}>
              <div className="content">
                <div className="img"></div>
                <h3>Cơ xương khớp 1</h3>
              </div>
              <div className="content">
                <div className="img"></div>
                <h3>Cơ xương khớp 2</h3>
              </div>
              <div className="content">
                <div className="img"></div>
                <h3>Cơ xương khớp 3</h3>
              </div>
              <div className="content">
                <div className="img"></div>
                <h3>Cơ xương khớp 4</h3>
              </div>
              <div className="content">
                <div className="img"></div>
                <h3>Cơ xương khớp 5</h3>
              </div>
              <div className="content">
                <div className="img"></div>
                <h3>Cơ xương khớp 6</h3>
              </div>
            </Slider>
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
