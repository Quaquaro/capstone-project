import TrackedGamesList from '../components/TrackedGamesList.js';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../components/DefaultButton.js';
import Header from '../components/Header.js';

GamesPage.propTypes = {
  games: PropTypes.array
};

export default function GamesPage({ games }) {
  const navigate = useNavigate('');

  return (
    <>
      <Header />
      <GamePageLayout>
        <TrackedGamesList games={games} />
        <ButtonContainer>
          <DefaultButton onClick={handleOnClick} label="TRACK GAME" />
        </ButtonContainer>
      </GamePageLayout>
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
  margin: 20px 0;
`;
