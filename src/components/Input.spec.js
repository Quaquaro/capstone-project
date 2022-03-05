import { render, screen } from '@testing-library/react';
import Input from './Input.js';
import Theme from './Theme.js';

describe('Input', () => {
  it('renders a label and a input', () => {
    render(
      <Theme>
        <Input labelText="Name of Game" placeholder="Monopoly..." name="nameOfGame" />
      </Theme>
    );
    expect(screen.getByLabelText(/name of game/i)).toHaveAttribute('placeholder', 'Monopoly...');
    expect(screen.getByLabelText(/name of game/i)).toHaveAttribute('name', 'nameOfGame');
  });
});
