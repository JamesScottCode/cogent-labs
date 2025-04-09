import { FC } from 'react';
import './App.css';
import styled from 'styled-components';
import AppProviders from './contexts/providers';
import Home from './components/pages/home';

export const AppContainer = styled.div`
  background: ${({ theme }) => theme.background || '#ffffff'};
  text-align: center;
`;

const App: FC = () => {
  return (
    <AppProviders>
      <AppContainer>
        <Home />
      </AppContainer>
    </AppProviders>
  );
};

export default App;
