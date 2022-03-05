import { render, screen } from '@testing-library/react';
import Header from './Header.js';
import Theme from '../Theme.js';

describe('Header', () => {
  it('render...', () => {
    render(
      <Theme>
        <Header />
      </Theme>
    );
    screen.debug();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
