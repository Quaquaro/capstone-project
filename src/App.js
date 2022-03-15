import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { Route, Routes } from 'react-router-dom';
import GamesPage from './pages/GamesPage.js';
import AddGameFormPage from './pages/AddGameFormPage.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import { useState, useRef } from 'react';

const infoText = [{ nameOfGame: 'Start tracking your first game!', players: [], id: '1' }];

function App() {
  const [games, setGames] = useLocalStorage('games', infoText);
  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false,
    nameOfGame: ''
  });

  const [notification, setNotification] = useState({
    message: 'Game was successfully deleted!',
    isVisible: false
  });

  const idGameRef = useRef();

  const [alert, setAlert] = useState({
    message: 'Game was successfully deleted!',
    isVisible: false
  });

  return (
    <>
      <GlobalFonts />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route
            path="/"
            element={
              <GamesPage
                games={games}
                onDeleteGame={handleDeleteGame}
                dialog={dialog}
                onDialog={confirmDelete}
                alert={alert}
                notification={notification}
              />
            }
          />
          <Route path="/addgame" element={<AddGameFormPage onTrackGame={trackGame} />} />
        </Routes>
      </ErrorBoundary>
    </>
  );

  function trackGame(gamesObject) {
    const gamesArray = [gamesObject, ...games];
    const filteredGamesArray = gamesArray.filter((game) => game.id !== '1');
    setGames(filteredGamesArray);
  }
  function handleDeleteGame(gameId) {
    const index = games.findIndex((game) => game.id === gameId);
    handleDialog('Are you sure you want to delete?', true, games[index].nameOfGame);
    idGameRef.current = gameId;
  }

  function handleDialog(message, isLoading, nameOfGame) {
    setDialog({
      message,
      isLoading,
      nameOfGame
    });
  }

  function handleAlert(isVisible) {
    setAlert({
      isVisible
    });
    setTimeout(() => setAlert({ isVisible: false }), 3000);
  }

  function handleNotification(isVisible) {
    setNotification({
      isVisible
    });
    setTimeout(() => setNotification({ isVisible: false }), 2000);
  }
  function confirmDelete(choose) {
    if (choose) {
      setGames(games.filter((game) => game.id !== idGameRef.current));
      handleDialog('', false);
      handleAlert(true);
    } else {
      handleDialog('', false);
      handleNotification(true);
    }
  }
}

export default App;
