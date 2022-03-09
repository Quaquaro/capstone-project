import styled from 'styled-components';
export default function Button() {
  return (
    <>
      <TrackGameButton>TRACK GAME</TrackGameButton>
      <ConfirmButton>CONFIRM</ConfirmButton>
    </>
  );
}

export const TrackGameButton = styled.button`
  background-color: ${(props) => props.theme.color.neonBlue};
  border-radius: 9999em;
  padding: 5px 15px;
  color: ${(props) => props.theme.color.primary};
  border: none;
  font-variation-settings: 'wght' 600;
  font-size: 24px;
  box-shadow: rgba(5, 242, 219, 0.4) 0px 5px;
  &:active {
    box-shadow: rgba(5, 242, 219, 0.4) 0px 5px, rgba(5, 242, 219, 0.3) 0px 10px,
      rgba(5, 242, 219, 0.2) 0px 15px, rgba(5, 242, 219, 0.1) 0px 20px,
      rgba(5, 242, 219, 0.05) 0px 25px;
  }
`;

export const ConfirmButton = styled.button`
  background-color: ${(props) => props.theme.color.green};
  border-radius: 9999em;
  padding: 5px 15px;
  color: ${(props) => props.theme.color.primary};
  border: none;
  font-variation-settings: 'wght' 600;
  font-size: 24px;
  box-shadow: rgba(49, 204, 98, 0.4) 0px 5px;
  &:active {
    box-shadow: rgba(49, 204, 98, 0.4) 0px 5px, rgba(49, 204, 98, 0.3) 0px 10px,
      rgba(49, 204, 98, 0.2) 0px 15px, rgba(49, 204, 98, 0.1) 0px 20px,
      rgba(49, 204, 98, 0.05) 0px 25px;
  }
`;
