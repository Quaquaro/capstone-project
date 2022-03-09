import { ConfirmButton } from './Button.js';
import Input from './Input.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate('');
  return (
    <>
      <Form onSubmit={handleTrackGame}>
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
            autofocus
            onChange={handleChange}
            value={gameData.nameOfGame}
            maxLength={24}
          />
        </GameNameContainer>
        <FlexContainer>
          <PlayernameContainer>
            <Input
              name="playerName"
              style={{ width: '190px' }}
              labelText="Playername"
              autocomplete="off"
              inputmode="text"
              type="text"
              placeholder="Player one"
              onChange={handleChange}
              value={gameData.playerName}
              required
              maxLength={20}
            />
          </PlayernameContainer>
          <ScoreContainer>
            <Input
              style={{ width: '85px' }}
              name="score"
              labelText="Score"
              type="number"
              inputmode="number"
              required
              placeholder="777"
              onChange={handleChange}
              value={gameData.score}
              min={0}
              max={999}
            />
          </ScoreContainer>
        </FlexContainer>

        <ButtonContainer>
          <ConfirmButton>CONFIRM</ConfirmButton>
        </ButtonContainer>
      </Form>
    </>
  );

  async function handleTrackGame(event) {
    event.preventDefault();
    onTrackGame({
      nameOfGame: gameData.nameOfGame,
      playerName: gameData.playerName,
      score: gameData.score,
      id: nanoid()
    });
    setGameData(initialGameData);
    navigate('/', { replace: true });
  }
}

const Form = styled.form`
  padding: 0 8px 0 15px;
  @media (max-width: 500px) {
    align-self: center;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 20px;
`;

const GameNameContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
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
const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;
