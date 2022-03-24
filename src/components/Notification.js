import styled from 'styled-components';
import { AlertContainer } from './Alert.js';
import PropTypes from 'prop-types';
import cross from '../img/circle-cross.svg';
import { motion } from 'framer-motion';
Notification.propTypes = {
  notification: PropTypes.string
};
Notification.defaultProps = {
  notification: 'Action was cancelled!'
};

export default function Notification({ notification }) {
  return (
    <MessageContainer
      as={motion.div}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      initial={{ opacity: 0 }}
    >
      <img src={cross} width="16" height="16" alt="" />
      <h3>{notification}</h3>
    </MessageContainer>
  );
}

const MessageContainer = styled(AlertContainer)`
  color: ${({ theme }) => theme.color.pink};
  border: 1px solid ${({ theme }) => theme.color.pink};
`;
