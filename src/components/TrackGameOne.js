import Input from './Input.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useCounter from '../hooks/useCounter.js';
import DefaultButton from '../components/DefaultButton.js';

TrackGameOne.propTypes = {
  onHandleChange: PropTypes.func,
  gameData: PropTypes.string
};

export default function TrackGameOne({ onHandleChange, gameData }) {
  const { count, increment, decrement } = useCounter({
    initialState: 2,
    step: 1,
    minCount: 1,
    maxCount: 6
  });
  return (
    <GameNameContainer>
      <StyledInput
        name="nameOfGame"
        labelText="Name of game"
        placeholder="e.g. Uno"
        autocomplete="on"
        inputmode="text"
        type="text"
        required
        autoFocus
        onChange={onHandleChange}
        value={gameData}
        maxLength={24}
      />
      <StyledParagraph>
        How many people played along?
        <br />
        (max. 6 players)
      </StyledParagraph>

      <FlexContainer>
        <CircleButton label="-" aria-label="decrease button" onClick={decrement}></CircleButton>
        <p>{count}</p>
        <CircleButton label="+" aria-label="increase button" onClick={increment}></CircleButton>
      </FlexContainer>
    </GameNameContainer>
  );
}

const GameNameContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  width: 335px;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: 'Roboto';
  font-size: 24px;
  margin: 20px 0;
`;
const CircleButton = styled(DefaultButton)`
  width: 64px;
  height: 64px;
  font-family: 'Roboto';
  font-size: 28px;
`;
