import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

 * {
    box-sizing: border-box;
 }

:root {

  --black: rgb(27,27,27);
  --darkgrey: rgb(49,49,49);
  --green: rgb(49,204,98);
  --blue: rgb(5,151,242);
  --white: rgb(238,255,253);
  --yellow: rgb(249,219,5);
  --pink: rgb(246,49,167);
  --neon-blue: rgb(5,242,219);

}

 body {
    font-family: 'Open Sans';
    background-color: var(--black);
    color: var(--white);
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

 
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
  text-align: center;
}
`;
