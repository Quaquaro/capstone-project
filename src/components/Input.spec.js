import { render, screen } from '@testing-library/react';
import Input from './Input.js';
import Theme from '../Theme.js';

describe('Input', () => {
  it('renders a label and a input', () => {
    render(
      <Theme>
        <Input labelText="Name of Game" placeholder="Monopoly..." name="nameOfGame" />
      </Theme>
    );

    const inputElement = screen.getByRole('textbox');
    expect(screen.getByLabelText('Name of Game')).toBeInTheDocument;
    expect(inputElement).toHaveAttribute('placeholder', 'Monopoly...');
    expect(inputElement).toHaveAttribute('name', 'nameOfGame');
  });
});
