import { render, screen } from '@testing-library/react';
import TrackedGamesList from './TrackedGamesList.js';
import Theme from '../Theme.js';

describe('TrackedGamesList', () => {
  it('renders name of game as a list item', () => {
    render(
      <Theme>
        <TrackedGamesList nameOfGame="7Wonders" />
      </Theme>
    );
    expect(screen.getByText(/7wonders/i)).toBeInTheDocument();
  });
});
