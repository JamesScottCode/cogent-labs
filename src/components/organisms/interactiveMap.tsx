import React, { useRef, useMemo } from 'react';
import Map, {
  NavigationControl,
  Source,
  Layer,
  Marker,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as turf from '@turf/turf';
import styled, { useTheme } from 'styled-components';
import { usePlacesStore } from '../../stores/placesStore';
import { defaultCoordinates } from '../../consts/map';
import { Place } from '../../types/places';

const Container = styled.div`
  border-radius: 8px;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const InteractiveMap: React.FC = () => {
  const { restaurants } = usePlacesStore();
  const mapRef = useRef<any>(null);

  const { latitude, longitude } = defaultCoordinates;

  const theme = useTheme();

  const mapStyle = process.env.REACT_APP_MAPTILER_API_KEY
    ? `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${process.env.REACT_APP_MAPTILER_API_KEY}`
    : 'https://demotiles.maplibre.org/style.json';

  // The map circle
  const circleGeoJson = useMemo(() => {
    const center = [longitude, latitude];

    const radius = 500; // TODO: replace with store/slider
    const radiusInKm = radius / 1000;
    const options = { steps: 64, units: 'kilometers' as turf.Units };
    return turf.circle(center, radiusInKm, options);
  }, [latitude, longitude]);

  return (
    <Container>
      <Map
        mapLib={import('maplibre-gl')}
        initialViewState={{ latitude, longitude, zoom: 15 }}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        mapStyle={mapStyle}
        attributionControl={false}
        ref={mapRef}
      >
        <NavigationControl
          style={{ position: 'absolute', top: 10, right: 10 }}
        />
        <Source
          id="circle-source"
          type="geojson"
          data={circleGeoJson}
          key={restaurants?.length}
        >
          <Layer
            id="circle-fill-layer"
            type={'fill' as any}
            paint={{
              'fill-color': theme.highlight ?? 'transparanet',
              'fill-opacity': 0.25,
            }}
          />
          <Layer
            id="circle-border-layer"
            type={'line' as any}
            paint={{
              'line-color': theme.highlight ?? '#00BCD4',
              'line-width': 2,
            }}
          />
        </Source>

        {restaurants?.map((restaurant: Place, index: number) => {
          const lat = restaurant.geocodes.main.latitude;
          const lon = restaurant.geocodes.main.longitude;

          return (
            <Marker latitude={lat} longitude={lon} key={restaurant.fsq_id}>
              <div
                style={{
                  background: 'red',
                  borderRadius: '50%',
                  height: 10,
                  width: 10,
                }}
              />
              {index}
            </Marker>
          );
        })}
      </Map>
    </Container>
  );
};

export default InteractiveMap;
