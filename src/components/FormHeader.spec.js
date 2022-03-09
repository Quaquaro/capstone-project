import { render, screen } from '@testing-library/react';
import FormHeader from './FormHeader.js';
import Theme from '../Theme.js';
import { MemoryRouter } from 'react-router-dom';

describe('FormHeader', () => {
  it('renders a header with a img, a button and a h1', () => {
    render(
      <MemoryRouter>
        <Theme>
          <FormHeader />
        </Theme>
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByAltText(/dice/)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
