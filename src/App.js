import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import GamesPage from './pages/GamesPage.js';
import AddGameFormPage from './pages/AddGameFormPage.js';

function App() {
  const [games, setGames] = useState([]);
  const infoText = [{ nameOfGame: 'Start tracking your first game', id: 1 }];
  return (
    <>
      <GlobalFonts />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route
            path="/"
            element={
              games.length === 0 ? <GamesPage games={infoText} /> : <GamesPage games={games} />
            }
          />
          <Route path="/addgame" element={<AddGameFormPage onTrackGame={trackGame} />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
  function trackGame(gamesObject) {
    const gamesArray = [gamesObject, ...games];
    setGames(gamesArray);
  }
}

export default App;
