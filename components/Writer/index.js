import React, { Component } from 'react'
import debounce from 'lodash.debounce'

import WriterUI from 'components/WriterUI'
import Form from 'components/Form'
import InlineFormGroup from 'components/InlineFormGroup'
import Input from 'components/Input'
import Button from 'components/Button'
import FormErrors from 'components/FormErrors'

class Writer extends Component {
  state = {
    message: ''
  }

  componentDidMount() {
    this.focus()
  }

  componentDidUpdate() {
    this.focus()
  }

  handleMessageChange = (message) => {
    this.setState({ message })
  }

  // HACK: debounce to counter for double submission
  // in browser application
  handleSubmit = debounce(() => {
    this.props.onSend(this.state.message)
    this.setState({ message: '' })
  }, 10)

  focus() {
    if (this.input && this.input.focus) {
      this.input.focus()
    }
  }

  render() {
    const { sending, errors } = this.props
    const { message } = this.state

    return (
      <WriterUI>
        <Form onSubmit={this.handleSubmit}>
          <InlineFormGroup>
            <Input
              type="text"
              value={message}
              disabled={sending}
              returnKeyType="send"
              onSubmitEditing={this.handleSubmit}
              placeholder={'Write a message ...'}
              onChange={this.handleMessageChange}
              innerRef={(e) => { this.input = e }}
            />
            
            <Button
              type="submit"
              loading={sending}
              label={'Send'}
              onClick={this.handleSubmit}
            />
          </InlineFormGroup>

          <FormErrors errors={errors} />
        </Form>
      </WriterUI>
    )
  }
}

export default Writer