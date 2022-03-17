import Input from './Input.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useCounter from '../hooks/useCounter.js';

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
      <p>
        How many people played along?
        <br />
        (max. 6 players)
      </p>
      <p>{count}</p>
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
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
