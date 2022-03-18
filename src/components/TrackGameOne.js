import Input from './Input.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
//import useCounter from '../hooks/useCounter.js';
import DefaultButton from '../components/DefaultButton.js';

TrackGameOne.propTypes = {
  onHandleChange: PropTypes.func,
  onRemoveFormFields: PropTypes.func,
  onAddFormFields: PropTypes.func,
  nameOfGame: PropTypes.string,
  players: PropTypes.array
};

export default function TrackGameOne({
  onHandleChange,
  nameOfGame,
  onRemoveFormFields,
  onAddFormFields,
  players
}) {
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
        value={nameOfGame}
        maxLength={24}
      />
      <StyledParagraph>How many people played along?</StyledParagraph>

      <FlexContainer>
        <CircleButton
          label="-"
          aria-label="decrease button"
          onClick={onRemoveFormFields}
        ></CircleButton>
        <p>{players.length}</p>
        <CircleButton
          label="+"
          aria-label="increase button"
          onClick={onAddFormFields}
        ></CircleButton>
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
