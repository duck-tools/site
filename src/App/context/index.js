import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Authentication from './authentication';

export {AuthenticationContext} from './authentication';

const apolloClient = new ApolloClient({});

export default function AppContext(props) {
  return (
    <ApolloProvider client={apolloClient}>
      <Authentication authData={props.authData}>
        {props.children}
      </Authentication>
    </ApolloProvider>
  )
}
