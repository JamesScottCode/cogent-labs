import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import Slider from './slider';
import { ScreenSizeProvider } from '../../contexts/screenSizeContext';

const Wrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <ScreenSizeProvider>{children}</ScreenSizeProvider>
);

describe('Slider', () => {
  const defaultProps = {
    value: 100,
    onChange: jest.fn(),
    onFinished: jest.fn(),
    min: 0,
    max: 200,
    step: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the slider and displays the current value', () => {
    render(
      <Wrapper>
        <Slider {...defaultProps} />
      </Wrapper>,
    );
    expect(screen.getByText('100')).toBeInTheDocument();
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input.value).toBe('100');
  });

  it('calls onChange when the slider value changes', () => {
    render(
      <Wrapper>
        <Slider {...defaultProps} />
      </Wrapper>,
    );
    const input = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '120' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(120);
  });

  it('calls onFinished on mouse up', () => {
    render(
      <Wrapper>
        <Slider {...defaultProps} />
      </Wrapper>,
    );
    const input = screen.getByRole('slider') as HTMLInputElement;
    input.value = '130';
    fireEvent.mouseUp(input);
    expect(defaultProps.onFinished).toHaveBeenCalledWith(130);
  });

  it('calls onFinished on touch end', () => {
    render(
      <Wrapper>
        <Slider {...defaultProps} />
      </Wrapper>,
    );
    const input = screen.getByRole('slider') as HTMLInputElement;
    input.value = '140';
    fireEvent.touchEnd(input);
    expect(defaultProps.onFinished).toHaveBeenCalledWith(140);
  });
});
