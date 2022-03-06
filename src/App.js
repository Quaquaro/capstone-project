import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header.js';
import TrackGameForm from './components/TrackGameForm.js';
import TrackedGamesList from './components/TrackedGamesList.js';

function App() {
  const [nameOfGame, setNameOfGame] = useState('Start tracking your first game.');
  return (
    <>
      <GlobalFonts />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        <AppLayout>
          <TrackedGamesList nameOfGame={nameOfGame} />
          <TrackGameForm onTrackGame={trackGame} />
        </AppLayout>
      </ErrorBoundary>
    </>
  );
  function trackGame(nameOfGame) {
    setNameOfGame(nameOfGame);
  }
}

const AppLayout = styled.div`
  display: grid;
  place-content: center;
  grid-template-rows: 3fr 1fr;
`;

export default App;
