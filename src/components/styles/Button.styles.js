import styled from 'styled-components';

export const Button = styled.button`
  background: ${({ theme }) => theme.color.glassBg || 'rgba(31, 31, 51, 0.75)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.color.neonBlue};
  border: 1.5px solid ${({ theme }) => theme.color.neonBlue};
  border-radius: 9999em;
  padding: 10px 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 240, 255, 0.2);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: ${({ theme }) => theme.color.neonBlue};
    color: ${({ theme }) => theme.color.primary};
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.6);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
  }
`;
