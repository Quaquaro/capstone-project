import styled from 'styled-components';
import PropTypes from 'prop-types';
import SteppedProgress from '../components/SteppedProgress.js';
import DefaultButton from '../components/DefaultButton.js';
import Input from './Input.js';

TrackGameOne.propTypes = {
  onHandleChange: PropTypes.func,
  onRemoveFormFields: PropTypes.func,
  onAddFormFields: PropTypes.func,
  handleOnClickDot: PropTypes.func,
  handleOnClickBack: PropTypes.func,
  nameOfGame: PropTypes.string,
  players: PropTypes.array,
  datalistGameNames: PropTypes.object
};

export default function TrackGameOne({
  onHandleChange,
  nameOfGame,
  onRemoveFormFields,
  onAddFormFields,
  players,
  handleOnClickDot,
  handleOnClickBack,
  datalistGameNames
}) {
  return (
    <GameNameContainer>
      <SteppedProgress
        step={1}
        handleOnClick={handleOnClickDot}
        handleBackClick={handleOnClickBack}
      />
      <StyledInput
        list="games"
        name="nameOfGame"
        labelText="Name of game"
        placeholder="e.g. Uno"
        autocomplete="off"
        inputmode="text"
        type="text"
        required
        autoFocus
        onChange={onHandleChange}
        value={nameOfGame}
        maxLength={24}
      />
      <datalist id="games">
        {datalistGameNames.games?.map((game) => (
          <option key={game.id} value={game.name} />
        ))}
      </datalist>
      <StyledParagraph>How many people played along?</StyledParagraph>
      <FlexContainer>
        <CircleButton aria-label="decrease button" onClick={onRemoveFormFields}>
          +
        </CircleButton>
        <p>{players.length}</p>
        <CircleButton aria-label="increase button" onClick={onAddFormFields}>
          -
        </CircleButton>
      </FlexContainer>
    </GameNameContainer>
  );
}

const GameNameContainer = styled.div`
  margin-top: 42px;
  display: flex;
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
