import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { Route, Routes, useLocation } from 'react-router-dom';
import GamesPage from './pages/GamesPage.js';
import TrackGameFormPage from './pages/TrackGameFormPage.js';
import CatalogManagementPage from './pages/CatalogManagementPage.js';
import GroupsManagementPage from './pages/GroupsManagementPage.js';
import StatsPage from './pages/StatsPage.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import { useState, useRef } from 'react';

const infoText = [
  { nameOfGame: 'Start tracking your first game!', players: [], id: '1', notes: '' }
];

const initialPlayerGroups = [
  { id: '1', name: 'Board Game Crew', players: ['Alex', 'Gustav', 'Dan', 'Jussy'] }
];

function App() {
  const location = useLocation();
  const [games, setGames] = useLocalStorage('games', infoText);
  const [playerGroups, setPlayerGroups] = useLocalStorage('playerGroups', initialPlayerGroups);

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

  const handleSaveGroup = (newGroup) => {
    const existingIndex = playerGroups.findIndex((g) => g.id === newGroup.id);
    let updated;
    if (existingIndex !== -1) {
      updated = playerGroups.map((g) => (g.id === newGroup.id ? newGroup : g));
    } else {
      updated = [newGroup, ...playerGroups];
    }
    setPlayerGroups(updated);
  };

  const handleDeleteGroup = (groupId) => {
    setPlayerGroups(playerGroups.filter((g) => g.id !== groupId));
  };

  return (
    <>
      <GlobalFonts />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
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
            <Route
              path="/addgame"
              element={<TrackGameFormPage onTrackGame={trackGame} playerGroups={playerGroups} />}
            />
            <Route path="/catalog" element={<CatalogManagementPage />} />
            <Route
              path="/groups"
              element={
                <GroupsManagementPage
                  groups={playerGroups}
                  onSaveGroup={handleSaveGroup}
                  onDeleteGroup={handleDeleteGroup}
                />
              }
            />
            <Route path="/stats" element={<StatsPage games={games} />} />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
    </>
  );

  function trackGame(gamesObject) {
    const previousMatches = games.filter(
      (g) =>
        g.id !== '1' &&
        g.id !== gamesObject.id &&
        g.nameOfGame &&
        g.nameOfGame.toLowerCase() === gamesObject.nameOfGame.toLowerCase()
    );

    let previousMaxScore = -Infinity;
    previousMatches.forEach((m) => {
      if (Array.isArray(m.players)) {
        m.players.forEach((p) => {
          const num = Number(p.score);
          if (!isNaN(num) && num > previousMaxScore) {
            previousMaxScore = num;
          }
        });
      }
    });

    const newTopPlayer =
      Array.isArray(gamesObject.players) && gamesObject.players.length > 0
        ? gamesObject.players[0]
        : null;

    const newTopScore = newTopPlayer ? Number(newTopPlayer.score) : NaN;

    if (!isNaN(newTopScore) && newTopScore > previousMaxScore && previousMaxScore !== -Infinity) {
      const msg = `🎉 NEW HIGHSCORE! ${newTopPlayer.player} set a new record of ${newTopScore} in ${gamesObject.nameOfGame}!`;
      setNotification({ message: msg, isVisible: true });
      setTimeout(() => setNotification((prev) => ({ ...prev, isVisible: false })), 4000);
    }

    const existingIndex = games.findIndex((g) => g.id === gamesObject.id);
    let updatedGames;
    if (existingIndex !== -1) {
      updatedGames = games.map((g) => (g.id === gamesObject.id ? gamesObject : g));
    } else {
      updatedGames = [gamesObject, ...games].filter((game) => game.id !== '1');
    }
    setGames(updatedGames);
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
