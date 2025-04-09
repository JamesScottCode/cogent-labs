import React from 'react';
import styled from 'styled-components';
import Header from '../organisms/header';
import RestaurantExplorer from '../templates/restaurantExplorer';

export const HomeContainer = styled.div`
  background: ${({ theme }) => theme.background || '#ffffff'};
  height: 100vh;
  text-align: center;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Header />
      <RestaurantExplorer />
    </HomeContainer>
  );
};

export default Home;
