import React, { useContext } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import AppContext from './context';

const Wrapper = styled.div`
  color: blue;
`;

function Hello({ name = 'React' }) {
  return <Wrapper>Hello, {name}</Wrapper>;
}

export default function App(props) {
  return (
    <AppContext {...props}>
      <Hello />
    </AppContext>
  );
}
