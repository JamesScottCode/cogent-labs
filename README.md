# Cogent Labs

**Cogent Labs Takehome** with TypeScript, Dockerized for easy development and deployment. This project uses ESLint and Prettier to enforce code quality and consistent styling.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Docker](#docker)
- [Linting & Formatting](#linting--formatting)

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
