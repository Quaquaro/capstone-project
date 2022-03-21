import styled from 'styled-components';
import { InputLabel } from './Input.js';
import PropTypes from 'prop-types';

Textarea.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  autocomplete: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  spellcheck: PropTypes.bool,
  rows: PropTypes.number,
  cols: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func
};

Textarea.defaultProps = {
  labelText: 'Notes',
  name: 'notes',
  id: 'notes',
  autocomplete: 'off',
  maxLength: 200,
  placeholder: 'Enter your notes here...',
  spellcheck: true,
  rows: 8,
  cols: 25,
  value: '',
  onChange: ''
};

export default function Textarea({ name, labelText, ...props }) {
  return (
    <>
      <InputLabel htmlFor={name}>{labelText}</InputLabel>
      <TextareaBox {...props} id={name} />
    </>
  );
}
export const getColorWhite = ({ theme }) => theme.color.white;

const TextareaBox = styled.textarea`
  border: 2px solid ${getColorWhite};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${getColorWhite};
  font-family: inherit;
  font-size: 18px;
  padding: 5px 10px;
  margin: 10px 0;
  resize: none;
  transition: 0.5s;
  &::placeholder {
    color: ${getColorWhite};
    opacity: 0.6;
    text-align: center;
  }
  &:focus {
    box-shadow: 0 0 10px 4px rgba(238, 255, 253, 0.75);
    outline: none;
  }
`;
