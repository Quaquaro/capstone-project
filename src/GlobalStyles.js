import { createGlobalStyle } from 'styled-components';
// import OpenSans from './assets/variable/OpenSans-VariableFont_wdth,wght.ttf';

export default createGlobalStyle`

 * {
    box-sizing: border-box;
 }
 body {
    font-family: 'Open Sans';
    background-color: #1B1B1B;
    color: #EEFFFD;
    margin: 0;
    padding: 0;
 }
 .sr-only{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
 }
`;
