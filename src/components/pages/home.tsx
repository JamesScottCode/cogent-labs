import React from 'react';
import styled from 'styled-components';
import Header from '../molecules/header';

export const HomeContainer = styled.div`
  background: ${({ theme }) => theme.background || '#ffffff'};
  height: 100vh;
  text-align: center;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Header />
    </HomeContainer>
  );
};

export default Home;
