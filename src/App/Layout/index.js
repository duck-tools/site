import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { AuthenticationContext } from '../context';
import Spinner from '../Spinner';
import { theme } from './theme';

const Authenticated = React.lazy(() => import('./Authenticated'));
const Unauthenticated = React.lazy(() => import('./Unauthenticated'));

const Container = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: center;
`;

export default function Layout(props) {
  const { displayName, picture } = useContext(AuthenticationContext);
  const isAuthenticated = !!displayName;

  return (
    <React.Suspense fallback={<Spinner />}>
      <ThemeProvider theme={theme}>
        <Container>
          { isAuthenticated ? <Authenticated {...props} /> : <Unauthenticated {...props} /> }
        </Container>
      </ThemeProvider>
    </React.Suspense>
  );
}
