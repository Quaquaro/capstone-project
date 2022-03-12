import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import bin from '../img/bin.svg';

TrackedGamesList.propTypes = {
  games: PropTypes.array,
  onDelete: PropTypes.func,
  display: PropTypes.bool
};

export default function TrackedGamesList({ games, onDelete }) {
  return (
    <Card>
      <CardContent role="list">
        {games.map(({ id, players, nameOfGame }) => (
          <GameContainer key={id}>
            {id !== 1 ? (
              <GameGrid role="list">
                <NameOfGame>{nameOfGame}</NameOfGame>
                <DeleteButton type="button" onClick={() => onDelete(id)}>
                  <img src={bin} alt="delete game button" width="18" aria-label="delete" />
                </DeleteButton>
                {players[0]?.player && <PlayerOne>{players[0]?.player}</PlayerOne>}
                {players[0]?.score && <ScoreOne>{players[0]?.score}</ScoreOne>}
                {players[1]?.player && <PlayerTwo>{players[1]?.player}</PlayerTwo>}
                {players[1]?.score && <ScoreTwo>{players[1]?.score}</ScoreTwo>}
                {players[2]?.player && <PlayerThree>{players[2]?.player}</PlayerThree>}
                {players[2]?.score && <ScoreThree>{players[2]?.score}</ScoreThree>}
                {players[3]?.player && <PlayerFour>{players[3]?.player}</PlayerFour>}
                {players[3]?.score && <ScoreFour>{players[3]?.score}</ScoreFour>}
              </GameGrid>
            ) : (
              <GameGrid flex role="list">
                <NameOfGame empty>{nameOfGame}</NameOfGame>
              </GameGrid>
            )}
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
  ${(props) => props.flex && `display:flex; justify-content:center;`}
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  padding-left: 1rem;
`;

const NameOfGame = styled.li`
  grid-area: 1 / 1 / 2 / 2;
  ${(props) => props.empty && `grid-area: 1 / 1 / 2 / 3; text-align:center;`}
  display: inline-block;
  font-variation-settings: 'wght' 700;
  font-size: 20px;
`;

const DeleteButton = styled.button`
  grid-area: 1 / 3 / 2 / 3;
  background: none;
  border: none;
  width: 25px;
  display: flex;
  justify-content: center;
  margin: 5px 5px 0 0;
  &:active {
    opacity: 0.7;
  }
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
