import { Button } from './styles/Button.styles.js';
import PropTypes from 'prop-types';

DefaultButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

DefaultButton.defaultProps = {
  children: 'DEFAULT'
};

export default function DefaultButton({ children, ...props }) {
  return (
    <>
      <Button type="button" {...props}>
        {children}
      </Button>
    </>
  );
}
