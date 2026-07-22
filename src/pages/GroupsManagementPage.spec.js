import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GroupsManagementPage from './GroupsManagementPage.js';
import Theme from '../Theme.js';
import PropTypes from 'prop-types';

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

describe('GroupsManagementPage', () => {
  const initialGroups = [{ id: '1', name: 'Friday Crew', players: ['Alice', 'Bob'] }];

  it('renders existing groups and allows opening new group form', () => {
    const handleSave = jest.fn();
    const handleDelete = jest.fn();

    render(
      <GroupsManagementPage
        groups={initialGroups}
        onSaveGroup={handleSave}
        onDeleteGroup={handleDelete}
      />,
      { wrapper: Wrapper }
    );

    expect(screen.getByText(/PLAYER GROUPS/i)).toBeInTheDocument();
    expect(screen.getByText('Friday Crew')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();

    const newBtn = screen.getByRole('button', { name: /\+ NEW GROUP/i });
    fireEvent.click(newBtn);
    expect(screen.getByText(/Create Player Group/i)).toBeInTheDocument();
  });
});
