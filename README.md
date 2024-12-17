# Team Omega Capstone Project

A full-stack web application built with React, Express.js, and PostgreSQL, using Docker for containerization.

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router DOM
- Headless UI
- Hero Icons

### Backend
- Node.js
- Express.js
- Knex.js (SQL Query Builder)
- PostgreSQL

### DevOps
- Docker & Docker Compose
- Node.js Alpine Images
- PostgreSQL Container

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18 or higher
- npm or yarn
- PostgreSQL (if running locally)

## 🛠️ Installation & Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd sdi28-capstone-TeamOmega
```

2. Create a `.env` file in the root directory with the following variables:
```env
VITE_PORT=5173
EXPRESS_PORT=3000
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB_NAME=capstone_db
DB_CONNECTION_STRING=postgres://postgres:postgres@database:5432/capstone_db
NODE_ENV=development
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

3. Start the application using Docker Compose:
```bash
docker compose up --build
```

## 🌐 Accessing the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database: localhost:5432

## 📁 Project Structure

```
.
├── frontend/                # React frontend application
│   ├── src/                # Source files
│   ├── public/             # Static files
│   └── Dockerfile         # Frontend container configuration
├── backend/                # Express.js backend application
│   ├── src/               # Source files
│   ├── migrations/        # Database migrations
│   ├── seeds/            # Database seeds
│   └── Dockerfile        # Backend container configuration
├── docker-compose.yaml    # Docker compose configuration
└── .env                  # Environment variables
```

## 🔒 Authentication

The application uses Google OAuth for authentication. You'll need to:
1. Create a Google Cloud Project
2. Set up OAuth 2.0 credentials
3. Add the credentials to your `.env` file

## 🛠️ Development

### Running Locally
1. Frontend development:
```bash
cd frontend
npm install
npm run dev
```

2. Backend development:
```bash
cd backend
npm install
npm run dev
```

### Database Migrations
```bash
cd backend
npx knex migrate:latest
npx knex seed:run
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



