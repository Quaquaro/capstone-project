import styled from 'styled-components';
import PropTypes from 'prop-types';
import check from '../img/circle-check.svg';
import { motion } from 'framer-motion';

Alert.propTypes = {
  alertMessage: PropTypes.string
};

Alert.defaultProps = {
  alertMessage: 'Game was successfully deleted!'
};

export default function Alert({ alertMessage }) {
  return (
    <AlertContainer
      as={motion.div}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      initial={{ opacity: 0 }}
    >
      <img src={check} alt="check-hook" width="16" />
      <h3>{alertMessage}</h3>
    </AlertContainer>
  );
}

export const AlertContainer = styled.div`
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${(props) => props.theme.color.green};
  border: 1px solid ${({ theme }) => theme.color.green};
  border-radius: 20px;
  margin: 20px 20px 0;
  display: flex;
  gap: 10px;
  padding-left: 10px;
  justify-content: center;
  align-items: center;
`;
