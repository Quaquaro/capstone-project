import PropTypes from 'prop-types';
import FormHeader from '../components/FormHeader.js';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import TrackGameOne from '../components/TrackGameOne.js';
import TrackGameTwo from '../components/TrackGameTwo.js';
import PrimaryButton from '../components/PrimaryButton.js';
import DefaultButton from '../components/DefaultButton.js';
import backarrow from '../img/backarrow.svg';

AddGameFormPage.propTypes = {
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
  scoreFour: '',
  isPlayersVisible: false
};

export default function AddGameFormPage({ onTrackGame }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate('');

  const [gameData, setGameData] = useState(initialGameData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameData({ ...gameData, [name]: value });
  };

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
    <FormContainer>
      <FormHeader />
      <Form onSubmit={handleTrackGame}>
        {step !== 1 && (
          <ButtonContainer left>
            <GoBackButton onClick={prevStep}>
              <img
                src={backarrow}
                alt="A button with arrow points left"
                width="30"
                aria-label="go back to previous"
              />
            </GoBackButton>
          </ButtonContainer>
        )}
        {step === 1 && (
          <TrackGameOne onHandleChange={handleChange} gameData={gameData.nameOfGame} />
        )}
        {step === 2 && <TrackGameTwo onHandleChange={handleChange} gameData={gameData} />}
        <ButtonContainer>
          {step !== 2 && <DefaultButton type="button" label="CONTINUE" onClick={nextStep} />}
          {step === 2 && <PrimaryButton type="submit" label="CONFIRM" />}
        </ButtonContainer>
      </Form>
    </FormContainer>
  );

  async function handleTrackGame(event) {
    event.preventDefault();
    onTrackGame({
      nameOfGame: gameData.nameOfGame,
      players: sortedPlayers,
      id: nanoid(),
      isPlayersVisible: false
    });
    setGameData(initialGameData);
    navigate('/', { replace: true });
  }

  function nextStep() {
    if (step === 2) return;
    setStep((step) => step + 1);
  }
  function prevStep() {
    setStep((step) => step - 1);
  }
}

const FormContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 8fr 1fr;
  grid-row-gap: 50px;
`;
const GoBackButton = styled.button`
  outline: none;
  background: none;
  border: none;

  &:active {
    opacity: 0.7;
  }
`;
const Form = styled.form`
  @media (max-width: 500px) {
    align-self: start;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  ${(props) => props.left && `margin: 0 0 0 10px ; align-items:start;`}
`;
