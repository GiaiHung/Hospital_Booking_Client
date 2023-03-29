import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import './DoctorManage.scss'

const mdParser = new MarkdownIt()

class DoctorManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      selectedDoctor: '',
      contentHTML: '',
      contentMarkdown: '',
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    })
  }

  handleOnSelectDoctor = (selectedDoctor) => {
    this.setState({
      selectedDoctor,
    })
  }

  handleSaveContentMarkdown() {
    console.log('Check state', this.state)
  }

  render() {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ]

    return (
      <div className="doctor-manage-container">
        <div className="title">Create doctor info</div>
        <div className="doctor-manage-content">
          <div className="content-left">
            <label>Select doctor</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleOnSelectDoctor}
              options={options}
            />
          </div>
          <div className="content-right">
            <label>Describe doctor's information</label>
            <textarea
              rows="4"
              className="form-control"
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
          onChange={this.handleEditorChange}
        />
        <button
          className="btn btn-primary mt-3"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          Save changes
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage)
