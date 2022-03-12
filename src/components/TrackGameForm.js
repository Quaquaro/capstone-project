import PrimaryButton from './PrimaryButton.js';
import Input from './Input.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

TrackGameForm.propTypes = {
  onTrackGame: PropTypes.func
};

const initialGameData = {
  nameOfGame: '',
  playerNameOne: '',
  scoreOne: '',
  playerNameTwo: '',
  scoreTwo: '',
  playerNameThree: '',
  scoreThree: '',
  playerNameFour: '',
  scoreFour: ''
};

export default function TrackGameForm({ onTrackGame }) {
  const [gameData, setGameData] = useState(initialGameData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameData({ ...gameData, [name]: value });
  };
  const navigate = useNavigate('');
  const players = [
    { player: gameData.playerNameOne, score: gameData.scoreOne },
    { player: gameData.playerNameTwo, score: gameData.scoreTwo },
    { player: gameData.playerNameThree, score: gameData.scoreThree },
    { player: gameData.playerNameFour, score: gameData.scoreFour }
  ];
  const [sortedPlayers, setSortedPlayers] = useState([]);

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        score: 'score'
      };
      const sortProperty = types[type];
      const sorted = [...players].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setSortedPlayers(sorted);
    };
    sortArray('score');
  }, [gameData]);

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
            autoFocus
            onChange={handleChange}
            value={gameData.nameOfGame}
            maxLength={24}
          />
        </GameNameContainer>
        {/* ===========Player one================= */}
        <FlexContainer>
          <PlayernameContainer>
            <Input
              name="playerNameOne"
              style={{ width: '190px' }}
              labelText="Player one"
              autocomplete="off"
              inputmode="text"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              value={gameData.playerNameOne}
              required
              maxLength={20}
            />
          </PlayernameContainer>
          <ScoreContainer>
            <Input
              style={{ width: '85px' }}
              name="scoreOne"
              labelText="Score"
              type="text"
              inputmode="numeric"
              required
              placeholder="1"
              onChange={handleChange}
              value={gameData.scoreOne}
              pattern="^([1-9]{1}|[0-9]{2}|[0-9]{3})$"
            />
          </ScoreContainer>
        </FlexContainer>
        {/* ===========Player two================= */}
        <FlexContainer>
          <PlayernameContainer>
            <Input
              name="playerNameTwo"
              style={{ width: '190px' }}
              labelText="Player two"
              autocomplete="off"
              inputmode="text"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              value={gameData.playerNameTwo}
              maxLength={20}
            />
          </PlayernameContainer>
          <ScoreContainer>
            <Input
              style={{ width: '85px' }}
              name="scoreTwo"
              labelText="Score"
              type="text"
              inputmode="numeric"
              placeholder="2"
              onChange={handleChange}
              value={gameData.scoreTwo}
              pattern="^([1-9]{1}|[0-9]{2}|[0-9]{3})$"
            />
          </ScoreContainer>
        </FlexContainer>
        {/* ===========Player three================= */}
        <FlexContainer>
          <PlayernameContainer>
            <Input
              name="playerNameThree"
              style={{ width: '190px' }}
              labelText="Player three"
              autocomplete="off"
              inputmode="text"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              value={gameData.playerNameThree}
              maxLength={20}
            />
          </PlayernameContainer>
          <ScoreContainer>
            <Input
              style={{ width: '85px' }}
              name="scoreThree"
              labelText="Score"
              type="text"
              inputmode="numeric"
              placeholder="3"
              onChange={handleChange}
              value={gameData.scoreThree}
              pattern="^([1-9]{1}|[0-9]{2}|[0-9]{3})$"
            />
          </ScoreContainer>
        </FlexContainer>
        {/* ===========Player four================= */}
        <FlexContainer>
          <PlayernameContainer>
            <Input
              name="playerNameFour"
              style={{ width: '190px' }}
              labelText="Player four"
              autocomplete="off"
              inputmode="text"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              value={gameData.playerNameFour}
              maxLength={20}
            />
          </PlayernameContainer>
          <ScoreContainer>
            <Input
              style={{ width: '85px' }}
              name="scoreFour"
              labelText="Score"
              type="text"
              inputmode="numeric"
              placeholder="4"
              onChange={handleChange}
              value={gameData.scoreFour}
              pattern="^([1-9]{1}|[0-9]{2}|[0-9]{3})$"
            />
          </ScoreContainer>
        </FlexContainer>

        <ButtonContainer>
          <PrimaryButton label="CONFIRM" />
        </ButtonContainer>
      </Form>
    </>
  );

  async function handleTrackGame(event) {
    event.preventDefault();
    onTrackGame({
      nameOfGame: gameData.nameOfGame,
      players: sortedPlayers,
      id: nanoid()
    });
    setGameData(initialGameData);
    navigate('/', { replace: true });
  }
}

const Form = styled.form`
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
