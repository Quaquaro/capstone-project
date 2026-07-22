import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import CatalogManagementPage from './CatalogManagementPage.js';
import Theme from '../Theme.js';

jest.mock('axios');

Wrapper.propTypes = {
  children: PropTypes.node
};

function Wrapper({ children }) {
  return (
    <MemoryRouter>
      <Theme>{children}</Theme>
    </MemoryRouter>
  );
}

describe('CatalogManagementPage', () => {
  const mockGames = [
    { id: '1', name: 'Catan', image_url: '', default_player_count: 4 },
    { id: '2', name: 'Carcassonne', image_url: '', default_player_count: 2 }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { games: mockGames } });
    axios.post.mockResolvedValue({
      data: { id: '3', name: 'Dominion', image_url: '', default_player_count: null }
    });
    axios.delete.mockResolvedValue({ data: { message: 'Deleted' } });
  });

  it('renders catalog page title and games list', async () => {
    render(<CatalogManagementPage />, { wrapper: Wrapper });

    expect(screen.getByText(/board game catalog/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Catan')).toBeInTheDocument();
      expect(screen.getByText('Carcassonne')).toBeInTheDocument();
    });
  });

  it('allows adding a new game to the catalog', async () => {
    render(<CatalogManagementPage />, { wrapper: Wrapper });

    await waitFor(() => expect(screen.getByText('Catan')).toBeInTheDocument());

    userEvent.type(screen.getByLabelText(/game name/i), 'Dominion');
    userEvent.click(screen.getByRole('button', { name: /add to catalog/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/boardgames', {
        name: 'Dominion',
        image_url: '',
        default_player_count: null
      });
    });
  });

  it('allows deleting a game from the catalog', async () => {
    render(<CatalogManagementPage />, { wrapper: Wrapper });

    await waitFor(() => expect(screen.getByText('Catan')).toBeInTheDocument());

    userEvent.click(screen.getByRole('button', { name: /delete catan/i }));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('/api/boardgames/1');
    });
  });

  it('allows editing an existing game in the catalog', async () => {
    axios.put.mockResolvedValue({
      data: { id: '1', name: 'Catan Expanded', image_url: '', default_player_count: 4 }
    });
    render(<CatalogManagementPage />, { wrapper: Wrapper });

    await waitFor(() => expect(screen.getByText('Catan')).toBeInTheDocument());

    userEvent.click(screen.getByRole('button', { name: /edit catan/i }));

    const editInput = screen.getByLabelText(/edit name for catan/i);
    userEvent.clear(editInput);
    userEvent.type(editInput, 'Catan Expanded');
    userEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('/api/boardgames/1', {
        name: 'Catan Expanded',
        image_url: '',
        default_player_count: 4
      });
    });
  });
});
