import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { Route, Routes } from 'react-router-dom';
import GamesPage from './pages/GamesPage.js';
import AddGameFormPage from './pages/AddGameFormPage.js';
import useLocalStorage from './hooks/useLocalStorage.js';

function App() {
  const [games, setGames] = useLocalStorage('games', []);
  const infoText = [{ nameOfGame: 'Start tracking your first game', players: [], id: 1 }];

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
