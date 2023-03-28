import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="section-share-container section-about">
        <div className="section-share">
          <div className="section-content">
            <div className="header">
              <span>
                <FormattedMessage id="home-section.media" />
              </span>
            </div>
            <div className="body about">
              <div className="about-body-left">
                <iframe
                  width="100%"
                  height="300px"
                  src="https://www.youtube.com/embed/at37Y8rKDlA"
                  title="How to Optimize Your Water Quality &amp; Intake for Health | Huberman Lab Podcast"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="about-body-right">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas, neque maxime. Nemo dolorem consectetur in error odit
                  omnis est dignissimos.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                  ex ipsam magnam ipsa, eaque nobis quibusdam ut soluta odit
                  saepe expedita officiis aliquid nam accusantium, iusto non
                  suscipit harum error?
                </p>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About)
