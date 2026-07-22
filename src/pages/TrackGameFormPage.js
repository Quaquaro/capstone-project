import PageSwitchAnimation from '../components/PageSwitchAnimation.js';
import PropTypes from 'prop-types';
import FormHeader from '../components/FormHeader.js';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import TrackGameOne from '../components/TrackGameOne.js';
import TrackGameTwo from '../components/TrackGameTwo.js';
import TrackGameThree from '../components/TrackGameThree.js';
import PrimaryButton from '../components/PrimaryButton.js';
import DefaultButton from '../components/DefaultButton.js';
import backarrow from '../img/backarrow.svg';
import useAxios from '../hooks/useAxios.js';
import { FlexColumnContainer } from '../components/TrackGameTwo.js';
import Loader from '../components/Loader.js';

TrackGameFormPage.propTypes = {
  onTrackGame: PropTypes.func
};

const initialGameData = {
  nameOfGame: '',
  players: [
    { player: '', score: '', id: '' },
    { player: '', score: '', id: '' }
  ],
  notes: ''
};

export default function TrackGameFormPage({ onTrackGame }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const { response, loading, error } = useAxios({
    method: 'get',
    url: '/api/boardgames'
  });
  const [datalistGameNames, setDatalistGameNames] = useState({});

  useEffect(() => {
    if (response !== null) {
      setDatalistGameNames(response);
    }
  }, [response]);

  const [gameData, setGameData] = useState(initialGameData);
  const [players, setPlayers] = useState([
    { player: '', score: '', id: nanoid() },
    { player: '', score: '', id: nanoid() }
  ]);
  const [sortedPlayers, setSortedPlayers] = useState([]);

  const isScoreValid = (score) => {
    if (score === null || score === undefined) return false;
    const str = String(score).trim();
    if (str === '') return false;
    return /^-?\d{1,3}$/.test(str);
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setGameData({ ...gameData, [name]: value });
  };

  const handleChangePlayer = (i, e) => {
    const newPlayers = [...players];
    newPlayers[i][e.target.name] = e.target.value;
    setPlayers(newPlayers);
    setGameData({ ...gameData, players: newPlayers });
  };

  const addFormFields = () => {
    if (players.length === 8) {
      return;
    }
    const updatedPlayers = [...players, { player: '', score: '', id: nanoid() }];
    setPlayers(updatedPlayers);
    setGameData({ ...gameData, players: updatedPlayers });
  };

  const removeFormFields = () => {
    if (players.length === 1) {
      return;
    }
    const newPlayers = [...players];
    newPlayers.pop();
    setPlayers(newPlayers);
    setGameData({ ...gameData, players: newPlayers });
  };

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        score: 'score'
      };
      const sortProperty = types[type];
      const sorted = [...(gameData.players || players)].sort(
        (a, b) => Number(b[sortProperty] || 0) - Number(a[sortProperty] || 0)
      );
      setSortedPlayers(sorted);
    };
    sortArray('score');
  }, [gameData, players]);

  return (
    <PageSwitchAnimation>
      <FormContainer>
        <FormHeader error={error} />
        {loading ? (
          <FlexColumnContainer>
            <Loader />
          </FlexColumnContainer>
        ) : (
          <Form onSubmit={handleTrackGame} autoComplete="off">
            {step !== 1 && (
              <ButtonContainer left>
                <GoBackButton
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    prevStep(1);
                  }}
                >
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
              <TrackGameOne
                onHandleChange={handleChangeInput}
                onAddFormFields={addFormFields}
                onRemoveFormFields={removeFormFields}
                nameOfGame={gameData.nameOfGame}
                players={players}
                handleOnClickDot={nextStep}
                handleOnClickBack={prevStep}
                datalistGameNames={datalistGameNames}
              />
            )}
            {step === 2 && (
              <TrackGameTwo
                onHandleChange={handleChangePlayer}
                players={players}
                handleOnClickDot={nextStep}
                handleOnClickBack={prevStep}
              />
            )}
            {step === 3 && (
              <TrackGameThree
                onHandleChange={handleChangeInput}
                notes={gameData.notes}
                handleOnClickDot={nextStep}
                handleOnClickBack={prevStep}
              />
            )}
            <ButtonContainer>
              {step !== 3 && (
                <DefaultButton type="button" onClick={() => nextStep(1)}>
                  CONTINUE
                </DefaultButton>
              )}
              {step === 3 && <PrimaryButton type="submit">CONFIRM</PrimaryButton>}
            </ButtonContainer>
          </Form>
        )}
      </FormContainer>
    </PageSwitchAnimation>
  );

  function isStepTwoValid() {
    return players.every((p) => p.player && p.player.trim() !== '' && isScoreValid(p.score));
  }

  function handleTrackGame(event) {
    event.preventDefault();
    if (!gameData.nameOfGame || gameData.nameOfGame.trim() === '') {
      return;
    }
    if (!isStepTwoValid()) {
      return;
    }

    const filteredGameData = datalistGameNames.games
      ? datalistGameNames.games.filter((game) => game.name === gameData.nameOfGame)
      : [];

    onTrackGame({
      nameOfGame: gameData.nameOfGame,
      players: sortedPlayers,
      id: nanoid(),
      isPlayersVisible: false,
      notes: gameData.notes,
      img_url: filteredGameData[0]?.image_url || ''
    });
    setGameData(initialGameData);
    navigate('/', { replace: true });
  }

  function nextStep(count = 1) {
    if (step === 3) return;
    if (step === 1) {
      if (!gameData.nameOfGame || gameData.nameOfGame.trim() === '') return;
      setStep((step) => step + count);
    } else if (step === 2) {
      if (!isStepTwoValid()) return;
      setStep((step) => step + count);
    }
  }
  function prevStep(count = 1) {
    setStep((step) => Math.max(1, step - count));
  }
}

const FormContainer = styled.main`
  overflow-y: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 7fr 1fr;
  grid-row-gap: 5px;
`;

const GoBackButton = styled.button`
  margin-top: 10px;
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
