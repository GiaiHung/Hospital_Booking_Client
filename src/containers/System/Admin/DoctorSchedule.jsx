import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
// import moment from 'moment'

import './DoctorSchedule.scss'
import {
  getAllDoctors,
  getDoctorSchedule,
} from '../../../store/actions/doctorActions'
import DatePicker from '../../../components/Input/DatePicker'

class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctors: [],
      doctorSchedule: [],
      selectedDoctor: {},
      currentDate: new Date(),
    }
  }

  componentDidMount() {
    this.props.getDoctors()
    this.props.getDoctorSchedule()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctors !== this.state.doctors) {
      this.setState({
        doctors: this.props.doctors,
      })
    }
    if (prevProps.doctorSchedule !== this.state.doctorSchedule) {
      this.setState({
        doctorSchedule: this.props.doctorSchedule,
      })
    }
  }

  handleOnSelectDoctor = async (selectedDoctor) => {
    this.setState({
      selectedDoctor,
    })
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    })
  }

  render() {
    let options = []
    const schedule = this.state.doctorSchedule
    if (this.state.doctors.length > 0) {
      options = this.state.doctors.reduce((prev, cur) => {
        const name =
          this.props.language === 'en'
            ? cur.firstName + ' ' + cur.lastName
            : cur.lastName + ' ' + cur.firstName
        prev.push({ id: cur.id, value: name.toLowerCase(), label: name })
        return prev
      }, [])
    }

    return (
      <div className="doctor-schedule-container">
        <div className="title">
          <FormattedMessage id="doctor-schedule.title" />
        </div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.choose-doctor" />
              </label>
              <Select onChange={this.handleOnSelectDoctor} options={options} />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.choose-date" />
              </label>
              <DatePicker
                className="form-control"
                selected={this.state.currentDate}
                minDate={new Date()}
                onChange={this.handleOnChangeDatePicker}
              />
            </div>
            <div className="col-12 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.choose-time" />
              </label>
              <div className="schedule">
                {schedule.length > 0 &&
                  schedule.map((item, index) => (
                    <button className="btn schedule-btn" key={index}>
                      {this.props.language === 'en'
                        ? item.value_en
                        : item.value_vi}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <button className="btn btn-primary mt-3">
            <FormattedMessage id="doctor-schedule.register" />
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctors: state.home.doctors,
    doctorSchedule: state.home.doctorSchedule,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctors: () => dispatch(getAllDoctors()),
    getDoctorSchedule: () => dispatch(getDoctorSchedule()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
