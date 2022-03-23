import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { Route, Routes } from 'react-router-dom';
import GamesPage from './pages/GamesPage.js';
import TrackGameFormPage from './pages/TrackGameFormPage.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import { useState, useRef, useEffect } from 'react';
import useAxios from './hooks/useAxios.js';

// eslint-disable-next-line no-undef
const BOARDGAMEATLAS_CLIENT_ID = process.env.REACT_APP_BOARDGAMEATLAS_CLIENT_ID;
const infoText = [
  { nameOfGame: 'Start tracking your first game!', players: [], id: '1', notes: '' }
];

function App() {
  const { response, loading, error } = useAxios({
    method: 'get',
    url: `/api/search?name=colt&limit=10&client_id=${BOARDGAMEATLAS_CLIENT_ID}`
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);

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
                loading={loading}
                data={data}
                error={error}
                games={games}
                onDeleteGame={handleDeleteGame}
                dialog={dialog}
                onDialog={confirmDelete}
                alert={alert}
                notification={notification}
              />
            }
          />
          <Route path="/addgame" element={<TrackGameFormPage onTrackGame={trackGame} />} />
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
    const gamesArray = games.filter((game) => game.id !== idGameRef.current);
    if (choose) {
      if (gamesArray.length === 0) {
        setGames(infoText);
        handleDialog('', false);
        handleAlert(true);
      } else {
        setGames(gamesArray);
        handleDialog('', false);
        handleAlert(true);
      }
    } else {
      handleDialog('', false);
      handleNotification(true);
    }
  }
}

export default App;
