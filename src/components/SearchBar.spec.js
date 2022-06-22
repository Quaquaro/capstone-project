import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar.js';

describe('SearchBar', () => {
  it('render a input and a label', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search for game')).toBeInTheDocument();
  });
});
