import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Wrapper = styled.div`
  color: blue;
`;

function Hello({ name = 'React' }) {
  return <Wrapper>Hello, {name}</Wrapper>;
}

const Other = React.lazy(() => import('./Other'));

export default function App() {
  return (
    <>
      <React.Suspense fallback={<Spinner />}>
        <>
          <Other />
        </>
      </React.Suspense>
      <Hello />
    </>
  );
}
