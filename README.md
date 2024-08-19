
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

## Data Population with Migration and Cron Job

### **Migration to Populate Dummy Data:**

During the initial setup, a migration script is used to populate the `cluster_states` table with dummy data. This data is randomly generated to simulate real cluster state data. The migration script adds 30 days' worth of data, with an average of 20 entries per minute, and includes random spikes in the data to reflect potential real-world scenarios.

- **To Run the Migration:**

  After setting up the backend service, run the following command:

  ```bash
  node ace migration:run
  ```

  This will create the necessary database tables and populate them with the dummy data.

### **Cron Job for Continuous Data Ingestion:**

A cron job is set up within the backend service to continuously generate and insert dummy cluster state data into the database at regular intervals. This simulates ongoing data ingestion and allows the dashboard to display real-time updates.

- **To Modify the Cron Job:**

  The cron job is defined in the `GenerateDummyData` task. If you need to adjust the frequency or the nature of the data generated, you can modify the cron job configuration in `kernel.ts`.

### **Using Actual Data Sources:**

To transition from dummy data to real data, you can:

1. **Update the Data Ingestion Logic:**
   - Modify the data generation logic to consume actual data from your sources instead of generating random values.
   - This could involve integrating with external APIs, databases, or other data sources.

2. **Disable the Dummy Data Generation:**
   - Once you have real data being ingested, you can disable the cron job responsible for generating dummy data.

## License

[Specify your license here]
