import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import { unstable_createResource } from 'react-cache';

const Wrapper = styled.div`
  color: blue;
`;

function Hello({ name = 'React' }) {
  return <Wrapper>Hello, {name}</Wrapper>;
}

function fakeFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      a: 'b'
    }), 6000);
  });
}

const TestResource = unstable_createResource(fakeFetch);

function TestFetch(props) {
  const data = TestResource.read('a');
  return <>Received {data.a} from the server</>;
}

const Other = React.lazy(() => import('./Other'));

export default function App() {
  return (
    <React.ConcurrentMode>
      <React.Suspense fallback={<Spinner size="30px" />}>
        <div><TestFetch /></div>
      </React.Suspense>
      <React.Suspense fallback={<Spinner size="30px" />}>
        <Other />
      </React.Suspense>
      <Hello />
    </React.ConcurrentMode>
  );
}
