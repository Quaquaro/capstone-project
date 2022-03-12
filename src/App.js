import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { Route, Routes } from 'react-router-dom';
import GamesPage from './pages/GamesPage.js';
import AddGameFormPage from './pages/AddGameFormPage.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import { useState, useRef } from 'react';
function App() {
  const [games, setGames] = useLocalStorage('games', []);
  const infoText = [{ nameOfGame: 'Start tracking your first game!', players: [], id: 1 }];
  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false,
    nameOfGame: ''
  });
  const idGameRef = useRef();
  function handleDialog(message, isLoading, nameOfGame) {
    setDialog({
      message,
      isLoading,
      nameOfGame
    });
  }

  return (
    <>
      <GlobalFonts />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route
            path="/"
            element={
              games.length === 0 ? (
                <GamesPage
                  games={infoText}
                  onDeleteGame={handleDeleteGame}
                  dialog={dialog}
                  onDialog={confirmDelete}
                />
              ) : (
                <GamesPage
                  games={games}
                  onDeleteGame={handleDeleteGame}
                  dialog={dialog}
                  onDialog={confirmDelete}
                />
              )
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
  function handleDeleteGame(gameId) {
    const index = games.findIndex((game) => game.id === gameId);
    handleDialog('Are you sure you want to delete?', true, games[index].nameOfGame);
    idGameRef.current = gameId;
  }

  function confirmDelete(choose) {
    if (choose) {
      setGames(games.filter((game) => game.id !== idGameRef.current));
      handleDialog('', false);
      alert('Game was successfully deleted.');
    } else {
      handleDialog('', false);
      alert('Game was not deleted.');
    }
  }
}

export default App;
