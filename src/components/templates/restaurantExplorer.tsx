import React from 'react';
import styled from 'styled-components';
import { ScreenSize, useScreenSize } from '../../contexts/screenSizeContext';
import { headerHeight } from '../../consts/theme';
import InteractiveMap from '../organisms/interactiveMap';
import ResultsList from '../organisms/resultsList';

const Container = styled.div<{ $screenSize: ScreenSize }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? 'column' : 'row'};
  height: calc(100vh - ${headerHeight}px);
`;

const RightDiv = styled.div<{ $screenSize: ScreenSize }>`
  box-sizing: border-box;
  flex: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? 'none' : '1'};
  height: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? '300px' : 'auto'};
  order: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? 1 : 2};
  padding: 1rem;
`;

const LeftDiv = styled.div<{ $screenSize: ScreenSize }>`
  box-sizing: border-box;
  flex: 1;
  order: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? 2 : 1};
`;

const RestaurantExplorer: React.FC = () => {
  const { screenSize } = useScreenSize();
  return (
    <Container $screenSize={screenSize}>
      <RightDiv $screenSize={screenSize}>
        <InteractiveMap />
      </RightDiv>
      <LeftDiv $screenSize={screenSize}>
        <ResultsList />
      </LeftDiv>
    </Container>
  );
};

export default RestaurantExplorer;
