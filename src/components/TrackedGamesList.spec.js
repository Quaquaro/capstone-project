import { render, screen } from '@testing-library/react';
import TrackedGamesList from './TrackedGamesList.js';
import Theme from '../Theme.js';

describe('TrackedGamesList', () => {
  it('renders name of game as a list item', () => {
    const nameOfGame = [{ nameOfGame: '7Wonders', playerName: 'Chris', score: '75', id: '5' }];
    render(
      <Theme>
        <TrackedGamesList games={nameOfGame} />
      </Theme>
    );
    expect(screen.getByText(/7wonders/i)).toBeInTheDocument();
  });
});
