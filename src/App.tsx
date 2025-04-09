import { FC, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import AppProviders from './contexts/providers';
import Home from './components/pages/home';
import { usePlacesStore } from './stores/placesStore';
import ModalContainer from './components/organisms/modal';

export const AppContainer = styled.div`
  background: ${({ theme }) => theme.background || '#ffffff'};
  text-align: center;
`;

const App: FC = () => {
  const { fetchPlaces } = usePlacesStore();

  // Load some places to help with developement
  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return (
    <AppProviders>
      <AppContainer>
        <ModalContainer />
        <Home />
      </AppContainer>
    </AppProviders>
  );
};

export default App;
