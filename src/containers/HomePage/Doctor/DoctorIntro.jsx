import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LANGUAGES } from '../../../utils'

class DoctorIntro extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { language, name, isSpecialty } = this.props
    const { id, image, Markdown } = this.props.doctor
    let imageBase64 = ''
    if (image) {
      imageBase64 = new Buffer(image, 'base64').toString('binary')
    }
    return (
      <div
        className="intro"
        style={{
          margin: isSpecialty ? 'auto 0' : 'auto 100px',
          height: '100%',
        }}
      >
        {image && (
          <div
            className="intro-left"
            style={{
              backgroundImage: `url(${isSpecialty ? imageBase64 : image})`,
              backgroundPosition: 'left',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              width: isSpecialty ? '200px' : '',
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
          {isSpecialty && (
            <Link to={`/detail-doctor/${id}`}>
              <button className="btn btn-outline-primary">
                {language === LANGUAGES.EN ? 'All' : 'Xem thêm'}
              </button>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorIntro)
