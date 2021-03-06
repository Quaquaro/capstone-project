import TrackedGamesList from '../components/TrackedGamesList.js';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DefaultButton from '../components/DefaultButton.js';
import Header from '../components/Header.js';
import Dialog from '../components/Dialog.js';
import Alert from '../components/Alert.js';
import Notification from '../components/Notification.js';
import PageSwitchAnimation from '../components/PageSwitchAnimation.js';
import SearchBar from '../components/SearchBar.js';

GamesPage.propTypes = {
  games: PropTypes.array,
  onDeleteGame: PropTypes.func,
  dialog: PropTypes.object,
  alert: PropTypes.object,
  onDialog: PropTypes.func,
  notification: PropTypes.object
};

export default function GamesPage({ games, onDeleteGame, onDialog, dialog, alert, notification }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setQuery(value);
  };
  const searchResults = games.filter((game) => {
    if (query === '') {
      return game;
    } else if (game.nameOfGame.toLowerCase().includes(query.toLowerCase())) {
      return game;
    }
  });
  return (
    <>
      <Header />
      <PageSwitchAnimation>
        {alert.isVisible && <Alert alertMessage={alert.message} />}
        {notification.isVisible && <Notification notification={notification.message} />}
        <GamePageLayout>
          <SearchBar onChange={handleSearchInputChange} />
          <TrackedGamesList games={searchResults} onDelete={onDeleteGame} />
          <ButtonContainer>
            <DefaultButton onClick={handleOnClick}>TRACK GAME</DefaultButton>
          </ButtonContainer>
          {dialog.isLoading && (
            <Dialog message={dialog.message} nameOfGame={dialog.nameOfGame} onDialog={onDialog} />
          )}
        </GamePageLayout>
      </PageSwitchAnimation>
    </>
  );
  function handleOnClick() {
    navigate('/addgame', { replace: true });
  }
}

const GamePageLayout = styled.main`
  overflow-y: hidden;
  display: grid;
  grid-template-rows: 1fr 8fr 1fr;
  grid-template-columns: 1fr;
  place-content: center;
  max-height: 760px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 20px;
`;
