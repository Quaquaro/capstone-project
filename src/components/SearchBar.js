import styled from 'styled-components';
import PropTypes from 'prop-types';

SearchBar.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

SearchBar.defaultProps = {
  placeholder: 'Search for game'
};

export default function SearchBar({ ...props }) {
  return (
    <>
      <SearchInput {...props} />
    </>
  );
}

const SearchInput = styled.input`
  align-self: center;
  border: none;
  border-radius: 25rem;
  width: 50%;
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.white};
  outline: none;
  margin: auto;
  padding: 0.75rem;
  font-size: 1rem;
  &:focus {
    box-shadow: 0 0 10px 4px rgba(238, 255, 253, 0.75);
  }
`;
