import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: blue;
`;

export default function Hello({ name = 'React' }) {
  return <Wrapper>Hello, {name}</Wrapper>;
}
