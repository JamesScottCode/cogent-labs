import React, { useState } from 'react';
import styled from 'styled-components';
import Search from '../atoms/search';
import { ScreenSize, useScreenSize } from '../../contexts/screenSizeContext';
import Slider from '../atoms/slider';
import { usePlacesStore } from '../../stores/placesStore';

const Container = styled.div<{ $screenSize: ScreenSize }>`
  display: flex;
  flex-direction: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? 'column' : 'row'};
  justify-content: space-evenly;
  height: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? '200px' : 'auto'};
  width: ${({ $screenSize }) =>
    $screenSize === 'mobile'
      ? '300px'
      : $screenSize === 'tablet'
        ? '400px'
        : 'auto'};
`;

const Filters: React.FC = () => {
  const { radius, setRadius, limit, fetchPlaces } = usePlacesStore();
  const [searchText, setSearchText] = useState('');
  const { screenSize } = useScreenSize();

  const handleSubmit = () => {
    console.log('TODO: handle submit ');
  };

  const onSliderFinished = () => {
    const query = searchText ?? 'restaurant';
    fetchPlaces(query, limit);
  };

  return (
    <Container $screenSize={screenSize}>
      <Search
        value={searchText}
        onChange={(e) => {
          console.log(e.target.value);
          setSearchText(e.target.value);
        }}
        onSubmit={handleSubmit}
        placeholder="Search..."
      />

      <Slider
        value={radius}
        onChange={setRadius}
        onFinished={onSliderFinished}
      />
    </Container>
  );
};

export default Filters;
