import Button from './Button.js';
import Input from './Input.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

TrackGameForm.propTypes = {
  onTrackGame: PropTypes.func
};

const initialGameData = {
  nameOfGame: '',
  playerName: '',
  score: ''
};

export default function TrackGameForm({ onTrackGame }) {
  const [gameData, setGameData] = useState(initialGameData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameData({ ...gameData, [name]: value });
  };
  return (
    <>
      <Form onSubmit={handleTrackGame}>
        <GameNameContainer>
          <Input
            name="nameOfGame"
            style={{ width: '350px' }}
            labelText="Name of game"
            placeholder="e.g. Uno"
            autocomplete="on"
            inputmode="text"
            type="text"
            required
            autofocus
            onChange={handleChange}
            value={gameData.nameOfGame}
          />
        </GameNameContainer>
        <PlayernameContainer>
          <Input
            name="playerName"
            style={{ width: '260px' }}
            labelText="Playername"
            autocomplete="off"
            inputmode="text"
            type="text"
            placeholder="Player one"
            onChange={handleChange}
            value={gameData.playerName}
            required
          />
        </PlayernameContainer>
        <ScoreContainer>
          <Input
            style={{ width: '80px' }}
            name="score"
            labelText="Score"
            type="number"
            inputmode="number"
            required
            placeholder="777"
            onChange={handleChange}
            value={gameData.score}
          />
        </ScoreContainer>
        <ButtonContainer>
          <Button type="submit" />
        </ButtonContainer>
      </Form>
    </>
  );

  function handleTrackGame(event) {
    event.preventDefault();
    onTrackGame({
      nameOfGame: gameData.nameOfGame,
      playerName: gameData.playerName,
      score: gameData.score
    });
    setGameData(initialGameData);
  }
}

const Form = styled.form`
  padding: 0 8px 0 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  place-content: center;
`;

const GameNameContainer = styled.div`
  grid-area: 1 / 1 / 2 / 4;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
`;

const PlayernameContainer = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ScoreContainer = styled.div`
  grid-area: 2 / 3 / 3 / 4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  grid-area: 3 / 1 / 4 / 4;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;
