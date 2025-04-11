import { defaultCoordinates } from '../consts/map';
import { FoursquarePlacesResponse } from '../types/places';
import { createLL } from '../utils/geo';
import { fsqFields } from '../consts/foursquare';

export async function rawFetchPlaces(
  query: string,
  limit = 10,
  radius?: number,
  cursor?: string,
  sort?: string,
): Promise<{
  results: FoursquarePlacesResponse['results'];
  nextCursor?: string;
}> {
  const { latitude, longitude } = defaultCoordinates;
  const ll = createLL(latitude, longitude);

  const params: Record<string, string> = {
    query,
    ll,
    limit: String(limit),
  };
  if (radius) {
    params.radius = String(radius);
  }
  if (cursor) {
    params.cursor = cursor;
  }
  if (sort) {
    params.sort = sort;
  }

  const queryString = new URLSearchParams(params).toString();
  const API_URL = `https://api.foursquare.com/v3/places/search?${queryString}&fields=${fsqFields}`;

  const response = await fetch(API_URL, {
    headers: {
      Authorization: process.env.REACT_APP_FOURSQUARE_API_KEY || '',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  const data = (await response.json()) as FoursquarePlacesResponse;

  let nextCursor: string | undefined;
  const linkHeader = response.headers.get('link');
  if (linkHeader) {
    const match = linkHeader.match(/cursor=([^&>]+)/);
    if (match) {
      nextCursor = match[1];
    }
  }

  return { results: data.results, nextCursor };
}

export let lastCall = 0;
export let timestamps: number[] = [];

export async function safeFetchPlaces(
  query: string,
  limit = 10,
  radius?: number,
  cursor?: string,
  sort?: string,
): Promise<{
  results: FoursquarePlacesResponse['results'];
  nextCursor?: string;
}> {
  const now = Date.now();

  if (now - lastCall < 500) {
    throw new Error('Please wait before making another request.');
  }

  timestamps = timestamps.filter((t) => t > now - 60000);
  if (timestamps.length >= 50) {
    throw new Error('Rate limit exceeded. Try again later.');
  }

  lastCall = now;
  timestamps.push(now);

  return rawFetchPlaces(query, limit, radius, cursor, sort);
}

export function resetRateLimiter() {
  lastCall = 0;
  timestamps = [];
}
