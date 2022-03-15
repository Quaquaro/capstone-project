import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import bin from '../img/bin.svg';

Game.propTypes = {
  players: PropTypes.array,
  onDelete: PropTypes.func,
  nameOfGame: PropTypes.string,
  id: PropTypes.string
};

export default function Game({ id, nameOfGame, players, onDelete }) {
  const [isPlayersVisible, setIsPlayersVisible] = useState(false);
  const [rows, setRows] = useState(2);
  const playersWithScore = players.filter((player) => player.score !== '');
  return (
    <GameContainer>
      {id !== '1' ? (
        <GameGrid role="list" lines={`repeat(${rows},1fr)`} onClick={handleClick}>
          <NameOfGame>{nameOfGame}</NameOfGame>
          {isPlayersVisible && (
            <DeleteButton type="button" onClick={() => onDelete(id)}>
              <img src={bin} alt="delete game button" width="18" aria-label="delete" />
            </DeleteButton>
          )}
          {players[0]?.player && <PlayerOne>{players[0]?.player}</PlayerOne>}
          {players[0]?.score && <ScoreOne>{players[0]?.score}</ScoreOne>}
          {isPlayersVisible && (
            <>
              {players[1]?.player && <PlayerTwo>{players[1]?.player}</PlayerTwo>}
              {players[1]?.score && <ScoreTwo>{players[1]?.score}</ScoreTwo>}
              {players[2]?.player && <PlayerThree>{players[2]?.player}</PlayerThree>}
              {players[2]?.score && <ScoreThree>{players[2]?.score}</ScoreThree>}
              {players[3]?.player && <PlayerFour>{players[3]?.player}</PlayerFour>}
              {players[3]?.score && <ScoreFour>{players[3]?.score}</ScoreFour>}
            </>
          )}
        </GameGrid>
      ) : (
        <GameGrid flex role="list">
          <NameOfGame empty>{nameOfGame}</NameOfGame>
        </GameGrid>
      )}
    </GameContainer>
  );
  function handleClick() {
    setIsPlayersVisible(!isPlayersVisible);
    if (rows > 2) {
      setRows(2);
    } else {
      setRows(playersWithScore.length + 1);
    }
  }
}

const GameGrid = styled.ul`
  list-style: none;
  user-select: none;
  display: grid;
  ${(props) => props.flex && `display:flex; justify-content:center;`}
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: ${(props) => props.lines || 'repeat(2, 1fr)'};
  padding-left: 1rem;
`;

const GameContainer = styled.div`
  position: relative;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.color.white};
  margin-top: 20px;
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
  position: absolute;
  right: 5px;
  top: 5px;
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
