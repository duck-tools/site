import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { AuthenticationContext } from '../context';
import Spinner from '../Spinner';
//import Unauthenticated from './Unauthenticated';

const Authenticated = React.lazy(() => import('./Authenticated'));
const Unauthenticated = React.lazy(() => import('./Unauthenticated'));

const theme = {
  screenSizes: {
  }
}

const Container = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: center;
`;

export default function Layout(props) {
  const isAuthenticated = useContext(AuthenticationContext);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <Container isAuthenticated>
          { isAuthenticated ? <Authenticated {...props} /> : <Unauthenticated {...props} /> }
        </Container>
      </ThemeProvider>
    </React.Suspense>
  );
}
