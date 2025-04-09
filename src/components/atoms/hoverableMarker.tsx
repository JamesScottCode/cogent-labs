import React, { useEffect, useState } from 'react';
import { Marker } from 'react-map-gl/maplibre';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import ResultListItem from '../molecules/resultListItem';
import { useScreenSize } from '../../contexts/screenSizeContext';
import { usePlacesStore } from '../../stores/placesStore';
import { Category } from '../../types/places';

interface HoverableMarkerProps {
  restaurant: {
    fsq_id: string;
    geocodes: { main: { latitude: number; longitude: number } };
    categories: Array<Category>;
  };
  mapRef: React.RefObject<any>;
  showCategory?: boolean;
}

const MarkerWrapper = styled.div<{
  $isHovered: boolean;
  $showCategory: boolean;
}>`
  background: ${({ theme, $isHovered }) =>
    $isHovered ? theme.highlight : 'grey'};
  width: ${({ $showCategory }) => ($showCategory ? '100%' : '15px')};
  height: 15px;
  border-radius: ${({ $showCategory }) => ($showCategory ? '8px' : '50%')};
  border: 2px solid white;
  cursor: pointer;
  position: relative;
  z-index: 10001;
  padding: ${({ $showCategory }) => ($showCategory ? '2px 2px 6px 2px' : '0')};
  padding: 0;
  color: white;
`;

const Tooltip = styled.div<{ $showCategory: boolean }>`
  background: white;
  border-radius: 8px;
`;

const TooltipPortal: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return ReactDOM.createPortal(
    <div style={{ position: 'absolute', ...style }}>{children}</div>,
    document.body,
  );
};

const HoverableMarker: React.FC<HoverableMarkerProps> = ({
  restaurant,
  mapRef,
  showCategory = false,
}) => {
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const {
    fsq_id,
    geocodes: {
      main: { latitude, longitude },
    },
    categories,
  } = restaurant;
  const {
    hoveredRestaurantId,
    setHoveredRestaurantId,
    selectedRestaurant,
    setSelectedRestaurant,
  } = usePlacesStore();
  const { screenSize } = useScreenSize();
  const selectedRestaurantId = selectedRestaurant?.fsq_id;
  const isSelected = selectedRestaurantId === fsq_id;

  const handleClick = () => {
    setDisplayTooltip(true);
    setSelectedRestaurant(fsq_id);
  };

  const handleMouseLeave = () => {
    setDisplayTooltip(false);
    setHoveredRestaurantId('');
  };

  useEffect(() => {
    if (isSelected && mapRef && mapRef.current) {
      const point = mapRef.current.project({ lat: latitude, lon: longitude });
      const container = mapRef.current.getContainer().getBoundingClientRect();
      setTooltipPosition({
        top: point.y + container.top,
        left: point.x + container.left,
      });
    }
  }, [isSelected, latitude, longitude, mapRef]);

  const displayedCategory = categories[0]?.short_name ?? '';

  return (
    <Marker latitude={latitude} longitude={longitude} anchor="center">
      <MarkerWrapper
        role="button"
        $isHovered={hoveredRestaurantId === fsq_id}
        onMouseEnter={() => setHoveredRestaurantId(fsq_id)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        $showCategory={showCategory}
      >
        {showCategory && displayedCategory}
        {displayTooltip &&
          isSelected &&
          selectedRestaurant &&
          screenSize !== 'mobile' && (
            <TooltipPortal
              style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left,
                transform: 'translate(-150px, -200px)',
                zIndex: 8000,
                display: 'fixed',
              }}
            >
              <Tooltip $showCategory={showCategory}>
                <ResultListItem
                  data={selectedRestaurant}
                  isTooltip={true}
                  id={fsq_id}
                />
              </Tooltip>
            </TooltipPortal>
          )}
      </MarkerWrapper>
    </Marker>
  );
};

export default HoverableMarker;
