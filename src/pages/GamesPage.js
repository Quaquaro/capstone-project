import TrackedGamesList from '../components/TrackedGamesList.js';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../components/DefaultButton.js';
import Header from '../components/Header.js';
import Dialog from '../components/Dialog.js';
import Alert from '../components/Alert.js';
import Notification from '../components/Notification.js';

GamesPage.propTypes = {
  games: PropTypes.array,
  onDeleteGame: PropTypes.func,
  dialog: PropTypes.object,
  alert: PropTypes.object,
  onDialog: PropTypes.func,
  notification: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.any,
  data: PropTypes.any
};

export default function GamesPage({
  games,
  onDeleteGame,
  onDialog,
  dialog,
  alert,
  notification,
  error,
  loading,
  data
}) {
  const navigate = useNavigate();
  console.log(data);
  return (
    <>
      <Header />
      {loading ? (
        <p>loading...</p>
      ) : (
        <GamePageLayout>
          {error && <div>{error.message}</div>}
          <TrackedGamesList games={games} onDelete={onDeleteGame} />
          <ButtonContainer>
            <DefaultButton onClick={handleOnClick} label="TRACK GAME" />
          </ButtonContainer>
          {dialog.isLoading && (
            <Dialog message={dialog.message} nameOfGame={dialog.nameOfGame} onDialog={onDialog} />
          )}
        </GamePageLayout>
      )}
      {alert.isVisible && <Alert alertMessage={alert.message} />}
      {notification.isVisible && <Notification notification={notification.message} />}
    </>
  );
  async function handleOnClick(e) {
    e.preventDefault();

    navigate('/addgame', { replace: true });
  }
}

const GamePageLayout = styled.main`
  display: grid;
  grid-template-rows: 8fr 1fr;
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
