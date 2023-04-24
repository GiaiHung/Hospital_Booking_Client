import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'reactstrap'
import './BookingModal.scss'
import { FaTimes } from 'react-icons/fa'

class BookingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
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
              <span className="title">Thông tin đặt lịch khám bệnh</span>
              <span className="close-btn" onClick={this.props.toggleModal}>
                <FaTimes />
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-info"></div>
              <div className="row">
                <div className="col-6 form-group">
                  <label>Họ và tên</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Số điện thoại</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Địa chỉ</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Email</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-12 form-group">
                  <label>Lý do khám</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Giới tính</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Đặt cho ai</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button className="btn btn-success">Xác nhận</button>
              <button
                className="btn btn-danger"
                onClick={this.props.toggleModal}
              >
                Hủy
              </button>
            </div>
          </div>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)
