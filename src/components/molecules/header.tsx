import React from 'react';
import styled from 'styled-components';
import { headerHeight } from '../../consts/theme';

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

const Header: React.FC = () => {
  return <HeaderWrapper $headerHeight={headerHeight}></HeaderWrapper>;
};

export default Header;
