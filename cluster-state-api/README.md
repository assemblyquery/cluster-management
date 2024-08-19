
# Cluster State API

This is the backend service for managing cluster state data and snapshot policies.

## Prerequisites

- Node.js
- PostgreSQL
- Docker (optional)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables by copying `.env.example` to `.env` and updating the values:

   ```bash
   cp .env.example .env
   ```

3. Run database migrations:

   ```bash
   node ace migration:run
   ```

## Running the Server

- Development:

  ```bash
  npm run dev
  ```

- Production:

  ```bash
  npm run build
  npm start
  ```

## API Endpoints

| Method | Endpoint                  | Description                       |
|--------|---------------------------|-----------------------------------|
| GET    | `/api/v1/cluster-states`   | Get cluster states                |
| POST   | `/api/v1/cluster-states`   | Add cluster states                |
| GET    | `/api/v1/snapshot-policy`  | Get snapshot policy               |
| POST   | `/api/v1/snapshot-policy`  | Update snapshot policy            |

## Docker

To run the API in a Docker container:

```bash
docker build -t cluster-state-api .
docker run -p 3333:3333 cluster-state-api
```

## License

[Specify your license here]
