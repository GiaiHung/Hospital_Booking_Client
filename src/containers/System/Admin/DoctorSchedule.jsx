import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DoctorSchedule.scss'

class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <div>doctor schedule</div>
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
