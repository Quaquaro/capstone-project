import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import TrackGameForm from './TrackGameForm.js';
import Theme from '../Theme.js';

describe('TrackGameForm', () => {
  it('renders three inputs and a button', () => {
    render(
      <MemoryRouter>
        <Theme>
          <TrackGameForm />
        </Theme>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/name of game/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/playername/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/score/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('should submit form data when all inputs are filled', () => {
    const handleTrackGame = jest.fn();
    render(
      <MemoryRouter>
        <Theme>
          <TrackGameForm onTrackGame={handleTrackGame} />
        </Theme>
      </MemoryRouter>
    );
    const nameOfGameInput = screen.getByLabelText(/name of game/i);
    const playernameInput = screen.getByLabelText(/playername/i);
    const scoreInput = screen.getByLabelText(/score/i);
    const submitButton = screen.getByRole('button', { name: /confirm/i });

    userEvent.type(nameOfGameInput, 'Imperial Settlers');
    userEvent.type(playernameInput, 'Max');
    userEvent.type(scoreInput, '75');
    userEvent.click(submitButton);

    expect(handleTrackGame).toHaveBeenCalledTimes(1);
  });
  it('should not submit if input is empty', () => {
    const handleTrackGame = jest.fn();
    render(
      <MemoryRouter>
        <Theme>
          <TrackGameForm onTrackGame={handleTrackGame} />
        </Theme>
      </MemoryRouter>
    );
    const nameOfGameInput = screen.getByLabelText(/name of game/i);
    const submitButton = screen.getByRole('button', { name: /confirm/i });

    userEvent.type(nameOfGameInput, 'Dominion');
    userEvent.click(submitButton);

    expect(handleTrackGame).not.toHaveBeenCalledTimes(0);
  });
});
