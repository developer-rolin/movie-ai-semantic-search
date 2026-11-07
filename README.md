# 🎬 AI-Powered Movie Catalog & Semantic Search

> A full-stack, high-performance movie catalog featuring **AI-driven vector semantic search**, built with modern web technologies, Clean Architecture, and containerized infrastructure.

---

## 🚀 About The Project

This project was engineered to demonstrate production-ready, senior-level architecture. Moving away from traditional exact-match keyword searches, this application leverages **vector embeddings and AI semantic search** to enable users to discover movies based on natural language descriptions (e.g., _"a mind-bending sci-fi movie about time travel"_).

---

## 🛠️ Tech Stack

### Frontend

- **React 18** / **TypeScript**
- **Vite** (Next-generation frontend tooling)
- **Tailwind CSS** (Utility-first styling for responsive UI)
- **TanStack Query** (Robust asynchronous state management)
- **React Router DOM** (Client-side routing & deep-linking)

### Backend

- **Node.js** / **TypeScript**
- **Fastify** (High-performance web framework)
- **Prisma ORM** (Type-safe database toolkit)
- **PostgreSQL + pgvector** (Relational database powered by vector similarity search)
- **Transformers.js** (Local AI embedding generation)

### Infrastructure & Dev

- **Docker & Docker Compose** (Containerized database environment)
- **pnpm** (Fast, disk-space efficient package manager)
- **tsup** (Lightning-fast TypeScript bundler)

---

## 🏗️ Architecture & Design Patterns

The backend strictly follows **Clean Architecture** and the **Repository Pattern**, enforcing separation of concerns:

- **Controllers (`http/controllers/`)**: Handle incoming HTTP requests and map responses.
- **Use Cases (`use-cases/`)**: Encapsulate core business logic decoupled from frameworks.
- **Repositories (`repositories/`)**: Abstract data persistence layers using Prisma.

---

## ⚙️ Getting Started (Quick Start)

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Docker & Docker Compose](https://www.docker.com/)

### 1. Clone the Repository

```bash
git clone git@github.com:developer-rolin/movie-ai-semantic-search.git
cd Projeto_movies_5000
```

### 2. Set Up the Environment

Create a `.env` file inside the `backend/` folder matching your database configuration:

```env
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/tmdb_search?schema=public"
PORT=3333
```

### 3. Start the Database

From the root directory, spin up PostgreSQL via Docker Compose:

```bash
docker compose up -d
```

### 4. Run Automated Backend Setup

Navigate to the backend directory, install dependencies, and run the automated setup script (which runs migrations, seeds the TMDb dataset, and generates AI vector embeddings):

```bash
cd backend
pnpm install
pnpm db:setup
```

### 5. Start the Backend Server

```bash
pnpm dev
```

### 6. Start the Frontend Application

Open a new terminal window, navigate to the frontend folder, install dependencies, and run the development server:

```bash
cd frontend
pnpm install
pnpm dev
```

Open your browser and visit `http://localhost:5173`.

---

## 🗺️ Roadmap & Future Improvements

- [ ] Implement comprehensive automated unit and integration tests (Vitest)
- [ ] Fully containerize backend and frontend services via Docker Compose
- [ ] Set up a CI/CD pipeline using GitHub Actions for automated linting and building
