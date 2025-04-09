import { useEffect, FC } from 'react';
import './App.css';
import styled from 'styled-components';
import AppProviders from './contexts/providers';
import Home from './components/pages/home';
import { fetchPlaces } from './actions/placesApi';

export const AppContainer = styled.div`
  background: ${({ theme }) => theme.background || '#ffffff'};
  text-align: center;
`;

const App: FC = () => {
  // Test call for new zustand store
  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return (
    <AppProviders>
      <AppContainer>
        <Home />
      </AppContainer>
    </AppProviders>
  );
};

export default App;
