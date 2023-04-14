import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import moment from 'moment'
import axios from '../../../axios'
// Don't use but have to import to notify moment we using vietnamese
import localization from 'moment/locale/vi' // eslint-disable-line

import { LANGUAGES } from '../../../utils/constant'
import './DoctorSchedule.scss'

class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDays: [],
    }
  }

  componentDidMount() {
    this.setArrDate()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDays !== this.props.allDays) {
      this.setArrDate()
    }
  }

  setArrDate = async () => {
    let arrDate = []
    for (let i = 0; i < 7; i++) {
      const date = {}
      if (this.props.language === LANGUAGES.EN) {
        date.label = moment(new Date())
          .add(i, 'days')
          .locale(LANGUAGES.EN)
          .format('ddd - DD/MM')
      } else {
        date.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
      }
      date.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
      arrDate.push(date)
    }

    this.setState({
      allDays: arrDate,
    })
  }

  getScheduleByDate = async (date) => {
    const id = this.props.doctor.id
    if (id) {
      const res = await axios.get(
        `/api/v1/doctor/get-schedule-by-date?doctorId=${id}&date=${date}`
      )
      console.log(res.data)
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
        </div>
        {/* RIGHT - ADDRESS AND PRICE */}
        <div className="right">
          <div className="address">
            <h3 className="schedule-title">ĐỊA CHỈ KHÁM</h3>
            <h4>Phòng khám Chuyên khoa Da Liễu</h4>
            <p>207 Phố Huế - Hai Bà Trưng - Hà Nội</p>
          </div>
          <div className="session">
            <h3 className="schedule-title">GIÁ KHÁM: 300.000đ.</h3>
            <button className="btn btn-outline-secondary">Xem chi tiết</button>
          </div>
          <div className="session">
            <h3 className="schedule-title">LOẠI BẢO HIỂM ÁP DỤNG.</h3>
            <button className="btn btn-outline-secondary">Xem chi tiết</button>
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
