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
        <Input
          name="nameOfGame"
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
        <Input
          name="playerName"
          labelText="Playername"
          autocomplete="off"
          inputmode="text"
          type="text"
          placeholder="Player one"
          onChange={handleChange}
          value={gameData.playerName}
          required
        />
        <Input
          name="score"
          labelText="Score"
          type="number"
          inputmode="number"
          required
          placeholder="777"
          onChange={handleChange}
          value={gameData.score}
        />
        <Button type="submit" />
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
