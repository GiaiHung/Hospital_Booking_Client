import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios'
import './ClinicDetail.scss'
import HomeNavbar from '../HomePage/HomeNavbar'
import DoctorIntro from '../HomePage/Doctor/DoctorIntro'
import DoctorSchedule from '../HomePage/Doctor/DoctorSchedule'
import { LANGUAGES } from '../../utils'

class ClinicDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clinicDetail: {},
      doctorIdArray: [],
      doctors: [],
    }
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    if (id) {
      const res = await axios.get(`/api/v1/clinic/detail?id=${id}`)
      if (res.data.status === 'success') {
        const clinicDetail = res.data.data
        let imageBase64 = ''
        if (res.data.data.image) {
          imageBase64 = new Buffer(res.data.data.image, 'base64').toString(
            'binary'
          )
          clinicDetail.image = imageBase64
        }
        const doctorIdArray = res.data.data.doctorClinic.map((item) => {
          return item.doctorId
        })
        this.setState({
          doctorIdArray,
          clinicDetail,
        })
      }
    }

    // Get doctors by clinic
    const doctors = []
    this.state.doctorIdArray.map(async (id, index) => {
      const res = await axios.get(`/api/v1/doctor/${id}`)
      if (res.data.status === 'success') {
        doctors.push(res.data.data)
      }
      if (index === this.state.doctorIdArray.length - 1) {
        this.setState({
          doctors: doctors,
        })
      }
    })
  }

  render() {
    const { name, address, contentHTML, image } = this.state.clinicDetail
    const { doctors } = this.state

    return (
      <>
        <HomeNavbar />
        <div className="cd-container">
          <div className="cd-intro">
            <div
              className="cd-left"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <div className="cd-right">
              <h4>{name}</h4>
              <p>{address}</p>
            </div>
          </div>
          <div className="doctors">
            {doctors.length > 0 &&
              doctors.map((doctor, index) => {
                const { firstName, lastName, positionData } = doctor
                let name = ''
                name =
                  this.props.language === LANGUAGES.VI
                    ? positionData?.value_vi + ', ' + lastName + ' ' + firstName
                    : positionData?.value_en + ', ' + firstName + ' ' + lastName
                return (
                  <div
                    className="each-doctor"
                    key={index}
                    style={{ marginTop: '30px' }}
                  >
                    <div className="ds-left">
                      <DoctorIntro
                        doctor={doctor}
                        name={name}
                        isSpecialty={true}
                      />
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
          <div
            className="cd-detail"
            dangerouslySetInnerHTML={{
              __html: contentHTML,
            }}
            style={{ fontSize: '18px' }}
          ></div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDetail)
