import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

TrackedGamesList.propTypes = {
  nameOfGame: PropTypes.string
};

export default function TrackedGamesList({ nameOfGame }) {
  return (
    <StyledList role="list">
      <Card>
        <CardContent>{nameOfGame}</CardContent>
      </Card>
    </StyledList>
  );
}

const spin = keyframes`
0% {background-position: top center;}
100% {background-position: bottom center;}
`;

const Card = styled.div`
  width: 250px;
  height: 45px;
  position: relative;
  z-index: 2;
  border-radius: 20px;

  &::before,
  ::after {
    content: '';
    width: 260px;
    height: 55px;
    display: block;
    position: absolute;
    z-index: -1;
    border-radius: 20px;
    background-image: linear-gradient(
      0,
      ${(props) => props.theme.color.pink},
      ${(props) => props.theme.color.neonBlue}
    );
    background-size: 100% 200%;
    background-position: center center;
    top: -5px;
    left: -5px;
    animation: ${spin} 4000ms infinite alternate;
  }
  &::after {
    filter: blur(62px);
  }
`;

const CardContent = styled.li`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 15px;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 60px 0;
`;
