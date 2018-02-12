import React, { Component } from 'react'

import MessagesUI from 'components/MessagesUI'

export default class extends Component {
  render() {
    const { user, messages } = this.props

    return (
      <MessagesUI
        user={user}
        messages={messages}
      />
    )
  }
}