# Cogent Labs

**Cogent Labs Takehome** with TypeScript, Dockerized for easy development and deployment. This project uses ESLint and Prettier to enforce code quality and consistent styling.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Docker](#docker)
- [Linting & Formatting](#linting--formatting)
- [Architecture](#packages)

## Installation

1. **Clone the repository:**

   git clone https://github.com/your-username/cogent-labs.git

   cd cogent-labs

2. **Install dependencies**

   If you're using **npm** (npm v7+):

   npm install --legacy-peer-deps

   Or if you're using **Yarn**:

   yarn install

## Development

To run the application locally using Create React App:

npm start

Or if using Yarn:

yarn start

This will start the development server and open http://localhost:3000 in your browser.

## Docker

The project is Dockerized so you can run everything with a single command.

1. **Build and run the Docker container:**

   docker-compose up --build

2. Open your browser at http://localhost:3000 to see the application running.

## Linting & Formatting

This project uses ESLint and Prettier to enforce code quality and formatting.

- **Lint:** To check for linting issues in your code:

  npm run lint

- **Format:** To automatically format your code:

  npm run format

_Note:_ If you encounter peer dependency conflicts with npm, use the `--legacy-peer-deps` flag as shown in the installation section.

## Packages

### Zustand

I find zustand boilerplate to be more minimalist than redux boilerplate. It's easier to pick up than redux and allows for hook-based usage opposed to HOC. By default, zustand uses selectors and avoids re-renders by default. For most applications it offers plenty, but for very large applications, by the nature of flexibility, it can become disorganized if the code is not structured and reviewed well.

### React Map GL and Maplibre (with )

react-map-gl and maplibre

### Turf

(for the cricle)

## API

### Maptiler

[https://www.maptiler.com/news/2022/03/japanese-maps-just-got-way-better/](Maptiler Japanese Specific Map)

### Foursquare API

It was suggested in the PDF document, so I figured they wanted candidates to use this specifically if they could.

It does not use traditional pagination, so it requires a little bit of a setup for this kind of behavior.
