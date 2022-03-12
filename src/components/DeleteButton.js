import styled from 'styled-components';
export default function DeleteButton() {
  return <StyledButton>DeleteButton</StyledButton>;
}

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.color.pink};
`;
