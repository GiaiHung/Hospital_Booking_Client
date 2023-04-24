import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeFooter.scss'

class HomeFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const currentYear = new Date().getFullYear()
    return (
      <div className="footer">
        <p>
          &#169; Copyright {currentYear} Truong Giai Hung{' '}
          <a target="_blank" rel="noreferrer" href="https://google.com">
            For more information. Please visit our youtube channel
          </a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
