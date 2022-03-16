import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TrackGameFormPage from './TrackGameFormPage.js';
import Theme from '../Theme.js';

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

describe('TrackGameFormPage', () => {
  it('Test the multi-step form', () => {
    render(<TrackGameFormPage />, {
      wrapper: Wrapper
    });

    const testData = {
      nameOfGame: 'Test Game',
      playerNameOne: 'Test Player',
      scoreOne: '44'
    };

    expect(screen.getAllByRole('textbox').length).toBe(1);
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    userEvent.type(screen.getByText(/name Of Game/i), testData.nameOfGame);
    userEvent.click(screen.getByText(/continue/i));
    expect(screen.getAllByPlaceholderText(/name/i).length).toBe(4);

    userEvent.type(screen.getByText(/player one/i), testData.playerNameOne);
    userEvent.type(screen.getAllByText(/score/i)[0], testData.scoreOne);
    userEvent.click(screen.getByRole('button', { name: /confirm/i }));
  });

  it('should not submit if input is empty', () => {
    const handleTrackGame = jest.fn();
    render(<TrackGameFormPage onTrackGame={handleTrackGame} />, { wrapper: Wrapper });
    const nameOfGameInput = screen.getByText(/name of game/i);

    userEvent.type(screen.getByText(/name Of Game/i), 'Tirvial');
    userEvent.click(screen.getByText(/continue/i));
    userEvent.type(nameOfGameInput, 'Dominion');
    const submitButton = screen.getByRole('button', { name: /confirm/i });
    userEvent.click(submitButton);

    expect(handleTrackGame).toHaveBeenCalledTimes(0);
  });
});
