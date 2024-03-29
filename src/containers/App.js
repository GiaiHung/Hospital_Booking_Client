import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter as Router } from 'connected-react-router'
import { history } from '../redux'
import { ToastContainer } from 'react-toastify'

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from '../hoc/authentication'

import { path } from '../utils'

import Home from '../routes/Home'
import Login from './Auth/Login'
import System from '../routes/System'
import './App.scss'

import CustomScrollbars from '../components/CustomScrollbars'
import HomePage from './HomePage/HomePage'
import DoctorDetail from './HomePage/Doctor/DoctorDetail'
import VerifyBooking from './Patient/VerifyBooking'
import DetailSpecialty from './Patient/Specialty/DetailSpecialty'
import ClinicDetail from './Clinics/ClinicDetail'

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props
    let { bootstrapped } = persistor.getState()
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }))
      } else {
        this.setState({ bootstrapped: true })
      }
    }
  }

  componentDidMount() {
    this.handlePersistorState()
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route path={path.HOMEPAGE} exact component={HomePage} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route path={path.DETAIL_DOCTOR} component={DoctorDetail} />
                  <Route
                    path={path.DETAIL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route path={path.DETAIL_CLINIC} component={ClinicDetail} />
                  <Route path={path.VERIFY_BOOKING} component={VerifyBooking} />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Router>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
