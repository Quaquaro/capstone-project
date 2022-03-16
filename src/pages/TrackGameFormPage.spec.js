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
  const handleTrackGame = jest.fn();
  const testData = {
    nameOfGame: 'Test Game',
    playerName: 'Test Player',
    score: '44'
  };
  it('Test the multi-step form', async () => {
    render(<TrackGameFormPage onTrackGame={handleTrackGame} />, {
      wrapper: Wrapper
    });

    expect(screen.getAllByRole('textbox').length).toBe(1);
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    userEvent.type(screen.getByText(/name Of Game/i), testData.nameOfGame);
    userEvent.click(screen.getByText(/continue/i));
    expect(screen.getAllByLabelText(/player*/i).length).toBe(4);
    expect(screen.getAllByPlaceholderText(/(1|2|3|4)/).length).toBe(4);
    userEvent.type(screen.getByLabelText(/player one/i), testData.playerName);
    userEvent.type(screen.getByLabelText(/player two/i), testData.playerName);
    userEvent.type(screen.getByLabelText(/player three/i), testData.playerName);
    userEvent.type(screen.getByLabelText(/player four/i), testData.playerName);
    userEvent.type(screen.getByPlaceholderText('1'), testData.score);
    userEvent.type(screen.getByPlaceholderText('2'), testData.score);
    userEvent.type(screen.getByPlaceholderText('3'), testData.score);
    userEvent.type(screen.getByPlaceholderText('4'), testData.score);
    userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(handleTrackGame).toHaveBeenCalledTimes(1);
  });

  it('should not submit if input is empty', () => {
    render(<TrackGameFormPage onTrackGame={handleTrackGame} />, { wrapper: Wrapper });

    userEvent.type(screen.getByText(/name Of Game/i), testData.nameOfGame);
    userEvent.click(screen.getByText(/continue/i));
    userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(handleTrackGame).toHaveBeenCalledTimes(0);
  });
});
