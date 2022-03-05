import { render, screen } from '@testing-library/react';
import Header from './Header.js';
import Theme from '../Theme.js';

describe('Header', () => {
  it('renders a header with a img and a h1', () => {
    render(
      <Theme>
        <Header />
      </Theme>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
