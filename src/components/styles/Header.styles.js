import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  padding-left: 10px;
  align-items: center;
  gap: 20px;
  font-variation-settings: 'wght' 600;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.secondary};
`;
