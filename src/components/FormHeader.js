import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../img/greenDice.svg';
import cancel from '../img/circle-cross-thin.svg';
import { StyledHeader } from './styles/Header.styles.js';

export default function FormHeader() {
  const navigate = useNavigate();
  return (
    <StyledFormHeader>
      <FlexBox>
        <img
          src={logo}
          alt="Display dice as a logo"
          width="64"
          height="64"
          onClick={handleOnClick}
        />
        <h1>TABULA RASA</h1>
      </FlexBox>

      <IconButton onClick={handleOnClick}>
        <img src={cancel} alt="A button with a X" width="64" height="64" aria-label="cancel" />
      </IconButton>
    </StyledFormHeader>
  );

  async function handleOnClick(e) {
    e.preventDefault();
    navigate('/', { replace: true });
  }
}

const IconButton = styled.button`
  outline: none;
  background: none;
  border: none;

  &:active {
    opacity: 0.7;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledFormHeader = styled(StyledHeader)`
  justify-content: space-between;
  gap: 0;
`;
