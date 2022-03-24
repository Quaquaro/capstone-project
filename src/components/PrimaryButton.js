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
    <>
      <ConfirmButton green type="submit" {...props}>
        {children}
      </ConfirmButton>
    </>
  );
}

const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.green};
`;
