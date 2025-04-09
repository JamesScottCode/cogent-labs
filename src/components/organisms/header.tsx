import React from 'react';
import styled from 'styled-components';
import { headerHeight } from '../../consts/theme';
import { useScreenSize } from '../../contexts/screenSizeContext';
import { useHeaderContext } from '../../contexts/headerContext';
import Filters from '../molecules/filters';
import ThemedButton from '../atoms/button';

const HeaderWrapper = styled.header<{ $headerHeight: number }>`
  position: relative;
  background-color: rgba(0, 168, 198, 0.8);
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  height: ${(props) =>
    props.$headerHeight ? `${props.$headerHeight}px` : '75px'};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CenterSearchWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: ${({ theme }) => theme.fontHeader || '#ffffff'};
  font-weight: 600;
`;

const Logo = styled.img`
  height: 45px;
`;

const Header: React.FC = () => {
  const { screenSize } = useScreenSize();
  const { title } = useHeaderContext();

  return (
    <HeaderWrapper $headerHeight={headerHeight}>
      {screenSize === 'mobile' ? (
        <Logo src="/logo.png" alt="Logo" />
      ) : (
        <Title>{title}</Title>
      )}
      {screenSize === 'mobile' || screenSize === 'tablet' ? (
        <CenterSearchWrapper>
          <ThemedButton
            text="Filters"
            onClick={() => console.log('TODO: Open Modal')}
          ></ThemedButton>
        </CenterSearchWrapper>
      ) : (
        <CenterSearchWrapper>
          <Filters />
        </CenterSearchWrapper>
      )}
      {screenSize !== 'mobile' && <Logo src="/logo.png" alt="Logo" />}
    </HeaderWrapper>
  );
};

export default Header;
