import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header.js';
import TrackGameForm from './components/TrackGameForm.js';

function App() {
  const [nameOfGame, setNameOfGame] = useState('Start tracking your first game.');
  return (
    <>
      <GlobalFonts />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        {<InfoText>{nameOfGame}</InfoText>}
        <TrackGameForm onTrackGame={trackGame} />
      </ErrorBoundary>
    </>
  );
  function trackGame(nameOfGame) {
    setNameOfGame(nameOfGame);
  }
}

const InfoText = styled.p`
  font-variation-settings: 'wght' 500;
  text-align: center;
`;

export default App;
