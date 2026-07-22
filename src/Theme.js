/* eslint-disable react/prop-types */
import { ThemeProvider } from 'styled-components';

const theme = {
  color: {
    primary: '#12121e',
    secondary: '#1f1f33',
    white: '#eefffd',
    green: '#31cc62',
    blue: '#0597f2',
    yellow: '#f2db05',
    pink: '#f631a7',
    neonBlue: '#00f0ff',
    glassBg: 'rgba(31, 31, 51, 0.65)',
    glassBorder: 'rgba(0, 240, 255, 0.25)',
    glassShadow: '0 8px 32px 0 rgba(0, 240, 255, 0.15)'
  }
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
