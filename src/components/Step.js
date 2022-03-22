import styled from 'styled-components';
import PropTypes from 'prop-types';

Step.propTypes = {
  bgcolor: PropTypes.func,
  handleClick: PropTypes.func,
  stepNumber: PropTypes.number
};

Step.defaultProps = {
  bgcolor: ({ theme }) => theme.color.white
};

export default function Step({ bgcolor, handleClick, stepNumber }) {
  return (
    <StyledStep bgcolor={bgcolor} onClick={handleClick}>
      {stepNumber}
    </StyledStep>
  );
}

const StyledStep = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.primary};
  border: 2px solid ${({ theme }) => theme.color.neonBlue};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.bgcolor};
`;
