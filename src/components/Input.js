import styled from 'styled-components';
import PropTypes from 'prop-types';

Input.propTypes = {
  name: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autocomplete: PropTypes.string,
  inputmode: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.any,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
};

export default function Input({
  name,
  labelText,
  required,
  placeholder,
  autocomplete,
  inputmode,
  onChange,
  type,
  value,
  style,
  maxLength,
  max,
  min
}) {
  return (
    <>
      <InputLabel htmlFor={name}>{labelText}</InputLabel>
      <InputBox
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        autocomplete={autocomplete}
        inputmode={inputmode}
        value={value}
        onChange={onChange}
        style={style}
        maxLength={maxLength}
        min={min}
        max={max}
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
  margin: 10px 10px;
  transition: 0.5s;
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
