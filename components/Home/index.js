import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import Slugify from 'slugify'

import { Redirect } from 'router/index'

import HomeUI from 'components/HomeUI'
import Form from 'components/Form'
import InlineFormGroup from 'components/InlineFormGroup'
import Input from 'components/Input'
import Button from 'components/Button'

class Home extends Component {
  state = {
    slug: '',
    redirect: null
  }

  componentDidMount() {
    if (this.input && this.input.focus) {
      this.input.focus()
    }
  }

  handleSlugChange = (slug) => {
    this.setState({ slug })
  }

  handleSubmit = debounce(() => {
    let slug = `${this.state.slug}`.trim()

    if (!slug) return

    slug = slug.replace(/[^A-Za-z0-9\s]/g, '')
    slug = Slugify(slug)

    this.setState({
      redirect: `/${slug}`
    })
  }, 100)

  render() {
    const { slug, redirect } = this.state

    if (redirect) {
      return <Redirect push to={redirect} />
    }

    return (
      <HomeUI>
        <Form onSubmit={this.handleSubmit}>
          <InlineFormGroup>
            <Input
              type="text"
              value={slug}
              returnKeyType="send"
              onSubmitEditing={this.handleSubmit}
              placeholder={'Room name ...'}
              onChange={this.handleSlugChange}
              innerRef={(e) => { this.input = e }}
            />
            <Button
              type="submit"
              label={'Join'}
              onClick={this.handleSubmit}
            />
          </InlineFormGroup>
        </Form>
      </HomeUI>
    )
  }
}

export default Home