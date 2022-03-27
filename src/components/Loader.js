import styled, { keyframes } from 'styled-components';
export default function Loader() {
  return (
    <StyledContainer>
      <StyledItem>
        <StyledLoader></StyledLoader>
      </StyledItem>
    </StyledContainer>
  );
}

const loader = keyframes`
0%,  100% {transform:translateZ(calc(33px * -1)) scale(0.5);}
55% {transform: translateZ(33px)}
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledItem = styled.div`
  background: ${({ theme }) => theme.color.secondary};
  border-radius: 4px;
  display: grid;
  place-items: center;
`;

const StyledLoader = styled.i`
  border: 1px solid ${({ theme }) => theme.color.white};
  border-radius: 50%;
  perspective: 200px;
  aspect-ratio: 1/1;
  transform: rotateX(45deg) rotateY(25deg);
  transform-style: preserve-3d;
  position: relative;
  width: calc(200px / 2);
  display: block;
  display: grid;
  place-items: center;

  &::before,
  ::after {
    content: '';
    position: absolute;
    animation: ${loader} 1s cubic-bezier(0.39, 0.575, 0.565, 1) infinite;
  }

  &::before {
    width: 14px;
    aspect-ratio: 1/1;
    background: currentColor;
    border-radius: 50%;
    top: calc(50% - 10px / 2);
    left: calc(50% - 10px / 2);
    animation-delay: 300ms;
  }
  &::after {
    width: 66px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 1px dashed ${({ theme }) => theme.color.white};
  }
`;
