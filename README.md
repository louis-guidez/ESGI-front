# ESGI PA Front

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Install pnpm if not installed

```bash
npm install -g pnpm
```

Make sure to install dependencies:

```bash
pnpm install
```

Configure the environment variables in the `.env` file

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

Run the build github action (automatically triggered on push on main)

Configure the environment variables in the docker compose production file

Run the docker compose file to start the production server

```bash
docker compose -f docker-compose.prod.yml up -d
```

## API configuration

The application uses the Nuxt runtime config variable `API_BASE_URL` to
determine the backend API URL. By default it points to
`http://localhost:8000/api`. Set the environment variable `API_BASE_URL`
locally if you need to override this value.
