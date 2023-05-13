import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { FormattedMessage } from 'react-intl'
import './DoctorManage.scss'

import { getAllDoctors, saveDoctor } from '../../../store/actions/doctorActions'
import { getDoctorDetail } from '../../../store/actions/doctorActions'
import { LANGUAGES, USER_REDUX_ACTIONS } from '../../../utils/constant'
import { fetchReduxData, getDoctorSpecialty } from '../../../store/actions'

const mdParser = new MarkdownIt()

class DoctorManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      selectedPrice: {},
      selectedProvince: {},
      selectedPayment: {},
      note: '',
      address: '',
      clinicName: '',
      clinicId: '',
      specialtyId: '',

      selectedDoctor: {},
      selectedSpecialty: {},
      selectedClinic: {},
      contentHTML: '',
      contentMarkdown: '',
      hasOldData: false,

      doctors: [],
      price: [],
      payment: [],
      province: [],
      specialty: [],
      clinic: [],
    }
  }

  componentDidMount() {
    this.props.getDoctors()
    this.props.getDoctorProvince()
    this.props.getDoctorPrice()
    this.props.getDoctorPayment()
    this.props.getSpecialty()
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.doctors !== this.props.doctors) {
      const doctors = this.handleSelectFormat(this.props.doctors, 'USER')
      this.setState({
        doctors,
      })
    }
    if (prevProps.province !== this.props.province) {
      const province = this.handleSelectFormat(this.props.province)
      this.setState({
        province,
      })
    }
    if (prevProps.price !== this.props.price) {
      const price = this.handleSelectFormat(this.props.price)
      this.setState({
        price,
      })
    }
    if (prevProps.payment !== this.props.payment) {
      const payment = this.handleSelectFormat(this.props.payment)
      this.setState({
        payment,
      })
    }
    if (prevProps.specialty !== this.props.specialty) {
      const specialty = this.handleSelectFormat(
        this.props.specialty,
        'specialty'
      )
      this.setState({
        specialty,
      })
    }
    if (prevProps.language !== this.props.language) {
      const doctors = this.handleSelectFormat(this.props.doctors, 'USER')
      const province = this.handleSelectFormat(this.props.province)
      const price = this.handleSelectFormat(this.props.price)
      const payment = this.handleSelectFormat(this.props.payment)
      const specialty = this.handleSelectFormat(
        this.props.specialty,
        'specialty'
      )
      this.setState({
        doctors,
        province,
        price,
        payment,
        specialty,
      })
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    })
  }

  handleOnSelectDoctor = async (selectedDoctor) => {
    this.setState({
      selectedDoctor,
    })
    const doctor = await getDoctorDetail(selectedDoctor.value)
    if (
      Object.values(doctor.Markdown).filter((element) => {
        return element !== null
      }).length > 0
    ) {
      if (
        Object.values(doctor.Doctor_Info).filter((element) => {
          return element !== null
        }).length > 0
      ) {
        const {
          priceTypeData,
          paymentTypeData,
          provinceTypeData,
          specialtyData,
        } = doctor.Doctor_Info
        const selectedPrice = this.state.price.find(
          (item) => item.value === priceTypeData.keyMap
        )
        const selectedPayment = this.state.payment.find(
          (item) => item.value === paymentTypeData.keyMap
        )
        const selectedProvince = this.state.province.find(
          (item) => item.value === provinceTypeData.keyMap
        )
        const selectedSpecialty = this.state.specialty.find(
          (item) => item.value === specialtyData.id
        )

        this.setState({
          description: doctor.Markdown.introduction,
          contentHTML: doctor.Markdown.contentHTML,
          contentMarkdown: doctor.Markdown.contentMarkdown,
          hasOldData: true,
          selectedPrice,
          selectedProvince,
          selectedPayment,
          selectedSpecialty,
          note: doctor.Doctor_Info.note,
          address: doctor.Doctor_Info.addressClinic,
          clinicName: doctor.Doctor_Info.nameClinic,
        })
      } else {
        this.setState({
          description: doctor.Markdown.introduction,
          contentHTML: doctor.Markdown.contentHTML,
          contentMarkdown: doctor.Markdown.contentMarkdown,
          hasOldData: true,
          selectedPrice: {},
          selectedProvince: {},
          selectedPayment: {},
          selectedSpecialty: {},
          selectedClinic: {},
          note: '',
          address: '',
          clinicName: '',
        })
      }
    } else {
      this.setState({
        description: '',
        contentHTML: '',
        contentMarkdown: '',
        hasOldData: false,
        selectedPrice: {},
        selectedProvince: {},
        selectedPayment: {},
        selectedSpecialty: {},
        note: '',
        address: '',
        clinicName: '',
      })
    }
  }

  handleSaveContentMarkdown = async () => {
    const {
      description,
      selectedDoctor,
      contentHTML,
      contentMarkdown,
      hasOldData,
      selectedPrice,
      selectedProvince,
      selectedPayment,
      selectedSpecialty,
      // selectedClinic,
      note,
      address,
      clinicName,
    } = this.state
    await this.props.saveDoctorDescription({
      description,
      selectedDoctor,
      contentHTML,
      contentMarkdown,
      action:
        hasOldData === true
          ? USER_REDUX_ACTIONS.EDIT
          : USER_REDUX_ACTIONS.CREATE,
      selectedPrice: selectedPrice.value,
      selectedProvince: selectedProvince.value,
      selectedPayment: selectedPayment.value,
      note,
      address,
      clinicName,
      specialtyId: selectedSpecialty.value,
      // clinicId: selectedClinic.value,
    })
    this.setState({
      description: '',
      selectedDoctor: {},
      contentHTML: '',
      contentMarkdown: '',
      hasOldData: false,
      selectedPrice: {},
      selectedProvince: {},
      selectedPayment: {},
      selectedSpecialty: {},
      note: '',
      address: '',
      clinicName: '',
    })
  }

  handleSelectFormat = (state, type) => {
    let array = []
    const language = this.props.language
    // Because specialty didn't create the vietnamese and english data
    if (type === 'specialty' && state.length > 0) {
      state.map((item) => {
        let object = {}
        object.label = item.name
        object.value = item.id
        array.push(object)
        return object
      })
      return array
    }
    if (state.length > 0) {
      state.map((item) => {
        let object = {}
        let label_vi =
          type === 'USER' ? item.lastName + ' ' + item.firstName : item.value_vi
        let label_en =
          type === 'USER' ? item.firstName + ' ' + item.lastName : item.value_en
        object.label = language === LANGUAGES.EN ? label_en : label_vi
        object.value = type === 'USER' ? item.id : item.keyMap
        array.push(object)
        return object
      })
    }
    return array
  }

  handleSelectDoctorInfor = async (selectedOption, name) => {
    const stateName = name.name
    const copyState = { ...this.state }
    copyState[stateName] = selectedOption
    this.setState({
      ...copyState,
    })
  }

  handleOnChangeText = (e, id) => {
    const copyState = { ...this.state }
    copyState[id] = e.target.value
    this.setState({ ...copyState })
  }

  render() {
    return (
      <div className="doctor-manage-container">
        <div className="title">
          <FormattedMessage id="manage-doctor.create" />
        </div>
        <div className="doctor-manage-content">
          <div className="content-left">
            <label>
              <FormattedMessage id="manage-doctor.select" />
            </label>
            <Select
              options={this.state.doctors}
              value={this.state.selectedDoctor}
              name={'selectedDoctor'}
              onChange={this.handleOnSelectDoctor}
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="manage-doctor.info" />
            </label>
            <textarea
              rows="4"
              className="form-control"
              value={this.state.description}
              onChange={(e) =>
                this.setState({
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
        <div className="doctor-manage-more-info row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.price" />
            </label>
            <Select
              placeholder={<FormattedMessage id="manage-doctor.price" />}
              value={this.state.selectedPrice}
              options={this.state.price}
              name="selectedPrice"
              onChange={this.handleSelectDoctorInfor}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.payment" />
            </label>
            <Select
              onChange={this.handleSelectDoctorInfor}
              value={this.state.selectedPayment}
              name="selectedPayment"
              options={this.state.payment}
              placeholder={<FormattedMessage id="manage-doctor.payment" />}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.province" />
            </label>
            <Select
              onChange={this.handleSelectDoctorInfor}
              value={this.state.selectedProvince}
              name="selectedProvince"
              options={this.state.province}
              placeholder={<FormattedMessage id="manage-doctor.province" />}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.clinic_name" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.clinicName}
              onChange={(e) => this.handleOnChangeText(e, 'clinicName')}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.address" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={(e) => this.handleOnChangeText(e, 'address')}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.note" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.note}
              onChange={(e) => this.handleOnChangeText(e, 'note')}
            />
          </div>
          {/* Specialty */}
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-doctor.specialty" />
            </label>
            <Select
              name="selectedSpecialty"
              placeholder={<FormattedMessage id="manage-doctor.specialty" />}
              value={this.state.selectedSpecialty}
              options={this.state.specialty}
              onChange={this.handleSelectDoctorInfor}
            />
          </div>
          {/* Clinic */}
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-doctor.clinic" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.clinic}
              onChange={(e) => this.handleOnChangeText(e, 'clinicId')}
            />
          </div>
        </div>
        <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          value={this.state.contentMarkdown}
          onChange={this.handleEditorChange}
        />
        <button
          className={`btn ${
            this.state.hasOldData ? 'btn-success' : 'btn-primary'
          } mt-3`}
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {this.state.hasOldData ? 'Save changes' : 'Create user'}
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    doctors: state.home.doctors,
    price: state.admin.price,
    payment: state.admin.payment,
    province: state.admin.province,
    specialty: state.admin.specialty,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctors: () => dispatch(getAllDoctors()),
    saveDoctorDescription: (data) => dispatch(saveDoctor(data)),
    getDoctorPrice: () => dispatch(fetchReduxData('price')),
    getDoctorPayment: () => dispatch(fetchReduxData('payment')),
    getDoctorProvince: () => dispatch(fetchReduxData('province')),
    getSpecialty: () => dispatch(getDoctorSpecialty()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage)
