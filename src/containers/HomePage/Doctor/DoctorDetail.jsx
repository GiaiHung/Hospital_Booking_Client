import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DoctorDetail.scss'
import HomeNavbar from '../HomeNavbar'
import { getDoctorDetail } from '../../../store/actions/doctorActions'
import { LANGUAGES } from '../../../utils'
import DoctorSchedule from './DoctorSchedule'

class DoctorDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctor: {},
    }
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    if (id) {
      const doctor = await getDoctorDetail(id)
      this.setState({
        doctor,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const { firstName, lastName, image, positionData, Markdown } =
      this.state.doctor
    let name = ''
    if (this.state.doctor) {
      name =
        this.props.language === LANGUAGES.VI
          ? positionData?.value_vi + ', ' + lastName + ' ' + firstName
          : positionData?.value_en + ', ' + firstName + ' ' + lastName
    }
    return (
      <div>
        <HomeNavbar />
        <div className="doctor-detail-container">
          <div className="intro">
            {this.state.doctor && image && (
              <div
                className="left"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            )}
            <div className="right">
              <div className="up">
                <h2>{name}</h2>
              </div>
              <div className="down">
                <p>{Markdown?.introduction}</p>
              </div>
            </div>
          </div>
          <DoctorSchedule doctor={this.state.doctor} doctorName={name} />
          <div className="detail">
            <div
              dangerouslySetInnerHTML={{
                __html: Markdown?.contentHTML,
              }}
              className="content"
            ></div>
          </div>
          <div className="comment"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail)
