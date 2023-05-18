import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'
import LoadingOverlay from 'react-loading-overlay'

import axios from '../../../axios'
import DatePicker from '../../../components/Input/DatePicker'
import './PatientManage.scss'
import { LANGUAGES } from '../../../utils'
import RemedyModal from './RemedyModal'

class PatientManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: new Date(),
      patients: [],
      isOpenRemedy: false,
      dataModal: {},
      isLoading: false,
    }
  }

  getPatientsData = async (date, isOriginal) => {
    const { user } = this.props
    this.setState({
      currentDate: isOriginal ? date[0] : date,
    })
    const timestamps = new Date(this.state.currentDate).getTime().toString()
    try {
      const res = await axios.get(
        `/api/v1/doctor/patient-list?doctorId=${user.id}&date=${timestamps}`
      )
      if (res.data.status === 'success') {
        this.setState({
          patients: res.data.data,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleOnChangeDatePicker = async (date) => {
    await this.getPatientsData(date, true)
  }

  handleConfirm = async (item) => {
    const data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      name: item.patientData.firstName,
      email: item.patientData.email,
      timeType: item.timeType,
    }
    this.toggleRemedyModal(data)
  }

  toggleRemedyModal = (item) => {
    this.setState({
      isOpenRemedy: !this.state.isOpenRemedy,
      dataModal: item,
    })
  }

  handleSendRemedy = async (imageBase64) => {
    const { name, email, doctorId, patientId, timeType } = this.state.dataModal
    this.setState({
      isLoading: true,
    })

    const res = await axios.post(`/api/v1/doctor/send-remedy`, {
      name,
      email,
      doctorId,
      patientId,
      timeType,
      language: this.props.language,
      imageBase64,
    })
    if (res.data.status === 'success') {
      await this.getPatientsData(this.state.currentDate, false)
      this.setState({
        isLoading: false,
      })
      this.toggleRemedyModal({})
      toast.success(res.data.message)
    } else {
      toast.error('Something went wrong. Please try again')
    }
  }

  render() {
    const { patients, isOpenRemedy, isLoading } = this.state
    const { language } = this.props
    return (
      <LoadingOverlay
        active={isLoading}
        spinner
        text="Loading. Please wait..."
        className="overlay"
      >
        <div className="patient-manage-container">
          <div className="title">
            <FormattedMessage id="manage-patient.title" />
          </div>
          <div className="p-m-body">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-patient.select-date" />
              </label>
              <DatePicker
                className="form-control"
                selected={this.state.currentDate}
                value={this.state.currentDate}
                onChange={this.handleOnChangeDatePicker}
              />
            </div>
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <FormattedMessage id="manage-patient.time" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-patient.name" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-patient.address" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-patient.gender" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-patient.actions" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient, index) => {
                    const { firstName, address, genderData } =
                      patient.patientData
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{patient.date}</td>
                        <td>{firstName}</td>
                        <td>{address}</td>
                        <td>
                          {language === LANGUAGES.EN
                            ? genderData.value_en
                            : genderData.value_vi}
                        </td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => this.handleConfirm(patient)}
                          >
                            <FormattedMessage id="manage-patient.confirm" />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <RemedyModal
            dataModal={this.state.dataModal}
            isOpenRemedy={isOpenRemedy}
            toggleRemedyModal={this.toggleRemedyModal}
            handleSendRemedy={this.handleSendRemedy}
          />
        </div>
      </LoadingOverlay>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientManage)
