import styled from 'styled-components';
import logo from '../img/neonBlueDice.svg';

export default function Header() {
  return (
    <StyledHeader>
      <img src={logo} alt="Display dice as a logo" />

      <h1>TABULA RASA</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  padding-left: 10px;
  gap: 20px;
  font-family: 'Open Sans';
  font-variation-settings: 'wght' 600;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.secondary};
`;
