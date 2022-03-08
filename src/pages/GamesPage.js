import TrackedGamesList from '../components/TrackedGamesList.js';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../components/Button.js';

GamesPage.propTypes = {
  games: PropTypes.array
};

export default function GamesPage({ games }) {
  return (
    <GamePageLayout>
      <TrackedGamesList games={games} />
      <ButtonContainer>
        <Button />
      </ButtonContainer>
    </GamePageLayout>
  );
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
