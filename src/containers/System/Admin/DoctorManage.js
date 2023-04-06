import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import './DoctorManage.scss'

import { getAllDoctors, saveDoctor } from '../../../store/actions/doctorActions'
import { getDoctorDetail } from '../../../store/actions/doctorActions'
import { USER_REDUX_ACTIONS } from '../../../utils/constant'

const mdParser = new MarkdownIt()

class DoctorManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      selectedDoctor: '',
      contentHTML: '',
      contentMarkdown: '',
      hasOldData: false,

      doctors: [],
    }
  }

  componentDidMount() {
    this.props.getDoctors()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctors !== this.state.doctors) {
      this.setState({
        doctors: this.props.doctors,
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
    const doctor = await getDoctorDetail(selectedDoctor.id)
    if (
      Object.values(doctor.Markdown).filter((element) => {
        return element !== null
      }).length > 0
    ) {
      this.setState({
        description: doctor.Markdown.introduction,
        contentHTML: doctor.Markdown.contentHTML,
        contentMarkdown: doctor.Markdown.contentMarkdown,
        hasOldData: true,
      })
    } else {
      this.setState({
        description: '',
        contentHTML: '',
        contentMarkdown: '',
        hasOldData: false,
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
    })
    this.setState({
      description: '',
      selectedDoctor: '',
      contentHTML: '',
      contentMarkdown: '',
      hasOldData: false,
    })
  }

  render() {
    let options = []
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
      <div className="doctor-manage-container">
        <div className="title">Create doctor info</div>
        <div className="doctor-manage-content">
          <div className="content-left">
            <label>Select doctor</label>
            <Select onChange={this.handleOnSelectDoctor} options={options} />
          </div>
          <div className="content-right">
            <label>Describe doctor's information</label>
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
    doctors: state.home.doctors,
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctors: () => dispatch(getAllDoctors()),
    saveDoctorDescription: (data) => dispatch(saveDoctor(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage)
