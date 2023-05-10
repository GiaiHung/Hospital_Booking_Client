import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios'
import HomeNavbar from '../../HomePage/HomeNavbar'
import DoctorSchedule from '../../HomePage/Doctor/DoctorSchedule'
import './DetailSpecialty.scss'
import { LANGUAGES } from '../../../utils'
import DoctorIntro from '../../HomePage/Doctor/DoctorIntro'

class DetailSpecialty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorIdArray: [21, 22],
      doctors: [],
    }
  }

  componentDidMount = () => {
    const array = []
    this.state.doctorIdArray.map(async (id, index) => {
      const res = await axios.get(`/api/v1/doctor/${id}`)
      if (res.data.status === 'success') {
        array.push(res.data.data)
      }
      if (index === this.state.doctorIdArray.length - 1) {
        this.setState({
          doctors: array,
        })
      }
    })
  }

  render() {
    const { doctors } = this.state
    return (
      <div className="ds-container">
        <HomeNavbar />
        <div className="ds-body">
          <div className="description"></div>
          {doctors.length > 0 &&
            doctors.map((doctor, index) => {
              const { firstName, lastName, positionData } = doctor
              let name = ''
              name =
                this.props.language === LANGUAGES.VI
                  ? positionData?.value_vi + ', ' + lastName + ' ' + firstName
                  : positionData?.value_en + ', ' + firstName + ' ' + lastName
              return (
                <div className="each-doctor" key={index}>
                  <div className="ds-left">
                    <DoctorIntro doctor={doctor} name={name} />
                  </div>
                  <div className="ds-right">
                    <DoctorSchedule
                      doctor={doctor}
                      doctorName={name}
                      column={true}
                    />
                  </div>
                </div>
              )
            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty)
