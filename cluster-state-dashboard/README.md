
# Cluster State Dashboard

This is the frontend service for visualizing cluster state data.

## Prerequisites

- Node.js
- Docker (optional)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend server will be available at `http://localhost:3000`.

## Docker

To run the Dashboard in a Docker container:

```bash
docker build -t cluster-state-dashboard .
docker run -p 3000:3000 cluster-state-dashboard
```

## License

[Specify your license here]
