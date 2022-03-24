import styled from 'styled-components';
import PropTypes from 'prop-types';
import circlecheck from '../img/circle-check.svg';
import pinkCross from '../img/circle-cross.svg';

Input.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autocomplete: PropTypes.string,
  inputmode: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  pattern: PropTypes.string,
  id: PropTypes.string.isRequired,
  list: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  placeholder: 'What is on your mind?',
  labelText: 'Label ',
  id: 'name',
  value: 'value',
  autocomplete: 'off'
};

export default function Input({ name, labelText, ...props }) {
  return (
    <>
      <InputLabel htmlFor={name}>{labelText}</InputLabel>
      <InputBox name={name} {...props} id={name} />
    </>
  );
}

export const getColorWhite = ({ theme }) => theme.color.white;

export const InputBox = styled.input`
  border: 2px solid ${getColorWhite};
  border-radius: 9999em;
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${getColorWhite};
  font-family: inherit;
  font-size: 18px;
  padding: 5px 10px;
  margin: 10px 0;
  transition: 0.5s;
  text-align: center;
  &::placeholder {
    color: ${getColorWhite};
    opacity: 0.6;
    text-align: center;
  }
  &:focus {
    box-shadow: 0 0 10px 4px rgba(238, 255, 253, 0.75);
    outline: none;
  }
  &:valid {
    background: url(${circlecheck});
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 10px;
  }
  &:invalid {
    background: url(${pinkCross});
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 10px;
  }
`;

export const InputLabel = styled.label`
  font-family: 'Roboto';
  font-size: 24px;
`;
