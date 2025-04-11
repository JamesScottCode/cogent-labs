module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^react-map-gl/maplibre(\\/)?$':
      '<rootDir>/__mocks__/react-map-gl/maplibre.js',
  },
};
