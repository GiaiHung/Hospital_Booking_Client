import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios'
import './VerifyBooking.scss'
import HomeNavbar from '../HomePage/HomeNavbar'

class VerifyBooking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      verifyStatus: false,
      verifyMessage: '',
    }
  }

  async componentDidMount() {
    if (this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search)
      const token = urlParams.get('token')
      const doctorId = urlParams.get('doctorId')
      try {
        const res = await axios.post(
          `/api/v1/patient/verify-booking?doctorId=${doctorId}&token=${token}`
        )
        if (res.data.status === 'success') {
          this.setState({
            verifyStatus: true,
            verifyMessage: res.data.message,
          })
        }
      } catch (error) {
        if (error.response.data.message) {
          this.setState({
            verifyStatus: false,
            verifyMessage: error.response.data.message,
          })
        }
      }
    }
  }

  render() {
    const { verifyMessage, verifyStatus } = this.state
    return (
      <div className="verify-booking">
        <HomeNavbar />
        <div className={`content ${verifyStatus ? 'success' : 'failed'}`}>
          {verifyMessage}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking)
