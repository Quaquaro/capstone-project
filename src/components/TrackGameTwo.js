import { useState } from 'react';
import styled from 'styled-components';
import Input from './Input.js';
import PropTypes from 'prop-types';
import SteppedProgress from './SteppedProgress.js';

TrackGameTwo.propTypes = {
  onHandleChange: PropTypes.func,
  handleOnClickDot: PropTypes.func,
  handleOnClickBack: PropTypes.func,
  players: PropTypes.array,
  playerGroups: PropTypes.array,
  onSelectGroup: PropTypes.func
};

export default function TrackGameTwo({
  onHandleChange,
  players,
  playerGroups = [],
  onSelectGroup,
  handleOnClickDot,
  handleOnClickBack
}) {
  const [startingPlayerIndex, setStartingPlayerIndex] = useState(null);

  const handleRandomizeStartPlayer = () => {
    const validIndices = players
      .map((p, idx) => (p.player && p.player.trim() !== '' ? idx : null))
      .filter((idx) => idx !== null);

    const pool = validIndices.length > 0 ? validIndices : players.map((_, idx) => idx);
    const randomIndex = pool[Math.floor(Math.random() * pool.length)];
    setStartingPlayerIndex(randomIndex);
  };

  return (
    <>
      <FlexColumnContainer>
        <SteppedProgress
          step={2}
          handleOnClick={handleOnClickDot}
          handleBackClick={handleOnClickBack}
        />
        {playerGroups.length > 0 && (
          <GroupSelectContainer>
            <SelectLabel htmlFor="group-select">LOAD GROUP 👥</SelectLabel>
            <StyledSelect
              id="group-select"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value && onSelectGroup) {
                  onSelectGroup(e.target.value);
                  e.target.value = '';
                }
              }}
            >
              <option value="" disabled>
                -- Choose Player Group --
              </option>
              {playerGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name} ({group.players.length} players)
                </option>
              ))}
            </StyledSelect>
          </GroupSelectContainer>
        )}
        <RandomizeButton type="button" onClick={handleRandomizeStartPlayer}>
          RANDOMIZE START PLAYER 🎲
        </RandomizeButton>
      </FlexColumnContainer>
      {players.map((element, index) => (
        <FlexContainer key={index}>
          <FlexColumnContainer>
            <StyledNameInput
              id={`player-${index + 1}`}
              name="player"
              labelText={`Player ${index + 1}`}
              autocomplete="off"
              inputmode="text"
              type="text"
              placeholder="Name"
              onChange={(e) => onHandleChange(index, e)}
              value={element.player}
              required
              maxLength={20}
            />
            {startingPlayerIndex === index && <StartBadge>🎲 STARTS FIRST!</StartBadge>}
          </FlexColumnContainer>
          <FlexColumnContainer>
            <StyledScoreInput
              id={`score-${index + 1}`}
              name="score"
              labelText="Score"
              type="text"
              inputmode="numeric"
              required
              placeholder="0"
              onChange={(e) => onHandleChange(index, e)}
              value={element.score}
              pattern="^-?([0-9]{1}|[0-9]{2}|[0-9]{3})$"
            />
          </FlexColumnContainer>
        </FlexContainer>
      ))}
    </>
  );
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 20px;
`;

export const FlexColumnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledScoreInput = styled(Input)`
  width: 85px;
`;

const StyledNameInput = styled(Input)`
  width: 190px;
`;

const GroupSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  gap: 4px;
`;

const SelectLabel = styled.label`
  font-family: 'Roboto';
  font-size: 12px;
  color: ${({ theme }) => theme.color.neonBlue};
  font-weight: bold;
`;

const StyledSelect = styled.select`
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.white};
  border-radius: 8px;
  padding: 6px 12px;
  font-family: 'Roboto';
  font-size: 13px;
  cursor: pointer;
`;

const RandomizeButton = styled.button`
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.neonBlue};
  border: 1px solid ${({ theme }) => theme.color.neonBlue};
  border-radius: 9999em;
  padding: 6px 16px;
  font-family: 'Roboto';
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.neonBlue};
    color: ${({ theme }) => theme.color.primary};
  }
`;

const StartBadge = styled.span`
  color: ${({ theme }) => theme.color.yellow};
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: bold;
  margin-top: 4px;
`;
