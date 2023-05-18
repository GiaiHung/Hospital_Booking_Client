import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { CommonUtils } from '../../../utils'

class RemedyModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageBase64: '',
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  async handleUploadImage(e) {
    const file = e.target.files[0]

    if (file) {
      const base64 = await CommonUtils.getBase64(file)
      this.setState({
        imageBase64: base64,
      })
    }
  }

  handleSendRemedyFromModal = () => {
    this.props.handleSendRemedy(this.state.imageBase64)
  }

  render() {
    const { isOpenRemedy, dataModal, toggleRemedyModal } = this.props
    return (
      <div>
        <Modal
          isOpen={isOpenRemedy}
          centered={true}
          toggle={toggleRemedyModal}
          size="lg"
          className={'remedy-modal-container'}
        >
          <ModalHeader toggle={toggleRemedyModal}>Success billing</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={dataModal.email}
                  readOnly
                />
              </div>
              <div className="col-6 form-group">
                <label>Bill and prescription</label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={(e) => this.handleUploadImage(e)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-success"
              onClick={this.handleSendRemedyFromModal}
            >
              Send
            </button>
            <button className="btn btn-secondary" onClick={toggleRemedyModal}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal)
