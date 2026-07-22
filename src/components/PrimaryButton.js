import styled from 'styled-components';
import { Button } from './styles/Button.styles.js';
import PropTypes from 'prop-types';

PrimaryButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

PrimaryButton.defaultProps = {
  children: 'PRIMARY'
};

export default function PrimaryButton({ children, ...props }) {
  return (
    <ConfirmButton type="submit" {...props}>
      {children}
    </ConfirmButton>
  );
}

const ConfirmButton = styled(Button)`
  background: linear-gradient(135deg, #31cc62 0%, #10b981 100%);
  color: ${({ theme }) => theme.color.primary};
  border: none;
  box-shadow: 0 4px 20px rgba(49, 204, 98, 0.4);

  &:hover {
    background: linear-gradient(135deg, #38e06d 0%, #34d399 100%);
    color: ${({ theme }) => theme.color.primary};
    box-shadow: 0 0 25px rgba(49, 204, 98, 0.7);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 0 12px rgba(49, 204, 98, 0.5);
  }
`;
