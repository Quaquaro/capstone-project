import { render, screen } from '@testing-library/react';
import Dialog from './Dialog.js';
import Theme from '../Theme.js';

describe('Dialog', () => {
  it('renders a dialog component with 2 buttons and 2 h tags', () => {
    render(
      <Theme>
        <Dialog message="Tolle Sache" nameOfGame="Game" />
      </Theme>
    );

    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getAllByRole('heading').length).toBe(2);
  });
});
