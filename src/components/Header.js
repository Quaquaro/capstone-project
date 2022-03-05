import styled from 'styled-components';
import logo from '../img/neonBlueDice.svg';

export default function Header() {
  return (
    <Headline>
      <img src={logo} alt="Display dice as a logo" />
      <h1>TABULA LUDUS</h1>
    </Headline>
  );
}

const Headline = styled.header`
  display: flex;
  gap: 8px;
  font-family: 'Open Sans';
  font-variation-settings: 'wght' 600;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.secondary};
`;
