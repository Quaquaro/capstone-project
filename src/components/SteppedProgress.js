import styled from 'styled-components';
import Step from './Step.js';
import PropTypes from 'prop-types';

SteppedProgress.propTypes = {
  step: PropTypes.number,
  handleOnClick: PropTypes.func,
  handleBackClick: PropTypes.func
};

SteppedProgress.defaultProps = {
  step: 1
};

export default function SteppedProgress({ step, handleOnClick, handleBackClick }) {
  const getColorNeonBlue = ({ theme }) => theme.color.neonBlue;
  return (
    <Container>
      <Progress />
      {step === 1 && (
        <StepsContainer>
          <Step bgcolor={getColorNeonBlue} stepNumber={step} />
          <Step handleClick={() => handleOnClick(1)} stepNumber={step + 1} />
          <Step handleClick={() => handleOnClick(2)} stepNumber={step + 2} />
        </StepsContainer>
      )}
      {step === 2 && (
        <StepsContainer>
          <Step
            bgcolor={getColorNeonBlue}
            handleClick={() => handleBackClick(1)}
            stepNumber={step - 1}
          />
          <Step bgcolor={getColorNeonBlue} stepNumber={step} />
          <Step handleClick={() => handleOnClick(1)} stepNumber={step + 1} />
        </StepsContainer>
      )}
      {step === 3 && (
        <StepsContainer>
          <Step
            bgcolor={getColorNeonBlue}
            handleClick={() => handleBackClick(2)}
            stepNumber={step - 2}
          />
          <Step
            bgcolor={getColorNeonBlue}
            handleClick={() => handleBackClick(1)}
            stepNumber={step - 1}
          />
          <Step bgcolor={getColorNeonBlue} stepNumber={step} />
        </StepsContainer>
      )}
    </Container>
  );
}

const getColorNeonBlue = ({ theme }) => theme.color.neonBlue;

const Container = styled.div`
  margin: 45px 0 50px 0;
  display: flex;
  justify-content: center;
  transform: translate(0%, -50%);
`;

const Progress = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  border-bottom: 2px solid ${getColorNeonBlue};
  z-index: -1;
`;

const StepsContainer = styled.div`
  padding: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 335px;
`;
