import { render, screen } from '@testing-library/react';
import TrackedGamesList from './TrackedGamesList.js';
import Theme from '../Theme.js';

describe('TrackedGamesList', () => {
  it('renders name of game as a list item inside the item is a player and a score and a button', () => {
    const nameOfGame = [
      {
        nameOfGame: '7Wonders',
        players: [
          { player: 'Gustav', score: '5' },
          { player: 'Alex', score: '4' },
          { player: 'Dan', score: '7' },
          { player: 'Jussy', score: '8' }
        ],
        id: '5'
      }
    ];
    render(
      <Theme>
        <TrackedGamesList games={nameOfGame} />
      </Theme>
    );
    expect(screen.getByText(/7wonders/i)).toBeInTheDocument();
    expect(screen.getByText(/gustav/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
