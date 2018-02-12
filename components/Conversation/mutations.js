import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const sendMessage = graphql(gql`
  mutation SendMessage($conversationId: ID!, $userId: ID!, $message: String!) {
    sendMessage(conversationId: $conversationId, userId: $userId, message: $message) {
      _id
    }
  }
  `,
  {
    props({ mutate }) {
      return {
        sendMessage(variables) {
          return mutate({ variables })
        }
      }
    }
  }
)