import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import bin from '../img/bin.svg';

Game.propTypes = {
  players: PropTypes.array,
  onDelete: PropTypes.func,
  nameOfGame: PropTypes.string,
  id: PropTypes.string,
  notes: PropTypes.string
};

export default function Game({ id, nameOfGame, players, onDelete }) {
  const [isPlayersVisible, setIsPlayersVisible] = useState(false);
  const [rows, setRows] = useState(2);
  const playersWithScore = players.filter((player) => player.score !== '');
  const otherPlayers = [...playersWithScore];
  otherPlayers.splice(0, 1);

  return (
    <GameContainer onClick={handleClick}>
      {id !== '1' ? (
        <>
          <StyledGameName>{nameOfGame}</StyledGameName>
          {isPlayersVisible && (
            <DeleteButton type="button" onClick={() => onDelete(id)}>
              <img src={bin} alt="delete game button" width="18" aria-label="delete" />
            </DeleteButton>
          )}
          <StyledTable>
            <tr>
              {players[0]?.player && <td>{players[0]?.player}</td>}
              {players[0]?.score && <td>{players[0]?.score}</td>}
            </tr>

            {isPlayersVisible &&
              otherPlayers?.map(({ player, score }) => (
                <tr key={id}>
                  <td>{player}</td>
                  <td>{score}</td>
                </tr>
              ))}
            {/* {isPlayersVisible && <p>{notes}</p>} */}
          </StyledTable>
        </>
      ) : (
        <StyledGameName>{nameOfGame}</StyledGameName>
      )}
    </GameContainer>
  );
  function handleClick() {
    setIsPlayersVisible(!isPlayersVisible);
    if (rows > 2) {
      setRows(2);
    } else {
      setRows(playersWithScore.length + 2);
    }
  }
}
const GameContainer = styled.div`
  position: relative;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.color.white};
  margin-top: 20px;
  padding: 8px 0 8px 8px;
`;

const DeleteButton = styled.button`
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

const StyledGameName = styled.h3`
  margin: 0;
`;

const StyledTable = styled.table`
  width: 100%;
`;
