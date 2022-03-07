import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header.js';
import TrackGameForm from './components/TrackGameForm.js';
import TrackedGamesList from './components/TrackedGamesList.js';

function App() {
  const [games, setGames] = useState([]);
  const infoText = [{ nameOfGame: 'Start tracking your first game' }];
  return (
    <>
      <GlobalFonts />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        <AppLayout>
          {games.length === 0 ? (
            <TrackedGamesList games={infoText} />
          ) : (
            <TrackedGamesList games={games} />
          )}

          <TrackGameForm onTrackGame={trackGame} />
        </AppLayout>
      </ErrorBoundary>
    </>
  );
  function trackGame(gamesObject) {
    const gamesArray = [gamesObject, ...games];
    setGames(gamesArray);
  }
}

const AppLayout = styled.div`
  display: grid;
  place-content: center;
  grid-template-rows: 280px 520px;
`;

export default App;
