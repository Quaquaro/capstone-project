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
              {game.playerNameOne && <PlayerOne>{game.playerNameOne}</PlayerOne>}
              {game.scoreOne && <ScoreOne>{game.scoreOne}</ScoreOne>}
              {game.playerNameTwo && <PlayerTwo>{game?.playerNameTwo}</PlayerTwo>}
              {game.ScoreTwo && <ScoreTwo>{game?.scoreTwo}</ScoreTwo>}
              {game.playerNameThree && <PlayerThree>{game?.playerNameThree}</PlayerThree>}
              {game.scoreThree && <ScoreThree>{game?.scoreThree}</ScoreThree>}
              {game.playerNameFour && <PlayerFour>{game?.playerNameFour}</PlayerFour>}
              {game.scoreFour && <ScoreFour>{game?.scoreFour}</ScoreFour>}
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
  grid-template-rows: repeat(5, 1fr);

  padding-left: 1rem;
`;

const NameOfGame = styled.li`
  grid-area: 1 / 1 / 2 / 3;
  display: inline-block;
  font-variation-settings: 'wght' 700;
  font-size: 20px;
`;
const PlayerOne = styled.li`
  grid-area: 2 / 1 / 3 / 2;
`;

const ScoreOne = styled.li`
  grid-area: 2 / 2 / 3 / 3;
`;

const PlayerTwo = styled.li`
  grid-area: 3 / 1 / 4 / 2;
`;

const ScoreTwo = styled.li`
  grid-area: 3 / 2 / 4 / 3;
`;

const PlayerThree = styled.li`
  grid-area: 4 / 1 / 5 / 2;
`;

const ScoreThree = styled.li`
  grid-area: 4 / 2 / 5 / 3;
`;

const PlayerFour = styled.li`
  grid-area: 5 / 1 / 6 / 2;
`;

const ScoreFour = styled.li`
  grid-area: 5 / 2 / 5 / 3;
`;
