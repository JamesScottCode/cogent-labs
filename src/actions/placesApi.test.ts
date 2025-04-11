import { fsqFields } from '../consts/foursquare';
import { fakeApiResponse } from '../consts/fakeApiResponse';
import { safeFetchPlaces, resetRateLimiter } from './placesApi';

jest.mock('../utils/geo', () => ({
  createLL: (lat: number, lng: number) => `${lat},${lng}`,
}));

describe('fetchPlaces', () => {
  beforeEach(() => {
    global.fetch = jest.fn();

    resetRateLimiter();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns results and nextCursor when API call is successful and link header is provided', async () => {
    const fakeNextCursor = 'nextCursorValue';

    const fakeJson = Promise.resolve({
      results: fakeApiResponse.results,
    });

    // mock global fetch to return a successful response with a link header.
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => fakeJson,
      headers: {
        // sim a link header containing the cursor value
        get: (headerName: string) => {
          if (headerName === 'link') {
            return `<https://api.foursquare.com/v3/places/search?cursor=${fakeNextCursor}&fields=${fsqFields}>`;
          }
          return null;
        },
      },
    });

    const result = await safeFetchPlaces('food');
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // verify that the returned results match the fake data.
    expect(result).toEqual({
      results: fakeApiResponse.results,
      nextCursor: fakeNextCursor,
    });
  });

  it('returns results and undefined nextCursor when link header is missing', async () => {
    const fakeJson = Promise.resolve({
      results: fakeApiResponse.results,
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => fakeJson,
      headers: {
        get: () => null, // no link header
      },
    });

    const result = await safeFetchPlaces('food');
    expect(result).toEqual({
      results: fakeApiResponse.results,
      nextCursor: undefined,
    });
  });

  it('throws an error when the response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(safeFetchPlaces('food')).rejects.toThrow(
      'Failed to fetch places',
    );
  });

  it('includes radius and sort parameters in the API call', async () => {
    // fake JSON response for a successful call.
    const fakeJson = Promise.resolve({
      results: fakeApiResponse.results,
    });

    // setup the fetch mock.
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => fakeJson,
      headers: {
        get: () => null, // no link header for simplicity
      },
    });

    // call fetchPlaces with radius and sort parameters
    await safeFetchPlaces('coffee', 10, 500, undefined, 'rating');

    // capture the URL that global.fetch was called with
    const fetchCall = (global.fetch as jest.Mock).mock.calls[0][0];

    // the URL should have "radius=500" and "sort=rating"
    expect(fetchCall).toContain('radius=500');
    expect(fetchCall).toContain('sort=rating');
  });
});
