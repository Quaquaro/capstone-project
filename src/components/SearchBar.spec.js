import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar.js';
import Theme from '../Theme.js';

describe('SearchBar', () => {
  it('render a input and a label', () => {
    render(
      <Theme>
        <SearchBar />
      </Theme>
    );
    expect(screen.getByPlaceholderText('Search for game')).toBeInTheDocument();
  });
});
