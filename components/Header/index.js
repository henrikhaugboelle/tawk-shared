import React, { Component } from 'react'

import HeaderUI from 'components/HeaderUI'
import View from 'components/View'
import Tagline from 'components/Tagline'
import Headline from 'components/Headline'
import Back from 'components/Back'

class Header extends Component {
  render() {
    const { conversation, onBack } = this.props

    return (
      <HeaderUI>
        <Back onClick={onBack} />

        <View>
          <Tagline>ROOM:</Tagline>
          <Headline>{conversation.slug}</Headline>
        </View>

        <View width={40} />
      </HeaderUI>
    )
  }
}

export default Header