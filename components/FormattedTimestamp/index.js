import React, { Component } from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'

export default class extends Component {
  state = {
    formatted: ''
  }

  componentWillMount() {
    this.format()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  format = () => {
    const timestamp = parseInt(this.props.timestamp, 10)
    const diff = Date.now() - timestamp

    let formatted

    if (diff < 1000 * 60 * 5) {
      formatted = distanceInWordsToNow(timestamp) + ' ago'
    } else if (diff < 1000 * 60 * 60 * 24) {
      formatted = format(timestamp, 'HH:mm')
    } else if (diff < 1000 * 60 * 60 * 24 * 365) {
      formatted = format(timestamp, 'HH:mm Do MMM')
    } else {
      formatted = format(timestamp, 'HH:mm Do MMM YYYY')
    }

    this.timeout = setTimeout(() => {
      this.format(timestamp)
    }, 1000)

    this.setState({ formatted })
  }

  render() {
    const { component: Component } = this.props

    return <Component>{this.state.formatted}</Component>
  }
}
