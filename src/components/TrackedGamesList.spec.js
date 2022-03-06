import { render, screen } from '@testing-library/react';
import TrackedGamesList from './TrackedGamesList.js';

describe('TrackedGamesList', () => {
  it('renders name of game as a list item', () => {
    render(<TrackedGamesList nameOfGame="7Wonders" />);
    expect(screen.getByText(/7wonders/i)).toBeInTheDocument();
  });
});
