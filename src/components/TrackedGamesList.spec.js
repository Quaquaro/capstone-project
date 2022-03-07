import { render, screen } from '@testing-library/react';
import TrackedGamesList from './TrackedGamesList.js';
import Theme from '../Theme.js';

describe('TrackedGamesList', () => {
  it('renders name of game as a list item', () => {
    const nameOfGame = ['7Wonders'];
    render(
      <Theme>
        <TrackedGamesList nameOfGame={nameOfGame} />
      </Theme>
    );
    expect(screen.getByText(/7wonders/i)).toBeInTheDocument();
  });
});
