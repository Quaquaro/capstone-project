import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header.js';
import TrackGameForm from './components/TrackGameForm.js';
import TrackedGamesList from './components/TrackedGamesList.js';

function App() {
  const [nameOfGame, setNameOfGame] = useState([]);
  const infoText = ['Start tracking your first game.'];
  return (
    <>
      <GlobalFonts />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        <AppLayout>
          {nameOfGame.length === 0 ? (
            <TrackedGamesList nameOfGame={infoText} />
          ) : (
            <TrackedGamesList nameOfGame={nameOfGame} />
          )}

          <TrackGameForm onTrackGame={trackGame} />
        </AppLayout>
      </ErrorBoundary>
    </>
  );
  function trackGame(gameString) {
    const gamesArray = [gameString, ...nameOfGame];
    console.log(gamesArray);
    setNameOfGame(gamesArray);
  }
}

const AppLayout = styled.div`
  display: grid;
  place-content: center;
  grid-template-rows: 3fr 1fr;
`;

export default App;
