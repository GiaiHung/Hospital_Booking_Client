import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'reactstrap'
import { FaTimes } from 'react-icons/fa'
import * as _ from 'lodash'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import { toast } from 'react-toastify'

import './BookingModal.scss'
import DoctorInfo from './DoctorInfo'
import DatePicker from '../../../components/Input/DatePicker'
import { fetchReduxData } from '../../../store/actions/adminActions'
import { LANGUAGES } from '../../../utils'
import axios from '../../../axios'
import moment from 'moment'

class BookingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      phone: '',
      email: '',
      reasons: '',
      gender: {},
      genders: [],
      birthday: '',
      doctorId: '',
      timeType: '',
    }
  }

  componentDidMount() {
    this.props.getGenders()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gendersRedux !== this.props.gendersRedux) {
      this.setState({
        genders: this.buildDataGender(this.props.gendersRedux),
      })
    }

    if (prevProps.language !== this.props.language) {
      this.setState({
        genders: this.buildDataGender(this.props.gendersRedux),
      })
    }

    if (prevProps.scheduleData !== this.props.scheduleData) {
      const scheduleData = this.props.scheduleData
      if (!_.isEmpty(scheduleData)) {
        this.setState({
          doctorId: scheduleData.doctorId,
          timeType: scheduleData.timeType,
          date: scheduleData.date,
        })
      }
    }
  }

  handleOnChangeInput(e, id) {
    const copyState = { ...this.state }
    copyState[id] = e.target.value
    this.setState({ ...copyState })
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    })
  }

  buildDataGender = (data) => {
    let result = []
    const language = this.props.language
    if (data.length > 0) {
      result = data.map((item) => {
        const object = {}
        object.label = language === LANGUAGES.VI ? item.value_vi : item.value_en
        object.value = item.keyMap
        return object
      })
    }
    return result
  }

  handleOnSelectGender = (selectedGender) => {
    this.setState({
      gender: selectedGender,
    })
  }

  convertTimeBooking = () => {
    const { language, scheduleData } = this.props
    const dateFormatted =
      language === LANGUAGES.EN
        ? moment(new Date(Number(scheduleData.date) + 1))
            .locale(LANGUAGES.EN)
            .format('dddd - MM/DD/YYYY')
        : moment(new Date(Number(scheduleData.date) + 1)).format(
            'ddd - DD/MM/YYYY'
          )
    const time =
      language === LANGUAGES.VI
        ? scheduleData.timeTypeData.value_vi
        : scheduleData.timeTypeData.value_en
    const dateAndTime = time + ' - ' + dateFormatted
    return dateAndTime
  }

  handleConfirmBooking = async () => {
    const { name, email, timeType, gender, address, phone, reasons, doctorId } =
      this.state
    const { date } = this.props.scheduleData
    const formattedDate = this.convertTimeBooking()
    const res = await axios.post('/api/v1/patient/booking-appointment', {
      name,
      email,
      doctorId,
      doctorName: this.props.doctorName,
      timeType,
      date: formattedDate,
      time: date,
      gender: gender.value,
      address,
      phone,
      reasons,
      language: this.props.language,
    })
    this.props.toggleModal()
    if (res.data.status === 'success') {
      toast.success('Appointment successfully booked')
    } else {
      toast.error('Appointment booking failed, please try again later')
    }
  }

  render() {
    const { scheduleData } = this.props
    let id = ''
    if (!_.isEmpty(scheduleData)) {
      id = scheduleData.doctorId
    }

    return (
      <div>
        <Modal
          isOpen={this.props.isModalOpen}
          centered={true}
          toggle={this.props.toggleModal}
          size="lg"
          className={'booking-modal-container'}
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="title">
                <FormattedMessage id="patient.booking-modal.info" />
              </span>
              <span className="close-btn" onClick={this.props.toggleModal}>
                <FaTimes />
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-info">
                <DoctorInfo doctorId={id} scheduleData={scheduleData} />
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.handleOnChangeInput(e, 'name')}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.phone" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.phone}
                    onChange={(e) => this.handleOnChangeInput(e, 'phone')}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(e) => this.handleOnChangeInput(e, 'address')}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.email" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    onChange={(e) => this.handleOnChangeInput(e, 'email')}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.reasons" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.reasons}
                    onChange={(e) => this.handleOnChangeInput(e, 'reasons')}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.gender" />
                  </label>
                  <Select
                    options={this.state.genders}
                    value={this.state.gender}
                    onChange={this.handleOnSelectGender}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.birthday" />
                  </label>
                  <DatePicker
                    className="form-control"
                    selected={this.state.birthday}
                    value={this.state.birthday}
                    onChange={this.handleOnChangeDatePicker}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn btn-success"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id="patient.booking-modal.confirm" />
              </button>
              <button
                className="btn btn-danger"
                onClick={this.props.toggleModal}
              >
                <FormattedMessage id="patient.booking-modal.cancel" />
              </button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gendersRedux: state.admin.genders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(fetchReduxData('gender')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)
