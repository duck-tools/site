import React from 'react';
import Authentication from './authentication';

export {AuthenticationContext} from './authentication';

export default function AppContext(props) {
  return (
    <Authentication authData={props.authData}>
      {props.children}
    </Authentication>
  )
}
