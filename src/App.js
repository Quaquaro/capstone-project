import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
// import styled from 'styled-components';
import Header from './components/Header.js';

function App() {
  return (
    <div>
      <GlobalFonts />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
      </ErrorBoundary>
    </div>
  );
}

export default App;

// const Headline = styled.h1`
//   font-family: 'Open Sans';
//   font-variation-settings: 'wght' 700;

//   margin: 0;
// `;
