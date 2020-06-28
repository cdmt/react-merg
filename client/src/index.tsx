import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'
import {ApolloClient} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import {ApolloProvider as ApolloProviderHooks} from 'react-apollo-hooks'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri:'http://localhost:4000'
})

const client = new ApolloClient({
  cache,
  link
})

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </Router>
)


ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloProviderHooks client={client}>
      <Root />
    </ApolloProviderHooks>
  </ApolloProvider>,
  document.getElementById('root')
);

