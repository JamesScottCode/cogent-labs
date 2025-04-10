import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.background || '#fff'};
  border: 1px solid ${({ theme }) => theme.highlight || '#ccc'};
  border-radius: 8px;
  color: ${({ theme }) => theme.font || '#000'};
  cursor: pointer;
  display: inline-flex;
  font-size: 1rem;
  justify-content: center;
  margin-left: 5px;
  padding: 0.5rem 1rem;
`;

interface ButtonProps {
  onClick?: () => void;
  text?: string;
}

const ThemedButton: React.FC<ButtonProps> = ({ onClick, text = '' }) => {
  return <ButtonContainer onClick={onClick}>{text}</ButtonContainer>;
};

export default ThemedButton;
