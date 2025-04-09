import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background || '#fff'};
  border: 1px solid ${({ theme }) => theme.highlight || '#ccc'};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.font || '#000'};
  cursor: pointer;
`;

interface ButtonProps {
  onClick?: () => void;
  text?: string;
}

const ThemedButton: React.FC<ButtonProps> = ({ onClick, text = '' }) => {
  return <ButtonContainer onClick={onClick}>{text}</ButtonContainer>;
};

export default ThemedButton;
