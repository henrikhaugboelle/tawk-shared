import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash.get'
import update from 'immutability-helper'

export const conversationGql = gql`
  query Conversation($slug: String!, $deviceId: String!) {
    conversation(slug: $slug) {
      _id
      slug
      messages {
        _id
        message
        timestamp
        user {
          _id
          identity {
            color
            animal
          }
          displayName
        }
      }
    }
    user(deviceId: $deviceId) {
      _id
      identity {
        color
        animal
      }
      displayName
    }
  }
`

export const conversation = graphql(conversationGql, {
  options(props) {
    return {
      variables: {
        slug: props.match.params.slug,
        deviceId: props.deviceId
      },
      fetchPolicy: 'network-only'
    }
  },
  props({ data, ownProps: { match } }) {
    return {
      loading: get(data, 'loading'),
      conversation: get(data, 'conversation'),
      messages: get(data, 'conversation.messages', []),
      user: get(data, 'user'),

      subscribeToAddedMessages() {
        return data.subscribeToMore({
          document: gql`
            subscription messageAdded($slug: String!) {
              messageAdded(slug: $slug) {
                _id
                message
                timestamp
                user {
                  _id
                  identity {
                    color
                    animal
                  }
                  displayName
                }
              }
            }
          `,
          variables: {
            slug: match.params.slug 
          },
          updateQuery(prevState, { subscriptionData }) {
            if (!subscriptionData.data) return prevState

            return update(prevState, {
              conversation: {
                messages: {
                  $push: [subscriptionData.data.messageAdded]
                }
              }
            })
          }
        })
      },
    }
  }
})
