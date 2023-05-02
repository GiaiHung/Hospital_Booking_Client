import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { NumericFormat } from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
// Don't use but have to import to notify moment we using vietnamese
import localization from 'moment/locale/vi' // eslint-disable-line
import './DoctorInfo.scss'
import { LANGUAGES } from '../../../utils'
import axios from '../../../axios'

class DoctorInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorInfo: {},
    }
  }

  async componentDidMount() {
    const doctorId = this.props.doctorId
    if (doctorId) {
      const res = await axios.get(`/api/v1/doctor/doctor-info?id=${doctorId}`)
      if (res.data.status === 'success') {
        const doctorInfo = res.data.data
        let imageBase64 = ''
        if (doctorInfo.image) {
          imageBase64 = new Buffer(doctorInfo.image, 'base64').toString(
            'binary'
          )
        }
        doctorInfo.image = imageBase64
        this.setState({
          doctorInfo,
        })
      }
    }
  }

  render() {
    const { doctorInfo } = this.state
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
    let name,
      price = ''
    if (!_.isEmpty(doctorInfo)) {
      const { positionData, lastName, firstName, Doctor_Info } = doctorInfo
      name =
        language === LANGUAGES.VI
          ? positionData?.value_vi + ', ' + lastName + ' ' + firstName
          : positionData?.value_en + ', ' + firstName + ' ' + lastName
      price =
        language === LANGUAGES.EN ? (
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
        )
    }

    return (
      <div className="intro">
        {doctorInfo && doctorInfo.image && (
          <div
            className="left"
            style={{
              backgroundImage: `url(${doctorInfo.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        )}
        <div className="right">
          <div className="info">
            <h3 className="title">
              <FormattedMessage id="patient.booking-modal.booking" />
            </h3>
            <h3 className="name">{name}</h3>
            <h3 className="date">{dateAndTime}</h3>
          </div>
          <div className="price">
            <h3>
              <FormattedMessage id="patient.booking-modal.price" />: {price}
            </h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo)
