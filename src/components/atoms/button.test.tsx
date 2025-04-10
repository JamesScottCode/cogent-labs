import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../consts/theme';

import ThemedButton from './button';

describe('ThemedButton component', () => {
  it('renders the button with the provided text', () => {
    render(
      <ThemeProvider theme={theme}>
        <ThemedButton text="Click Me" />
      </ThemeProvider>,
    );
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('calls the onClick handler when the button is clicked', async () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <ThemedButton text="Click Me" onClick={handleClick} />
      </ThemeProvider>,
    );
    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
