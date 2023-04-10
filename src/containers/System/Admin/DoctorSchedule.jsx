import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import * as _ from 'lodash'
import { toast } from 'react-toastify'

import './DoctorSchedule.scss'
import {
  getAllDoctors,
  getDoctorSchedule,
} from '../../../store/actions/doctorActions'
import DatePicker from '../../../components/Input/DatePicker'
import axios from '../../../axios'

class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctors: [],
      doctorSchedule: [],
      selectedDoctor: {},
      currentDate: '',
    }
  }

  componentDidMount() {
    this.props.getDoctors()
    this.props.getDoctorSchedule()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctors !== this.props.doctors) {
      this.setState({
        doctors: this.props.doctors,
      })
    }
    if (prevProps.doctorSchedule !== this.props.doctorSchedule) {
      let schedule = this.props.doctorSchedule
      if (schedule.length > 0) {
        schedule = schedule.map((item) => ({ ...item, isSelected: false }))
      }
      this.setState({
        doctorSchedule: schedule,
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

  handleSelectSchedule(index) {
    let schedule = this.state.doctorSchedule
    schedule[index].isSelected = !schedule[index].isSelected
    this.setState({
      doctorSchedule: schedule,
    })
  }

  async handleSaveSchedule() {
    const { currentDate, selectedDoctor, doctorSchedule } = this.state
    let result = []
    if (_.isEmpty(selectedDoctor)) {
      toast.error('Please select a doctor')
      return
    }
    if (!currentDate) {
      toast.error('Invalid current date')
      return
    }
    const formattedDate = new Date(currentDate).getTime()

    if (doctorSchedule.length > 0) {
      const selectedSchedule = doctorSchedule.filter(
        (schedule) => schedule.isSelected === true
      )
      if (selectedSchedule.length > 0) {
        selectedSchedule.map((schedule) => {
          const object = {}
          object.doctorId = selectedDoctor.id
          object.date = formattedDate
          object.timeType = schedule.keyMap
          object.maxNumber = 10
          return result.push(object)
        })
      } else {
        toast.error('Please select at least one schedule')
      }
    }

    try {
      const res = await axios.post('/api/v1/doctor/schedule', {
        arrSchedule: result,
        doctorId: selectedDoctor.id,
        date: formattedDate,
      })
      if (res.data.status === 'success') {
        toast.success('Schedule successfully created')
      }
    } catch (error) {
      toast.warn('Sorry, doctor may have already been scheduled')
    }

    this.setState({
      selectedDoctor: {},
      currentDate: '',
      doctorSchedule: doctorSchedule.map((schedule) => ({
        ...schedule,
        isSelected: false,
      })),
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
              <Select
                onChange={this.handleOnSelectDoctor}
                value={this.state.selectedDoctor}
                options={options}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="doctor-schedule.choose-date" />
              </label>
              <DatePicker
                className="form-control"
                selected={this.state.currentDate}
                value={this.state.currentDate}
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
                    <button
                      className={`btn schedule-btn ${
                        this.state.doctorSchedule[index].isSelected
                          ? 'schedule-btn-active'
                          : ''
                      }`}
                      key={index}
                      onClick={() => this.handleSelectSchedule(index)}
                    >
                      {this.props.language === 'en'
                        ? item.value_en
                        : item.value_vi}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={() => this.handleSaveSchedule()}
          >
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
