import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import bin from '../img/bin.svg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../img/defaultImage.svg';

Game.propTypes = {
  players: PropTypes.array,
  onDelete: PropTypes.func,
  nameOfGame: PropTypes.string,
  gameImage: PropTypes.string,
  id: PropTypes.string,
  notes: PropTypes.string
};

export default function Game({ id, nameOfGame, players, onDelete, notes, gameImage }) {
  const navigate = useNavigate();
  const [isPlayersVisible, setIsPlayersVisible] = useState(false);
  const playersWithScore = players.filter((player) => player.score !== '');
  playersWithScore.splice(0, 1);

  return (
    <GameContainer
      as={motion.div}
      onClick={handleClick}
      whileTap={{ scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      {id !== '1' ? (
        <>
          <StyledGameName>{nameOfGame}</StyledGameName>
          {isPlayersVisible && (
            <DeleteButton type="button" onClick={() => onDelete(id)}>
              <img src={bin} alt="delete game" width="18" height="18" />
            </DeleteButton>
          )}
          {gameImage
            ? isPlayersVisible && (
                <GameImage src={gameImage} alt="picture of the game" width="85" height="76" />
              )
            : isPlayersVisible && (
                <GameImage src={defaultImage} alt="picture of the game" width="85" height="76" />
              )}
          <StyledTable>
            <tbody>
              <tr>
                {players[0]?.player && <td>{players[0]?.player}</td>}
                {players[0]?.score && <td>{players[0]?.score}</td>}
              </tr>
              {isPlayersVisible &&
                playersWithScore?.map(({ player, score, id }) => (
                  <tr key={id}>
                    <td>{player}</td>
                    <td>{score}</td>
                  </tr>
                ))}
            </tbody>
          </StyledTable>
          {isPlayersVisible && <NotesParagraph>{notes}</NotesParagraph>}
        </>
      ) : (
        <StyledGameName empty onClick={goToForm}>
          {nameOfGame}
        </StyledGameName>
      )}
    </GameContainer>
  );
  function handleClick() {
    setIsPlayersVisible(!isPlayersVisible);
  }

  function goToForm() {
    navigate('/addgame', { replace: true });
  }
}
const GameContainer = styled.div`
  position: relative;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.color.white};
  margin-top: 20px;
  padding: 8px 0 8px 8px;
  user-select: none;
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
  width: 85%;
  ${(props) => props.empty && `text-align: center; width: 100%`}
`;

const GameImage = styled.img`
  margin-top: 8px;
`;

const StyledTable = styled.table`
  width: 75%;
  table-layout: fixed;
`;

const NotesParagraph = styled.p`
  margin-right: 8px;
`;
