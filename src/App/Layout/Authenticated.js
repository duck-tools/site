import React from 'react';

export default function Authenticated(props) {
  return (
    <div>
      <h1>Welcome, {props.displayName}!</h1>
      <a href="/logout">Logout</a>
    </div>
  );
}
