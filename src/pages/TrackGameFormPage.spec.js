import { render, screen, waitFor } from '@testing-library/react';
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
  const mockLoading = false;
  jest.mock('../hooks/useAxios.js', () => {
    return jest.fn(() => ({ loading: mockLoading }));
  });
  const testData = {
    nameOfGame: 'Test Game',
    playerName: 'Test Player',
    score: '44'
  };
  it('Test the multi-step form', async () => {
    render(<TrackGameFormPage onTrackGame={handleTrackGame} />, {
      wrapper: Wrapper
    });
    await waitFor(() => expect(screen.getByText(/name of game/i).toBeInTheDocument), {
      timeout: 10000
    });
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    userEvent.type(screen.getByText(/name Of Game/i), testData.nameOfGame);
    userEvent.click(screen.getAllByRole('button')[2]);
    userEvent.click(screen.getByText(/continue/i));
    expect(screen.getAllByText(/player*/i).length).toBe(3);
    expect(screen.getAllByPlaceholderText(/0/).length).toBe(3);
    userEvent.type(screen.getByLabelText(/player 1/i), testData.playerName);
    userEvent.type(screen.getByLabelText(/player 2/i), testData.playerName);
    userEvent.type(screen.getByLabelText(/player 3/i), testData.playerName);
    userEvent.type(screen.getAllByPlaceholderText('0')[0], testData.score);
    userEvent.type(screen.getAllByPlaceholderText('0')[1], testData.score);
    userEvent.type(screen.getAllByPlaceholderText('0')[2], testData.score);
    userEvent.click(screen.getByText(/continue/i));
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(handleTrackGame).toHaveBeenCalledTimes(1);
  });

  it('should not submit if input is empty', async () => {
    render(<TrackGameFormPage onTrackGame={handleTrackGame} />, { wrapper: Wrapper });
    await waitFor(() => expect(screen.getByText(/name of game/i).toBeInTheDocument), {
      timeout: 10000
    });
    userEvent.type(screen.getByText(/name Of Game/i), testData.nameOfGame);
    userEvent.click(screen.getByText(/continue/i));
    userEvent.type(screen.getByLabelText(/player 1/i), testData.playerName);
    userEvent.type(screen.getByLabelText(/player 2/i), testData.playerName);
    userEvent.type(screen.getAllByPlaceholderText('0')[1], testData.score);
    userEvent.click(screen.getByText(/continue/i));
    expect(handleTrackGame).toHaveBeenCalledTimes(0);
  });
});
