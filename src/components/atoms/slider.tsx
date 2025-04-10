import React from 'react';
import styled from 'styled-components';
import { ScreenSize, useScreenSize } from '../../contexts/screenSizeContext';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  onFinished?: (value: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  align-items: center;
  margin-left: 20px;
`;

const RangeInput = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  margin: 0 10px;
  &::-webkit-slider-runnable-track {
    height: 4px;
    background: #e9e9e9;
    border-radius: 2px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 2px solid #1890ff;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #fff;
    margin-top: -6px;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
  }
  &:hover::-webkit-slider-thumb {
    box-shadow: 0 0 0 5px rgba(24, 144, 255, 0.2);
  }
  &::-moz-range-track {
    height: 4px;
    background: #e9e9e9;
    border-radius: 2px;
  }
  &::-moz-range-thumb {
    border: 2px solid #1890ff;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
  }
  &:hover::-moz-range-thumb {
    box-shadow: 0 0 0 5px rgba(24, 144, 255, 0.2);
  }
  &::-ms-track {
    height: 4px;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #e9e9e9;
    border-radius: 2px;
  }
  &::-ms-fill-upper {
    background: #e9e9e9;
    border-radius: 2px;
  }
  &::-ms-thumb {
    border: 2px solid #1890ff;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
  }
  &:hover::-ms-thumb {
    box-shadow: 0 0 0 5px rgba(24, 144, 255, 0.2);
  }
`;

const Text = styled.span<{ $screenSize: ScreenSize }>`
  color: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? 'black' : 'white'};
  font-size: 1rem;
  font-weight: 600;
`;

const Slider: React.FC<SliderProps> = ({
  min = 100,
  max = 1500,
  step = 50,
  value,
  onChange,
  onFinished,
}) => {
  const { screenSize } = useScreenSize();

  const finish = (val: string) => {
    onFinished && onFinished(Number(val));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <Wrapper>
      <Text $screenSize={screenSize}>Distance: </Text>
      <RangeInput
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onMouseUp={(e) => finish(e.currentTarget.value)}
        onTouchEnd={(e) => finish(e.currentTarget.value)}
      />
      <Text $screenSize={screenSize}>{value}</Text>
    </Wrapper>
  );
};

export default Slider;
