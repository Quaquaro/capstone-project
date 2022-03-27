import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TrackedGamesList from './TrackedGamesList.js';
import Theme from '../Theme.js';
import PropTypes from 'prop-types';

Wrapper.propTypes = {
  children: PropTypes.object
};

function Wrapper({ children }) {
  return (
    <MemoryRouter>
      <Theme>{children}</Theme>
    </MemoryRouter>
  );
}

describe('TrackedGamesList', () => {
  const nameOfGame = [
    {
      nameOfGame: '7Wonders',
      players: [
        { player: 'Gustav', score: '15' },
        { player: 'Alex', score: '10' },
        { player: 'Dan', score: '9' },
        { player: 'Jussy', score: '8' }
      ],
      id: '5',
      img_url: '',
      notes: 'This is a note for the next game'
    }
  ];
  it('renders name of game as a heading and a table with one row with player and score', () => {
    render(<TrackedGamesList games={nameOfGame} />, {
      wrapper: Wrapper
    });

    expect(screen.getByRole('heading', { name: /7Wonders/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /Gustav 15/i })).toBeInTheDocument();
  });
});
