import styled from 'styled-components';
import { Button } from './Button.styles.js';
import PropTypes from 'prop-types';

PrimaryButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

PrimaryButton.defaultProps = {
  label: 'PRIMARY'
};

export default function PrimaryButton({ label, ...props }) {
  return (
    <>
      <ConfirmButton green type="submit" {...props}>
        {label}
      </ConfirmButton>
    </>
  );
}

const ConfirmButton = styled(Button)`
  background-color: ${(props) => props.theme.color.green};
`;
