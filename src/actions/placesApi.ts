import { defaultCoordinates } from '../consts/map';
import { FoursquarePlacesResponse } from '../types/places';
import { createLL } from '../utils/geo';
import { fsqFields } from '../consts/foursquare';

const { latitude, longitude } = defaultCoordinates;
const latLong = createLL(latitude, longitude);
const API_URL_TESTING = `https://api.foursquare.com/v3/places/search?ll=${latLong}&fields=${fsqFields}`;

export async function fetchPlaces(): Promise<FoursquarePlacesResponse> {
  const response = await fetch(API_URL_TESTING, {
    headers: {
      Authorization: process.env.REACT_APP_FOURSQUARE_API_KEY || '',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('not ok');
  }

  return response.json() as Promise<FoursquarePlacesResponse>;
}
