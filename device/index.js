import React, { Component } from 'react'
import Uuid from 'uuid'

import storage from 'storage/index'

export const withDevice = (WrappedComponent) => {
  class HOC extends Component {
    state = {
      deviceId: null
    }

    async componentWillMount() {
      let deviceId = await storage.getItem('deviceId') || Uuid()
      await storage.setItem('deviceId', deviceId)

      this.setState({ deviceId })
    }

    render() {
      const { deviceId } = this.state

      if (!deviceId) {
        return null
      }

      return <WrappedComponent deviceId={deviceId} {...this.props} />
    }
  }

  return HOC
}
