import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import TrackGameFormPage from './TrackGameFormPage.js';
import Theme from '../Theme.js';

describe('TrackGameFormPage', () => {
  it('renders 9 textboxes and one button', () => {
    render(
      <MemoryRouter>
        <Theme>
          <TrackGameFormPage />
        </Theme>
      </MemoryRouter>
    );
    const allTextboxes = screen.getAllByRole('textbox');

    expect(allTextboxes.length).toBe(1);
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  it('should submit form data when all required inputs are filled', () => {
    const handleTrackGame = jest.fn();
    render(
      <MemoryRouter>
        <Theme>
          <TrackGameFormPage onTrackGame={handleTrackGame} />
        </Theme>
      </MemoryRouter>
    );
    const nameOfGameInput = screen.getByText(/name of game/i);
    const playernameInput = screen.getByText(/player one/i);
    const scoreInput = screen.getByPlaceholderText('1');
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
          <TrackGameFormPage onTrackGame={handleTrackGame} />
        </Theme>
      </MemoryRouter>
    );
    const nameOfGameInput = screen.getByText(/name of game/i);
    const submitButton = screen.getByRole('button', { name: /confirm/i });

    userEvent.type(nameOfGameInput, 'Dominion');
    userEvent.click(submitButton);

    expect(handleTrackGame).not.toHaveBeenCalledTimes(0);
  });
});