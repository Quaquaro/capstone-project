import styled from 'styled-components';
import Step from './Step.js';
import PropTypes from 'prop-types';

SteppedProgress.propTypes = {
  step: PropTypes.number
};

SteppedProgress.defaultProps = {
  step: 1
};

export default function SteppedProgress({ step }) {
  const getColorNeonBlue = ({ theme }) => theme.color.neonBlue;

  return (
    <Container>
      <Progress></Progress>
      {step === 1 && (
        <StepsContainer>
          <Step bgcolor={getColorNeonBlue} />
          <Step />
        </StepsContainer>
      )}
      {step === 2 && (
        <StepsContainer>
          <Step bgcolor={getColorNeonBlue} />
          <Step bgcolor={getColorNeonBlue} />
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
