
# Cluster Management System

This project consists of two main components:

1. **Cluster State API** (`cluster-state-api/`): Backend service built with AdonisJS to manage cluster state data and snapshot policies.
2. **Cluster State Dashboard** (`cluster-state-dashboard/`): Frontend service built with Next.js and Tailwind CSS to visualize cluster state data.

## Project Structure

```bash
cluster-management/
│
├── cluster-state-api/      # Backend service
├── cluster-state-dashboard/ # Frontend service
└── README.md               # Project overview
```

## Prerequisites

- Docker
- Docker Compose
- Node.js (if running without Docker)

## Setup and Run

### Using Docker (Recommended)

1. **Build and Run:**

   From the top-level directory (`cluster-management/`), run the following command:

   ```bash
   docker-compose up --build
   ```

   This will build and start both the backend and frontend services.

2. **Access the Services:**

   - **API:** http://localhost:3333
   - **Dashboard:** http://localhost:3000

### Without Docker

#### Backend (Cluster State API)

1. Navigate to `cluster-state-api/`:

   ```bash
   cd cluster-state-api/
   ```

2. Install dependencies and start the server:

   ```bash
   npm install
   node ace migration:run
   npm run dev
   ```

   The backend server will be available at `http://localhost:3333`.

#### Frontend (Cluster State Dashboard)

1. Navigate to `cluster-state-dashboard/`:

   ```bash
   cd cluster-state-dashboard/
   ```

2. Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

   The frontend server will be available at `http://localhost:3000`.

## Docker Compose Setup

The `docker-compose.yml` file is used to define and manage the multi-container Docker application for this project.

- **Backend Service**: Runs the AdonisJS API.
- **Frontend Service**: Runs the Next.js frontend.

## License

[Specify your license here]
