import styled from 'styled-components';
import { AlertContainer } from './Alert.js';
import PropTypes from 'prop-types';
import cross from '../img/circle-cross.svg';
Notification.propTypes = {
  notification: PropTypes.string
};
Notification.defaultProps = {
  notification: 'Action was cancelled!'
};

export default function Notification({ notification }) {
  return (
    <MessageContainer>
      <img src={cross} width="16" alt="pink cross" />
      <h3>{notification}</h3>
    </MessageContainer>
  );
}

const MessageContainer = styled(AlertContainer)`
  color: ${(props) => props.theme.color.pink};
  border: 1px solid ${(props) => props.theme.color.pink};
`;
