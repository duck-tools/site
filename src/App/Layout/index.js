import React, { useContext } from 'react';
import { AuthenticationContext } from '../context';
import Spinner from '../Spinner';

const Authenticated = React.lazy(() => import('./Authenticated'));
const Unauthenticated = React.lazy(() => import('./Unauthenticated'));

export default function Layout(props) {
  const isAuthenticated = useContext(AuthenticationContext);

  return (
    <React.Suspense fallback={<Spinner />}>
      { isAuthenticated ? <Authenticated {...props} /> : <Unauthenticated {...props} /> }
    </React.Suspense>
  );
}
