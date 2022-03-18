import styled from 'styled-components';
import Input from './Input.js';
import PropTypes from 'prop-types';

TrackGameTwo.propTypes = {
  onHandleChange: PropTypes.func,
  players: PropTypes.array
};

export default function TrackGameTwo({ onHandleChange, players }) {
  return (
    <>
      {players.map((element, index) => (
        <FlexContainer key={index}>
          <PlayernameContainer>
            <StyledNameInput
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
          </PlayernameContainer>
          <ScoreContainer>
            <StyledScoreInput
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
          </ScoreContainer>
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
const PlayernameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ScoreContainer = styled.div`
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
