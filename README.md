# Harmony CRM Dashboard

A colourful full-stack CRM dashboard built with **Next.js**, **TypeScript**, **Redux Toolkit async thunks**, **Node.js/Express**, **JWT authentication**, **MySQL**, **Tailwind CSS**, and **shadcn-style UI components**.

## What is included

- Public marketing website: Home, Features, Contact
- Auth pages: Login and Signup
- Protected CRM dashboard pages:
  - Analytics overview
  - Client management
  - Deal/task pipeline
  - Task management
  - Client communication tracking
- Backend REST API with JWT authentication
- MySQL database scripts for local and development environments
- Seed data for testing in MySQL Workbench
- Clean modern folder structure
- Animated UI sections using Framer Motion
- shadcn-style local UI components

## Tech stack

### Frontend
- Next.js App Router
- TypeScript
- Redux Toolkit + createAsyncThunk
- React Redux
- Axios
- Tailwind CSS
- shadcn-style components
- Framer Motion
- Lucide icons

### Backend
- Node.js
- Express
- TypeScript
- MySQL2 promise pool
- JWT
- bcryptjs
- Helmet, CORS, Morgan
- Zod validation

### Database
- MySQL
- MySQL Workbench compatible SQL scripts

## Folder structure

```txt
harmony-crm-dashboard/
  frontend/
    app/
      page.tsx
      features/page.tsx
      contact/page.tsx
      auth/login/page.tsx
      auth/signup/page.tsx
      dashboard/*
    components/
      layout/
      motion/
      ui/
    lib/
    store/
      slices/
    types/
  backend/
    src/
      config/
      db/
      middleware/
      modules/
      routes/
      utils/
      app.ts
      server.ts
  database/
    local_schema.sql
    development_schema.sql
    seed_data.sql
  docs/
    KT.md
```

## Setup instructions

### 1. Create the database

Open MySQL Workbench and run one of these scripts:

- `database/local_schema.sql` for local database
- `database/development_schema.sql` for development database

Then run:

- `database/seed_data.sql` for local
- `database/seed_data_development.sql` for development

Seed login:

```txt
Email: admin@harmonycrm.com
Password: Admin@12345
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Default backend URL:

```txt
http://localhost:5000/api
```

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Default frontend URL:

```txt
http://localhost:3000
```

## Environment files

### backend/.env

```env
PORT=5000
NODE_ENV=local
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=harmony_crm_local
JWT_SECRET=change_this_to_a_long_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

### frontend/.env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Main API endpoints

### Public

```txt
POST /api/auth/signup
POST /api/auth/login
POST /api/contact
GET  /api/health
```

### Protected

Send header:

```txt
Authorization: Bearer <jwt_token>
```

```txt
GET  /api/auth/me
GET  /api/dashboard/summary
GET  /api/clients
POST /api/clients
GET  /api/pipeline
GET  /api/tasks
POST /api/tasks
PATCH /api/tasks/:id/status
GET  /api/communications
POST /api/communications
```

## Recommended usage flow

1. Visitor opens public homepage.
2. Visitor can view features and submit contact form without login.
3. New user signs up.
4. Backend hashes password and returns JWT.
5. Frontend stores token in localStorage and Redux auth state.
6. Protected dashboard pages load data using Redux thunk slices.
7. API validates JWT before returning CRM data.

## Notes

- This is a strong starter project and can be extended into a production CRM.
- For production, add refresh tokens, server-side session cookies, rate limiting, audit logs, and email verification.
