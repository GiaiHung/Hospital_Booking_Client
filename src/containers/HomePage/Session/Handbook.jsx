import React, { Component } from 'react'
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import Slider from 'react-slick'

class Handbook extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="section-share-container">
        <div className="section-share">
          <div className="section-content">
            <div className="header">
              <span>Cẩm nang</span>
              <button>Xem thêm</button>
            </div>
            <div className="body">
              <Slider {...this.props.settings}>
                <div className="content">
                  <div className="img handbook-img"></div>
                  <h3>Cơ xương khớp 1</h3>
                </div>
                <div className="content">
                  <div className="img handbook-img"></div>
                  <h3>Cơ xương khớp 2</h3>
                </div>
                <div className="content">
                  <div className="img handbook-img"></div>
                  <h3>Cơ xương khớp 3</h3>
                </div>
                <div className="content">
                  <div className="img handbook-img"></div>
                  <h3>Cơ xương khớp 4</h3>
                </div>
                <div className="content">
                  <div className="img handbook-img"></div>
                  <h3>Cơ xương khớp 5</h3>
                </div>
                <div className="content">
                  <div className="img handbook-img"></div>
                  <h3>Cơ xương khớp 6</h3>
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Handbook)
