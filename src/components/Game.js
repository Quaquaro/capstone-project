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
  onShowHighscore: PropTypes.func,
  nameOfGame: PropTypes.string,
  gameImage: PropTypes.string,
  id: PropTypes.string,
  notes: PropTypes.string,
  date: PropTypes.string
};

export default function Game({
  id,
  nameOfGame,
  players,
  onDelete,
  onShowHighscore,
  notes,
  gameImage,
  date
}) {
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
          <HeaderGroup>
            <div>
              <StyledGameName>{nameOfGame}</StyledGameName>
              {date && <StyledDate>{date}</StyledDate>}
            </div>
          </HeaderGroup>
          {isPlayersVisible && (
            <ButtonGroup>
              {onShowHighscore && (
                <HighscoreButton
                  type="button"
                  aria-label={`highscore for ${nameOfGame}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowHighscore(nameOfGame);
                  }}
                >
                  🏆
                </HighscoreButton>
              )}
              <EditMatchButton
                type="button"
                aria-label={`edit match ${nameOfGame}`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/addgame', {
                    state: {
                      editGame: {
                        id,
                        nameOfGame,
                        players,
                        notes,
                        date,
                        gameImage
                      }
                    }
                  });
                }}
              >
                ✏️
              </EditMatchButton>
              <DeleteButton
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
              >
                <img src={bin} alt="delete game" width="18" height="18" />
              </DeleteButton>
            </ButtonGroup>
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
              <WinnerRow>
                {players[0]?.player && <td>👑 {players[0]?.player}</td>}
                {players[0]?.score && <td>{players[0]?.score}</td>}
              </WinnerRow>
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

const HeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 85%;
`;

const ButtonGroup = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const HighscoreButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  &:active {
    opacity: 0.7;
  }
`;

const EditMatchButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  &:active {
    opacity: 0.7;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  width: 25px;
  display: flex;
  justify-content: center;
  margin: 0;
  &:active {
    opacity: 0.7;
  }
`;

const StyledGameName = styled.h3`
  margin: 0;
  width: 85%;
  ${(props) => props.empty && `text-align: center; width: 100%`}
`;

const StyledDate = styled.span`
  font-family: 'Roboto';
  font-size: 12px;
  color: ${({ theme }) => theme.color.neonBlue};
  display: block;
  margin-top: 2px;
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

const WinnerRow = styled.tr`
  color: ${({ theme }) => theme.color.yellow};
  font-weight: bold;
`;
