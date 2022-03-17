import Input from './Input.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

TrackGameOne.propTypes = {
  onHandleChange: PropTypes.func,
  gameData: PropTypes.string
};

export default function TrackGameOne({ onHandleChange, gameData }) {
  const [count, setCount] = useState(2);
  const decrement = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };
  const increment = () => {
    if (count === 6) {
      return;
    }
    setCount(count + 1);
  };
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
      <p>{count}</p>{' '}
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
