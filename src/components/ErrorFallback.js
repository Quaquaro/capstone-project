/* eslint-disable react/prop-types */
import styled from 'styled-components';
export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Wrapper>
      <h1>Something went wrong:</h1>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs(() => ({ role: 'alert' }))`
  padding: 20px;
  border: 1px dotted crimson;
  border-radius: 8px;
`;
