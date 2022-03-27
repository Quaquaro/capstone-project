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
import ThreeDotsWave from '../components/ThreeDotsWave.js';
import { FlexColumnContainer } from '../components/TrackGameTwo.js';

// eslint-disable-next-line no-undef
const BOARDGAMEATLAS_CLIENT_ID = process.env.REACT_APP_BOARDGAMEATLAS_CLIENT_ID;

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
    url: `/api/search?limit=100&order_by=rank&fields=id,name,image_url&client_id=${BOARDGAMEATLAS_CLIENT_ID}`
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

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setGameData({ ...gameData, [name]: value });
  };

  const handleChangePlayer = (i, e) => {
    const newPlayers = [...players];
    newPlayers[i][e.target.name] = e.target.value;
    setPlayers(newPlayers);
    setGameData({ ...gameData, players });
  };

  const addFormFields = () => {
    setPlayers([...players, { player: '', score: '', id: nanoid() }]);
  };
  const removeFormFields = () => {
    if (players.length === 1) {
      return;
    }
    const newPlayers = [...players];
    newPlayers.splice(0, 1);
    setPlayers(newPlayers);
  };

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        score: 'score'
      };
      const sortProperty = types[type];
      const sorted = [...gameData.players].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setSortedPlayers(sorted);
    };
    sortArray('score');
  }, [gameData]);

  return (
    <PageSwitchAnimation>
      <FormContainer>
        <FormHeader error={error} />
        {loading ? (
          <FlexColumnContainer>
            <ThreeDotsWave />
          </FlexColumnContainer>
        ) : (
          <Form onSubmit={handleTrackGame} autocomplete="off">
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

  function handleTrackGame(event) {
    event.preventDefault();
    if (players[0].player === '') {
      nextStep();
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

  function nextStep(count) {
    const countOfPlayers = players.length;
    if (step === 3 || gameData.nameOfGame === '') return;
    if (step === 2 && players[countOfPlayers - 1].score === '') return;
    setStep((step) => step + count);
  }
  function prevStep(count) {
    setStep((step) => step - count);
  }
}

const FormContainer = styled.main`
  overflow-y: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 8fr 1fr;
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
