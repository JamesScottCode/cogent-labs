import React from 'react';
import styled from 'styled-components';
// import InteractiveMap from "../organisms/interactiveMap";
import { ScreenSize, useScreenSize } from '../../contexts/screenSizeContext';
import { headerHeight } from '../../consts/theme';
import InteractiveMap from '../organisms/interactiveMap';

const Container = styled.div<{ $screenSize: ScreenSize }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? 'column' : 'row'};
  height: calc(100vh - ${headerHeight}px);
`;

const RightDiv = styled.div<{ $screenSize: ScreenSize }>`
  flex: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? 'none' : '1'};
  height: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? '300px' : 'auto'};
  padding: 1rem;
  box-sizing: border-box;
  order: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? 1 : 2};
`;

const LeftDiv = styled.div<{ $screenSize: ScreenSize }>`
  flex: 1;
  box-sizing: border-box;
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
        <div>PLACEHOLDER FOR RESTAURANT LIST</div>
      </LeftDiv>
    </Container>
  );
};

export default RestaurantExplorer;
