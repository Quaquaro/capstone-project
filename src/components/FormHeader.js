import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../img/greenDice.svg';
import cancel from '../img/Cancel.png';

export default function FormHeader() {
  const navigate = useNavigate('');
  return (
    <StyledHeader>
      <img src={logo} alt="Display dice as a logo" />
      <h1>TABULA RASA</h1>
      <CancelButton onClick={handleOnClick}>
        <img src={cancel} alt="A button with a X" width="70" aria-label="cancel" />
      </CancelButton>
    </StyledHeader>
  );

  async function handleOnClick(e) {
    e.preventDefault();
    navigate('/', { replace: true });
  }
}

const CancelButton = styled.button`
  outline: none;
  background: none;
  border: none;

  &:active {
    opacity: 0.7;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  font-family: 'Open Sans';
  font-variation-settings: 'wght' 600;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.secondary};
`;
