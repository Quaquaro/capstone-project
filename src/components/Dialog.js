import PropTypes from 'prop-types';
import styled from 'styled-components';
import DefaultButton from './DefaultButton.js';
import PrimaryButton from './PrimaryButton.js';
import { motion } from 'framer-motion';

Dialog.propTypes = {
  onDialog: PropTypes.func,
  message: PropTypes.string,
  nameOfGame: PropTypes.string
};

export default function Dialog({ onDialog, message, nameOfGame }) {
  return (
    <Background onClick={() => onDialog(false)}>
      <DialogBox
        onClick={(e) => e.stopPropagation()}
        as={motion.div}
        animate={{ y: -200, x: -125 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        <StyledPhrase>{message}</StyledPhrase>
        <h1>{nameOfGame}</h1>
        <ButtonContainer>
          <PinkButton onClick={() => onDialog(false)}>NO</PinkButton>
          <PrimaryButton onClick={() => onDialog(true)}>YES</PrimaryButton>
        </ButtonContainer>
      </DialogBox>
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

const DialogBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.color.primary};
  padding: 30px;
  border-radius: 20px;
  z-index: 100;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const PinkButton = styled(DefaultButton)`
  background-color: ${({ theme }) => theme.color.pink};
  box-shadow: rgba(246, 49, 167, 0.4) 0px 5px;
  &:active {
    box-shadow: rgba(246, 49, 167, 0.4) 0px 5px, rgba(246, 49, 167, 0.3) 0px 10px,
      rgba(246, 49, 167, 0.2) 0px 15px, rgba(246, 49, 167, 0.1) 0px 20px,
      rgba(246, 49, 167, 0.05) 0px 25px;
  }
`;

const StyledPhrase = styled.h3`
  text-align: center;
`;
