import React from 'react';
import styled, { keyframes } from 'styled-components';

const SpinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerInner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${({ theme }) => theme.highlight || 'blue'};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  animation: ${SpinAnimation} 1s linear infinite;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const Spinner: React.FC = () => (
  <Container data-testid="spinner-container">
    <SpinnerInner data-testid="spinner" />
  </Container>
);

export default Spinner;
