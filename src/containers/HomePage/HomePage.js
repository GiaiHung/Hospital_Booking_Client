import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import HomeHeader from './HomeHeader'
import './HomePage.scss'

class Home extends Component {
  render() {
    // const { isLoggedIn } = this.props
    // let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/login'

    return (
      <div>
        <HomeHeader />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
