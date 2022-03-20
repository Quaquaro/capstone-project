import Game from './Game.js';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

TrackedGamesList.propTypes = {
  games: PropTypes.array,
  onDelete: PropTypes.func
};

export default function TrackedGamesList({ games, onDelete }) {
  return (
    <Card>
      <CardContent role="list">
        {games.map(({ id, players, nameOfGame, isPlayersVisible }) => (
          <Game
            key={id}
            id={id}
            players={players}
            nameOfGame={nameOfGame}
            onDelete={onDelete}
            isPlayersVisible={isPlayersVisible}
          />
        ))}
      </CardContent>
    </Card>
  );
}

const getColorPink = ({ theme }) => theme.color.pink;
const getColorNeonBlue = ({ theme }) => theme.color.neonBlue;
const getColorSecondary = ({ theme }) => theme.color.secondary;

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
    background-image: linear-gradient(0, ${getColorPink}, ${getColorNeonBlue});
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
  background-color: ${getColorSecondary};
  border-radius: 15px;
  overflow: auto;
`;
