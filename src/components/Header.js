import logo from '../img/neonBlueDice.svg';
import { StyledHeader } from './Header.styles.js';

export default function Header() {
  return (
    <StyledHeader>
      <img src={logo} width="64" height="64" alt="Display dice as a logo" />

      <h1>TABULA RASA</h1>
    </StyledHeader>
  );
}
