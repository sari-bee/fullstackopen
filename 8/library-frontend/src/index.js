import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
      <App/>
  </ApolloProvider>
)