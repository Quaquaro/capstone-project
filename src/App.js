import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import styled from 'styled-components';

function App() {
  return (
    <div>
      <GlobalFonts />
      <Headline>Hello Players!</Headline>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <p>First Component</p>
      </ErrorBoundary>
    </div>
  );
}

export default App;

const Headline = styled.h1`
  font-family: 'Open Sans';
  font-variation-settings: 'wght' 700;
  color: ${(props) => props.theme.color.blue};
`;
