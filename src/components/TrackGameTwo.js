import styled from 'styled-components';
import Input from './Input.js';
import PropTypes from 'prop-types';

TrackGameTwo.propTypes = {
  onHandleChange: PropTypes.func,
  gameData: PropTypes.object
};

export default function TrackGameTwo({ onHandleChange, gameData }) {
  return (
    <>
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
            onChange={onHandleChange}
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
            onChange={onHandleChange}
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
            onChange={onHandleChange}
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
            onChange={onHandleChange}
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
            onChange={onHandleChange}
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
            onChange={onHandleChange}
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
            onChange={onHandleChange}
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
            onChange={onHandleChange}
            value={gameData.scoreFour}
            pattern="^([1-9]{1}|[0-9]{2}|[0-9]{3})$"
          />
        </ScoreContainer>
      </FlexContainer>
    </>
  );
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 20px;
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