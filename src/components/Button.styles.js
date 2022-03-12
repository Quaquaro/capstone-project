import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props) => props.theme.color.neonBlue};
  border-radius: 9999em;
  padding: 11px 20px;
  color: ${(props) => props.theme.color.primary};
  border: none;
  font-variation-settings: 'wght' 600;
  font-size: 20px;
  box-shadow: rgba(5, 242, 219, 0.4) 0px 5px;

  ${(props) => props.green && `box-shadow: rgba(49, 204, 98, 0.4) 0px 5px;`}
  &:active {
    box-shadow: rgba(5, 242, 219, 0.4) 0px 5px, rgba(5, 242, 219, 0.3) 0px 10px,
      rgba(5, 242, 219, 0.2) 0px 15px, rgba(5, 242, 219, 0.1) 0px 20px,
      rgba(5, 242, 219, 0.05) 0px 25px;
    ${(props) =>
      props.green &&
      `box-shadow: rgba(49, 204, 98, 0.4) 0px 5px, rgba(49, 204, 98, 0.3) 0px 10px,
      rgba(49, 204, 98, 0.2) 0px 15px, rgba(49, 204, 98, 0.1) 0px 20px,
      rgba(49, 204, 98, 0.05) 0px 25px;`}
  }
`;
