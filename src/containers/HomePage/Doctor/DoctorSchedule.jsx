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
import { NumericFormat } from 'react-number-format'

import { LANGUAGES } from '../../../utils/constant'
import './DoctorSchedule.scss'
import BookingModal from './BookingModal'

class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDays: [],
      schedules: [],
      currentDate: '',
      isPriceDetailOpen: false,

      isModalOpen: false,
      modalData: {},
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

  handleScheduleClick(schedule) {
    this.setState({
      isModalOpen: true,
      modalData: schedule,
    })
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
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

    const { Doctor_Info } = this.props.doctor
    const { language } = this.props

    return (
      <>
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
                    <button
                      key={index}
                      className="schedule-btn"
                      onClick={() => this.handleScheduleClick(schedule)}
                    >
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
              <h4>{Doctor_Info?.nameClinic}</h4>
              <p>{Doctor_Info?.addressClinic}</p>
            </div>
            <div className="session">
              <h3 className="schedule-title">
                <FormattedMessage id="patient.detail-doctor.price" />:{' '}
                {language === LANGUAGES.EN ? (
                  <NumericFormat
                    value={Doctor_Info?.priceTypeData?.value_en}
                    suffix={'$'}
                    displayType="text"
                    thousandSeparator={true}
                  />
                ) : (
                  <NumericFormat
                    value={Doctor_Info?.priceTypeData?.value_vi}
                    suffix={'VNĐ'}
                    displayType="text"
                    thousandSeparator={true}
                  />
                )}
                .
              </h3>
              {!this.state.isPriceDetailOpen && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    this.setState({
                      isPriceDetailOpen: !this.state.isPriceDetailOpen,
                    })
                  }
                >
                  <FormattedMessage id="patient.detail-doctor.see-in-detail" />
                </button>
              )}
            </div>
            {this.state.isPriceDetailOpen && (
              <div className="mt-3">
                <div className="price-detail">
                  <div className="price-detail-left">
                    <h4>
                      <FormattedMessage id="patient.detail-doctor.payment" />
                    </h4>
                    <p>
                      <FormattedMessage id="patient.detail-doctor.priority" />{' '}
                      {Doctor_Info.priceTypeData.value_en} USD
                    </p>
                  </div>
                  <div>
                    {language === LANGUAGES.EN ? (
                      <NumericFormat
                        value={Doctor_Info?.priceTypeData?.value_en}
                        suffix={'$'}
                        displayType="text"
                        thousandSeparator={true}
                      />
                    ) : (
                      <NumericFormat
                        value={Doctor_Info?.priceTypeData?.value_vi}
                        suffix={'VNĐ'}
                        displayType="text"
                        thousandSeparator={true}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <p>
                    <FormattedMessage id="patient.detail-doctor.type_of_payment" />{' '}
                    {language === LANGUAGES.EN
                      ? Doctor_Info.paymentTypeData.value_en
                      : Doctor_Info.paymentTypeData.value_vi}
                  </p>
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      this.setState({
                        isPriceDetailOpen: !this.state.isPriceDetailOpen,
                      })
                    }
                  >
                    <FormattedMessage id="patient.detail-doctor.hide_price_detail" />
                  </button>
                </div>
              </div>
            )}
            {/* <div className="session">
              <h3 className="schedule-title">
                <FormattedMessage id="patient.detail-doctor.insurance" />
              </h3>
              <button className="btn btn-outline-secondary">
                <FormattedMessage id="patient.detail-doctor.see-in-detail" />
              </button>
            </div> */}
          </div>
        </div>
        <BookingModal
          isModalOpen={this.state.isModalOpen}
          scheduleData={this.state.modalData}
          doctorName={this.props.doctorName}
          toggleModal={this.toggleModal}
        />
      </>
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
