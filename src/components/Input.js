import styled from 'styled-components';
import PropTypes from 'prop-types';

Input.propTypes = {
  name: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  autocomplete: PropTypes.string,
  inputmode: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string
};

export default function Input({
  name,
  labelText,
  required,
  placeholder,
  value,
  autocomplete,
  inputmode,
  type
}) {
  return (
    <>
      <InputLabel htmlFor={name}>{labelText}</InputLabel>
      <InputBox
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        autocomplete={autocomplete}
        inputmode={inputmode}
      />
    </>
  );
}

const InputBox = styled.input`
  border: 2px solid ${(props) => props.theme.color.white};
  border-radius: 9999em;
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.white};
  font-family: inherit;
  font-size: 18px;
  padding: 5px 10px;
  margin: 10px 0;
  transition: 0.5s;
  width: 350px;
  &::placeholder {
    color: ${(props) => props.theme.color.white};
    opacity: 0.6;
  }
  &:focus {
    box-shadow: 0 0 10px 4px rgba(238, 255, 253, 0.75);
    outline: none;
  }
`;

const InputLabel = styled.label`
  font-family: 'Roboto';
  font-size: 24px;
`;
