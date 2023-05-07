import React, { Component } from 'react'
import { connect } from 'react-redux'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import { toast } from 'react-toastify'
import axios from '../../../axios'
import './SpecialtyManage.scss'
import { CommonUtils } from '../../../utils'

const mdParser = new MarkdownIt()

class SpecialtyManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
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
      const res = await axios.post('/api/v1/specialty', { ...this.state })
      if (res.data.status === 'success') {
        toast.success(res.data.message)
      }
      this.setState({
        name: '',
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
      <div className="ms-container">
        <div className="title">Create specialty</div>
        <div className="ms-add">
          <button className="d-flex btn btn-primary">
            <span>+</span>
            <span className="ml-2">Add new</span>
          </button>
        </div>
        <div className="row mt-3">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input
              placeholder="Tên chuyên khoa"
              className="form-control"
              value={this.state.name}
              onChange={(e) => this.handleOnChangeInput(e.target.value, 'name')}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
            <input
              type="file"
              placeholder="Ảnh chuyên khoa"
              className="form-control-file"
              onChange={(e) => this.handleUploadImage(e)}
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
        <button className="btn btn-primary" onClick={this.handleSaveSpecialty}>
          Save
        </button>
        <div className="ms-all"></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage)
