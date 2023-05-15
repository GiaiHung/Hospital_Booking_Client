import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
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
      doctorIdArray: [],
      doctors: [],
      provinces: [],
      specialty: {},
    }
  }

  componentDidMount = async () => {
    this.getSpecialty('ALL')
    // Get list province
    const resProvince = await axios.get('/api/v1/allcode?type=province')
    if (resProvince.data.status === 'success') {
      const provinces = resProvince.data.data
      provinces.unshift({
        keyMap: 'ALL',
        type: 'PROVINCE',
        value_en: 'All',
        value_vi: 'Toàn quốc',
      })
      this.setState({
        provinces,
      })
    }
  }

  getSpecialty = async (location) => {
    const id = this.props.match.params.id
    if (id) {
      // Get detail specialty
      const res = await axios.get(
        `/api/v1/specialty/detail?id=${id}&location=${location}`
      )
      if (res.data.status === 'success') {
        const doctorIdArray = res.data.data.doctorSpecialty.map((item) => {
          return item.doctorId
        })
        this.setState({
          doctorIdArray,
          specialty: res.data.data,
        })
      }

      // Get doctors by specialty
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
  }

  handleSearchByProvince = async (value) => {
    await this.getSpecialty(value)
  }

  render() {
    const { doctors, specialty, provinces } = this.state
    const { language } = this.props
    const provincesFormatted =
      provinces.length > 0
        ? provinces.map((province) => {
            const object = {}
            object.value = province.keyMap
            object.label =
              language === LANGUAGES.EN ? province.value_en : province.value_vi
            return object
          })
        : []
    const customStyles = {
      control: (baseStyles, state) => ({
        ...baseStyles,
        width: 200,
      }),
    }

    return (
      <div className="ds-container">
        <HomeNavbar />
        <div className="ds-body">
          <div
            dangerouslySetInnerHTML={{
              __html: specialty?.contentHTML,
            }}
            className="description"
          ></div>
          <div className="ds-search-by-province mb-3">
            {provinces.length > 0 && (
              <Select
                options={provincesFormatted}
                styles={customStyles}
                defaultValue={provincesFormatted[0]}
                onChange={(e) => this.handleSearchByProvince(e.value)}
              />
            )}
          </div>
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
                    <DoctorIntro
                      doctor={doctor}
                      name={name}
                      isSpecialty={true}
                    />
                  </div>
                  <div className="ds-right" style={{ marginLeft: '20px' }}>
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
