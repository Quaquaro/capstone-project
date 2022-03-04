/* eslint-disable react/prop-types */
import { ThemeProvider } from 'styled-components';

const theme = {
  color: {
    primary: '#1B1B1B',
    secondary: '#313131',
    white: '#EEFFFD',
    green: '#31CC62',
    blue: '#0597F2',
    yellow: '#F2DB05',
    pink: '#F631A7',
    neonBlue: '#05F2DB'
  }
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
