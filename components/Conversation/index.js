import React, { Component } from 'react'
import { compose } from 'react-apollo'

import { withDevice } from 'shared/device'

import { getValidationErrors } from 'shared/helpers/validation'

import { conversation as conversationQuery } from 'shared/components/Conversation/queries'
import { sendMessage as sendMessageMutation } from 'shared/components/Conversation/mutations'

import Header from 'shared/components/Header'
import Messages from 'shared/components/Messages'
import Writer from 'shared/components/Writer'

import ConversationUI from 'components/ConversationUI'
import PageLoader from 'components/PageLoader'

class Conversation extends Component {
  state = {
    sending: false,
    errors: {
      message: [],
      general: []
    }
  }

  componentWillMount() {
    this.props.subscribeToAddedMessages()
  }

  handleSendMessage = async (message) => {
    try {
      if (this.state.sending) return

      const { user, conversation, sendMessage } = this.props

      this.setState({
        sending: true,
        errors: {
          message: [],
          general: []
        }
      })

      await sendMessage({
        userId: user._id,
        conversationId: conversation._id,
        message: message
      })

      this.setState({
        sending: false
      })
    } catch (error) {
      this.setState({
        sending: false,
        errors: {
          ...getValidationErrors(error)
        }
      })
    }
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  render() {
    const { loading, conversation, user, messages } = this.props
    const { sending, errors } = this.state
  
    if (loading) {
      return <PageLoader />
    }
    
    return (
      <ConversationUI>
        <Header
          conversation={conversation}
          onBack={this.handleBack}
        />

        <Messages
          user={user}
          messages={messages}
        />

        <Writer
          sending={sending}
          errors={[...(errors.message || []), ...(errors.general || [])]}

          onSend={this.handleSendMessage}
        />
      </ConversationUI>
    )
  }
}

export default withDevice(compose(
  conversationQuery,
  sendMessageMutation
)(Conversation))
