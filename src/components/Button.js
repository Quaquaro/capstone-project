import styled from 'styled-components';
export default function Button() {
  return (
    <div>
      <TrackGameButton>TRACK GAME</TrackGameButton>
    </div>
  );
}

const TrackGameButton = styled.button`
  background-color: ${(props) => props.theme.color.neonBlue};
  border-radius: 20px;
  padding: 5px 15px;
  color: ${(props) => props.theme.color.primary};
  border: none;
  font-variation-settings: 'wght' 600;
  box-shadow: rgba(5, 242, 219, 0.4) 0px 5px;
  &:active {
    box-shadow: rgba(5, 242, 219, 0.4) 0px 5px, rgba(5, 242, 219, 0.3) 0px 10px,
      rgba(5, 242, 219, 0.2) 0px 15px, rgba(5, 242, 219, 0.1) 0px 20px,
      rgba(5, 242, 219, 0.05) 0px 25px;
  }
`;
