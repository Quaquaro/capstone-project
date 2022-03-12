import { Button } from './Button.styles.js';
import PropTypes from 'prop-types';

DefaultButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

DefaultButton.defaultProps = {
  label: 'DEFAULT'
};

export default function DefaultButton({ label, ...props }) {
  return (
    <>
      <Button type="button" {...props}>
        {label}
      </Button>
    </>
  );
}
