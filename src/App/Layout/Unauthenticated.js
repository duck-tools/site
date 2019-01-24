import React from 'react';
import styled from 'styled-components';

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

export default function Unauthenticated() {
  return (
    <Hero>
      <h1>Duck Tools</h1>
      <a href="/login">Login</a>
    </Hero>
  );
}
