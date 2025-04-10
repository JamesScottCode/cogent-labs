import { FC, useRef } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl/maplibre';
import styled from 'styled-components';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Feature, LineString } from 'geojson';
import { defaultCoordinates } from '../../consts/map';
import { theme } from '../../consts/theme';

const Container = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const SimpleMarker = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ theme }) => theme.highlight ?? 'red'};
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

const DistanceText = styled.span`
  font-weight: 600;
`;

interface StaticMapProps {
  distance?: number;
  latitude: number;
  longitude: number;
}

const mapStyle = process.env.REACT_APP_MAPTILER_API_KEY
  ? `https://api.maptiler.com/maps/jp-mierune-gray/style.json?key=${process.env.REACT_APP_MAPTILER_API_KEY}`
  : 'https://demotiles.maplibre.org/style.json';

const StaticMap: FC<StaticMapProps> = ({ distance, latitude, longitude }) => {
  const mapRef = useRef(null);

  const lineGeoJson: Feature<LineString, {}> = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [longitude, latitude],
        [defaultCoordinates.longitude, defaultCoordinates.latitude],
      ],
    },
    properties: {},
  };

  return (
    <Container>
      <Map
        mapLib={import('maplibre-gl')}
        initialViewState={{ latitude, longitude, zoom: 15 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        attributionControl={false}
        ref={mapRef}
      >
        <Source id="lineSource" type="geojson" data={lineGeoJson}>
          <Layer
            id="lineLayer"
            type="line"
            layout={{ 'line-join': 'round', 'line-cap': 'round' }}
            paint={{ 'line-color': theme.highlight, 'line-width': 3 }}
          />
        </Source>
        <Marker latitude={latitude} longitude={longitude} anchor="center">
          <SimpleMarker />
          <DistanceText>{distance}m</DistanceText>
        </Marker>
      </Map>
    </Container>
  );
};

export default StaticMap;
