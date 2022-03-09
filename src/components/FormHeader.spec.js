import { render, screen } from '@testing-library/react';
import FormHeader from './FormHeader.js';
import Theme from '../Theme.js';

describe('FormHeader', () => {
  it('renders a header with a img, a button and a h1', () => {
    render(
      <Theme>
        <FormHeader />
      </Theme>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
