import React, { Component } from 'react'
import { connect } from 'react-redux'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import { toast } from 'react-toastify'
import axios from '../../../axios'
import './ClinicManage.scss'
import { CommonUtils, LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl'

const mdParser = new MarkdownIt()

class ClinicManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      imageBase64: '',
      contentHTML: '',
      contentMarkdown: '',
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    })
  }

  handleOnChangeInput = (value, field) => {
    const copyState = { ...this.state }
    copyState[field] = value
    this.setState({
      ...copyState,
    })
  }

  async handleUploadImage(e) {
    const file = e.target.files[0]

    if (file) {
      const base64 = await CommonUtils.getBase64(file)
      this.setState({
        imageBase64: base64,
      })
    }
  }

  handleSaveSpecialty = async () => {
    try {
      const res = await axios.post('/api/v1/clinic', { ...this.state })
      if (res.data.status === 'success') {
        toast.success(res.data.message)
      }
      this.setState({
        name: '',
        address: '',
        imageBase64: '',
        contentHTML: '',
        contentMarkdown: '',
      })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  render() {
    return (
      <div className="mc-container">
        <div className="title">
          <FormattedMessage id="manage-clinic.title" />
        </div>
        <div className="row mt-3">
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-clinic.name" />
            </label>
            <input
              placeholder={
                this.props.language === LANGUAGES.EN ? 'Name' : 'Tên phòng khám'
              }
              className="form-control"
              value={this.state.name}
              onChange={(e) => this.handleOnChangeInput(e.target.value, 'name')}
            />
          </div>
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-clinic.image" />
            </label>
            <input
              type="file"
              placeholder="Ảnh chuyên khoa"
              className="form-control-file"
              onChange={(e) => this.handleUploadImage(e)}
            />
          </div>
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-clinic.address" />
            </label>
            <input
              placeholder={
                this.props.language === LANGUAGES.EN ? 'Address' : 'Địa chỉ'
              }
              className="form-control"
              value={this.state.address}
              onChange={(e) =>
                this.handleOnChangeInput(e.target.value, 'address')
              }
            />
          </div>
        </div>
        <div className="mt-3">
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            value={this.state.contentMarkdown}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="btn btn-primary px-4 my-3"
          onClick={this.handleSaveSpecialty}
        >
          <FormattedMessage id="manage-clinic.save" />
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage)
