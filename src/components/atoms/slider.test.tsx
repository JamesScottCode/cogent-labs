import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Slider from './slider';

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
    render(<Slider {...defaultProps} />);
    expect(screen.getByText('100')).toBeInTheDocument();
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input.value).toBe('100');
  });

  it('calls onChange when the slider value changes', () => {
    render(<Slider {...defaultProps} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '120' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(120);
  });

  it('calls onFinished on mouse up', () => {
    render(<Slider {...defaultProps} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    input.value = '130';
    fireEvent.mouseUp(input);
    expect(defaultProps.onFinished).toHaveBeenCalledWith(130);
  });

  it('calls onFinished on touch end', () => {
    render(<Slider {...defaultProps} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    input.value = '140';
    fireEvent.touchEnd(input);
    expect(defaultProps.onFinished).toHaveBeenCalledWith(140);
  });
});
