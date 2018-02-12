import { ApolloClient } from 'apollo-client'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { onError } from 'apollo-link-error'

export default function configureApolloClient({ constants }) {
  const httpLink = new BatchHttpLink({
    uri: constants.GRAPHQL_PATH
  })
  
  const wsClient = new SubscriptionClient(constants.GRAPHQL_SUBSCRIPTIONS_PATH, {
    reconnect: true
  })

  if (constants.WEB) {
    window.addEventListener('beforeunload', () => {
      wsClient.close()
    })
  }

  const wsLink = new WebSocketLink(wsClient)

  const splitter = ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  }

  let link = split(splitter, wsLink, httpLink)

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) => (
        console.log(`[GraphQL error]: Message: ${message}`)
      ))
    }
    
    if (networkError) {
      console.log(networkError)
      console.log(`[Network error]: ${networkError}`)
    }
  })

  link = errorLink.concat(link)

  const cache = new InMemoryCache({
    dataIdFromObject: o => o._id
  })

  const defaultOptions = {
    query: {
      fetchPolicy: 'network-only'
    }
  }

  return new ApolloClient({
    link,
    cache,
    defaultOptions
  })
}
