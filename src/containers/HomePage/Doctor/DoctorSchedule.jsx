import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import moment from 'moment'
import axios from '../../../axios'
// Don't use but have to import to notify moment we using vietnamese
import localization from 'moment/locale/vi' // eslint-disable-line
import { AiOutlineSchedule } from 'react-icons/ai'
import { BsHandIndex } from 'react-icons/bs'
import { FormattedMessage } from 'react-intl'

import { LANGUAGES } from '../../../utils/constant'
import './DoctorSchedule.scss'

class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDays: [],
      schedules: [],
      currentDate: '',
    }
  }

  async componentDidMount() {
    const allDays = await this.setArrDate()
    this.setState({
      allDays,
      currentDate: allDays[0].value,
    })
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      const allDays = await this.setArrDate()
      this.setState({
        allDays,
      })
    }
  }

  setArrDate = async () => {
    let arrDate = []
    for (let i = 0; i < 7; i++) {
      const date = {}
      if (this.props.language === LANGUAGES.EN) {
        if (i === 0) {
          const ddMM = moment(new Date()).format('DD/MM')
          date.label = `Today - ${ddMM}`
        } else {
          date.label = moment(new Date())
            .add(i, 'days')
            .locale(LANGUAGES.EN)
            .format('ddd - DD/MM')
        }
      } else {
        if (i === 0) {
          const ddMM = moment(new Date()).format('DD/MM')
          date.label = `Hôm nay - ${ddMM}`
        } else {
          date.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
        }
      }
      date.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
      arrDate.push(date)
    }
    return arrDate
  }

  getScheduleByDate = async (date) => {
    const id = this.props.doctor.id
    let res
    if (id) {
      res = await axios.get(
        `/api/v1/doctor/get-schedule-by-date?doctorId=${id}&date=${date}`
      )
      if (res.data.status === 'success') {
        this.setState({
          schedules: res.data.data,
          currentDate: date,
        })
        return res.data
      }
    }
  }

  render() {
    const allDaysFormatted = this.state.allDays.map((day) => {
      const copyDay = { ...day }
      copyDay.label = day.label.charAt(0).toUpperCase() + day.label.slice(1)
      return copyDay
    })

    const customStyles = {
      control: (baseStyles, state) => ({
        ...baseStyles,
        width: 200,
      }),
    }

    return (
      <div className="schedule-container">
        {/* LEFT - ALL SCHEDULE */}
        <div className="left">
          <Select
            options={allDaysFormatted}
            styles={customStyles}
            onChange={(e) => this.getScheduleByDate(e.value)}
          />
          <div className="left-title">
            <div className="icon">
              <AiOutlineSchedule />
            </div>
            <FormattedMessage id="patient.detail-doctor.schedule" />
          </div>
          <div className="left-content">
            {this.state.schedules.length > 0 ? (
              <div className="schedule">
                {this.state.schedules.map((schedule, index) => (
                  <button key={index} className="schedule-btn">
                    {this.props.language === LANGUAGES.EN
                      ? schedule.timeTypeData.value_en
                      : schedule.timeTypeData.value_vi}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
          <div className="mt-3">
            Chọn <BsHandIndex /> và đặt (Phí đặt lịch 0đ)
          </div>
        </div>
        {/* RIGHT - ADDRESS AND PRICE */}
        <div className="right">
          <div className="address">
            <h3 className="schedule-title">
              <FormattedMessage id="patient.detail-doctor.address" />
            </h3>
            <h4>Phòng khám Chuyên khoa Da Liễu</h4>
            <p>207 Phố Huế - Hai Bà Trưng - Hà Nội</p>
          </div>
          <div className="session">
            <h3 className="schedule-title">
              <FormattedMessage id="patient.detail-doctor.price" />: 300.000đ.
            </h3>
            <button className="btn btn-outline-secondary">
              <FormattedMessage id="patient.detail-doctor.see-in-detail" />
            </button>
          </div>
          <div className="session">
            <h3 className="schedule-title">
              <FormattedMessage id="patient.detail-doctor.insurance" />
            </h3>
            <button className="btn btn-outline-secondary">
              <FormattedMessage id="patient.detail-doctor.see-in-detail" />
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
