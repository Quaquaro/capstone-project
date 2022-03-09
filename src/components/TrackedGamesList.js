import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

TrackedGamesList.propTypes = {
  games: PropTypes.array
};

export default function TrackedGamesList({ games }) {
  return (
    <Card>
      <CardContent role="list">
        {games.map((game) => (
          <GameContainer key={game.id}>
            <GameGrid role="list">
              <NameOfGame>{game.nameOfGame}</NameOfGame>
              <li>{game.playerName}</li>
              <li>{game.score}</li>
            </GameGrid>
          </GameContainer>
        ))}
      </CardContent>
    </Card>
  );
}

const spin = keyframes`
0% {background-position: top center;}
100% {background-position: bottom center;}
`;

const Card = styled.div`
  width: 335px;
  height: 500px;
  position: relative;
  z-index: 2;
  border-radius: 20px;
  margin: auto;

  &::before,
  ::after {
    content: '';
    width: 345px;
    height: 510px;
    overflow: auto;
    display: block;
    position: absolute;
    z-index: -1;
    border-radius: 20px;
    background-image: linear-gradient(
      0,
      ${(props) => props.theme.color.pink},
      ${(props) => props.theme.color.neonBlue}
    );
    background-size: 100% 200%;
    background-position: center center;
    top: -5px;
    left: -5px;
    animation: ${spin} 2800ms infinite alternate;
  }
  &::after {
    filter: blur(30px);
  }
`;

const CardContent = styled.ul`
  padding: 15px;
  margin-top: 0px;
  list-style: none;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 15px;
  overflow: auto;
`;

const GameContainer = styled.div`
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.color.white};
  margin-top: 20px;
`;

const GameGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding-left: 1rem;
`;

const NameOfGame = styled.li`
  grid-area: 1 / 1 / 2 / 6;
  display: inline-block;
  font-variation-settings: 'wght' 700;
  font-size: 20px;
`;
