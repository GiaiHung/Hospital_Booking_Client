import React, { Component } from 'react'
import { connect } from 'react-redux'

class DoctorIntro extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { name } = this.props
    const { image, Markdown } = this.props.doctor
    let imageBase64 = ''
    if (image) {
      imageBase64 = new Buffer(image, 'base64').toString('binary')
    }
    return (
      <div
        className="intro"
        style={{
          margin: 'auto 0',
          height: '100%',
        }}
      >
        {image && (
          <div
            className="intro-left"
            style={{
              backgroundImage: `url(${imageBase64})`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              width: '30%',
              height: '150px',
            }}
          ></div>
        )}
        <div className="intro-right" style={{ width: '70%' }}>
          <div className="up">
            <h2>{name}</h2>
          </div>
          <div className="down">
            <p>{Markdown?.introduction}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorIntro)
