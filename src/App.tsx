import { FC } from 'react';
import './App.css';
import styled from 'styled-components';
import AppProviders from './contexts/providers';
import Home from './components/pages/home';
import ModalContainer from './components/organisms/modal';
import Toast from './components/atoms/toast';

export const AppContainer = styled.div`
  background: ${({ theme }) => theme.background || '#ffffff'};
  text-align: center;
`;

const App: FC = () => {
  return (
    <AppProviders>
      <AppContainer>
        <Toast />
        <ModalContainer />
        <Home />
      </AppContainer>
    </AppProviders>
  );
};

export default App;
