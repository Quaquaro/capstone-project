import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrackGameForm from './TrackGameForm.js';
import Theme from '../Theme.js';

describe('TrackGameForm', () => {
  it('renders one input and a button', () => {
    render(
      <Theme>
        <TrackGameForm />
      </Theme>
    );
    expect(screen.getByLabelText(/name of game/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /track game/i })).toBeInTheDocument();
  });

  it('renders a form', () => {
    render(
      <Theme>
        <TrackGameForm />
      </Theme>
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('should submit form data when input is filled', () => {
    const handleTrackGame = jest.fn();
    render(
      <Theme>
        <TrackGameForm onTrackGame={handleTrackGame} />
      </Theme>
    );
    const nameOfGameInput = screen.getByLabelText(/name of game/i);
    const submitButton = screen.getByRole('button', { name: /track game/i });

    userEvent.type(nameOfGameInput, 'Imperial Settlers');
    userEvent.click(submitButton);

    expect(handleTrackGame).toHaveBeenCalledWith({
      nameOfGame: 'Imperial Settlers'
    });

    it('should not submit if input is empty', () => {
      const handleTrackGame = jest.fn();
      render(
        <Theme>
          <TrackGameForm onTrackGame={handleTrackGame} />
        </Theme>
      );
      const nameOfGameInput = screen.getByLabelText(/name of game/i);
      const submitButton = screen.getByRole('button', { name: /track game/i });

      userEvent.click(submitButton);

      expect(nameOfGameInput.value).toBeFalsy();
    });
  });
});
