import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HighscoreModal from './HighscoreModal.js';
import Theme from '../Theme.js';

describe('HighscoreModal', () => {
  const dummyGames = [
    {
      nameOfGame: 'Catan',
      date: '2026-07-20',
      players: [
        { player: 'Alice', score: '10' },
        { player: 'Bob', score: '8' }
      ]
    },
    {
      nameOfGame: 'Catan',
      date: '2026-07-21',
      players: [
        { player: 'Charlie', score: '12' },
        { player: 'Alice', score: '9' }
      ]
    }
  ];

  it('renders top scores in descending order', () => {
    const handleClose = jest.fn();
    render(
      <Theme>
        <HighscoreModal nameOfGame="Catan" games={dummyGames} onClose={handleClose} />
      </Theme>
    );

    expect(screen.getByText(/Catan Highscores/i)).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
