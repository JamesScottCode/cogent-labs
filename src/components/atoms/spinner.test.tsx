import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Loader from './spinner';

describe('Loader', () => {
  it('renders the loader container', () => {
    render(<Loader />);
    const container = screen.getByTestId('spinner-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the spinner', () => {
    render(<Loader />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
