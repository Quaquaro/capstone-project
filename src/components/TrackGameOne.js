import Input from './Input.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';

TrackGameOne.propTypes = {
  onHandleChange: PropTypes.func,
  gameData: PropTypes.string
};

export default function TrackGameOne({ onHandleChange, gameData }) {
  return (
    <>
      <GameNameContainer>
        <Input
          name="nameOfGame"
          style={{ width: '335px' }}
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
      </GameNameContainer>
    </>
  );
}

const GameNameContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
`;