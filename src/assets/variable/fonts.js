import { createGlobalStyle } from 'styled-components';
import OpenSans from './OpenSans-VariableFont_wdth,wght.ttf';
import Roboto from '../static/Roboto-Medium.ttf';

export default createGlobalStyle`

@font-face {
  font-family: 'Open Sans';
  src: url(${OpenSans}) format('truetype');
}

@font-face {
  font-family: 'Roboto';
  src: url(${Roboto}) format('truetype');
}

`;
