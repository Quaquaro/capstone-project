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
`;
