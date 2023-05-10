import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios'
import HomeNavbar from '../../HomePage/HomeNavbar'
import './DetailSpecialty.scss'

class DetailSpecialty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorIdArray: [21, 22],
      doctors: [],
    }
  }

  componentDidMount = () => {
    const array = []
    this.state.doctorIdArray.map(async (id, index) => {
      const res = await axios.get(`/api/v1/doctor/${id}`)
      if (res.data.status === 'success') {
        array.push(res.data.data)
      }
      if (index === this.state.doctorIdArray.length - 1) {
        this.setState({
          doctors: array,
        })
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="ds-container">
        <HomeNavbar />
        <div className="ds-body">detail specialty</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty)
