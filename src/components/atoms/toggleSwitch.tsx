import { FC } from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.label`
  display: inline-block;
  height: 20px;
  position: relative;
  width: 40px;
  z-index: 12000;

  &::after {
    background: rgba(152, 152, 152, 0.8);
    border-radius: 4px;
    color: #fff;
    content: 'Show/Hide Map Labels';
    font-size: 10px;
    left: 100%;
    opacity: 0;
    padding: 4px 8px;
    pointer-events: none;
    position: absolute;
    text-align: center;
    transition: opacity 0.25s;
    transform: translateX(-50%);
    top: -15px;
    white-space: nowrap;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const SwitchInput = styled.input`
  height: 0;
  opacity: 0;
  width: 0;
`;

const SwitchSlider = styled.span`
  background-color: #ccc;
  border-radius: 20px;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.3s;

  &::before {
    background-color: white;
    border-radius: 50%;
    content: '';
    height: 14px;
    left: 3px;
    position: absolute;
    top: 3px;
    transition: 0.3s;
    width: 14px;
  }

  ${SwitchInput}:checked + & {
    background-color: #2196f3;
  }

  ${SwitchInput}:focus + & {
    box-shadow: 0 0 1px #2196f3;
  }

  ${SwitchInput}:checked + &:before {
    transform: translateX(20px);
  }
`;

const ToggleSwitch: FC<{ checked: boolean; onChange: () => void }> = ({
  checked,
  onChange,
}) => {
  return (
    <SwitchContainer>
      <SwitchInput type="checkbox" checked={checked} onChange={onChange} />
      <SwitchSlider />
    </SwitchContainer>
  );
};

export default ToggleSwitch;
