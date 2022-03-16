import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TrackGameFormPage from './TrackGameFormPage.js';
import Theme from '../Theme.js';
import { wait } from '@testing-library/user-event/dist/utils';

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
    render(<TrackGameFormPage />, { wrapper: Wrapper });
    const testData = {
      nameOfGame: 'Test Game',
      playerNameOne: 'Test Player',
      scoreOne: 'Test Score'
    };

    expect(screen.getAllByRole('textbox').length).toBe(1);
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    userEvent.type(screen.getByText(/name Of Game/i), testData.nameOfGame);
    userEvent.click(screen.getByText(/continue/i));
    wait(() => expect(screen.getAllByPlaceholderText(/name/i).length).toBe(8));

    screen.debug;
  });

  // it('should submit form data when all required inputs are filled', () => {
  //   const handleTrackGame = jest.fn();
  //   render(
  //     <MemoryRouter>
  //       <Theme>
  //         <TrackGameFormPage onTrackGame={handleTrackGame} />
  //       </Theme>
  //     </MemoryRouter>
  //   );
  //   const nameOfGameInput = screen.getByText(/name of game/i);
  //   const playernameInput = screen.getByText(/player one/i);
  //   const scoreInput = screen.getByPlaceholderText('1');
  //   const submitButton = screen.getByRole('button', { name: /confirm/i });

  //   userEvent.type(nameOfGameInput, 'Imperial Settlers');
  //   userEvent.type(playernameInput, 'Max');
  //   userEvent.type(scoreInput, '75');
  //   userEvent.click(submitButton);

  //   expect(handleTrackGame).toHaveBeenCalledTimes(1);
  // });
  // it('should not submit if input is empty', () => {
  //   const handleTrackGame = jest.fn();
  //   render(
  //     <MemoryRouter>
  //       <Theme>
  //         <TrackGameFormPage onTrackGame={handleTrackGame} />
  //       </Theme>
  //     </MemoryRouter>
  //   );
  //   const nameOfGameInput = screen.getByText(/name of game/i);
  //   const submitButton = screen.getByRole('button', { name: /confirm/i });

  //   userEvent.type(nameOfGameInput, 'Dominion');
  //   userEvent.click(submitButton);

  //   expect(handleTrackGame).not.toHaveBeenCalledTimes(0);
  // });
});
