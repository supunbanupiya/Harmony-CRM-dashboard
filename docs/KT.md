# Harmony CRM Dashboard - KT Documentation

## 1. Project goal

Harmony CRM Dashboard is designed as a modern CRM system for sales teams, service teams, agencies, and education/consulting businesses. It combines customer records, sales pipeline visibility, task tracking, and communication history in one dashboard.

## 2. Architecture overview

The application is divided into three main layers:

```txt
Frontend Next.js App
        ↓ REST API using Axios + Redux Thunks
Backend Node.js Express API
        ↓ mysql2 connection pool
MySQL Database
```

## 3. Frontend architecture

The frontend uses Next.js App Router with TypeScript.

### Main frontend folders

```txt
frontend/app
```
Contains route-based pages.

```txt
frontend/components
```
Contains reusable UI, layout, and animation components.

```txt
frontend/store
```
Contains Redux store, typed hooks, and slices.

```txt
frontend/lib
```
Contains shared helpers such as API client and utility functions.

```txt
frontend/types
```
Contains shared TypeScript interfaces.

## 4. Public pages

### Home page

Route:

```txt
/
```

Purpose:
- Marketing landing page
- Shows CRM value proposition
- Shows analytics preview cards
- Allows navigation to signup/login/contact

### Features page

Route:

```txt
/features
```

Purpose:
- Explains CRM modules
- Public access

### Contact page

Route:

```txt
/contact
```

Purpose:
- Allows visitors to submit inquiries
- Calls backend public API: `POST /api/contact`

## 5. Authentication pages

### Signup

Route:

```txt
/auth/signup
```

Flow:
1. User submits name, company, email, password.
2. Redux auth thunk calls `POST /api/auth/signup`.
3. Backend validates input.
4. Backend hashes password using bcryptjs.
5. Backend stores user in MySQL.
6. Backend returns JWT and user profile.
7. Frontend stores token and redirects to dashboard.

### Login

Route:

```txt
/auth/login
```

Flow:
1. User submits email and password.
2. Redux auth thunk calls `POST /api/auth/login`.
3. Backend checks user by email.
4. Backend compares password hash.
5. Backend returns JWT.
6. Frontend stores JWT and loads protected pages.

## 6. Protected dashboard flow

Route group:

```txt
/dashboard
```

Protected by:

```txt
components/layout/protected-route.tsx
```

Logic:
- Checks Redux auth state.
- Checks localStorage token.
- Redirects unauthenticated users to login.

Protected pages:

```txt
/dashboard
/dashboard/clients
/dashboard/pipeline
/dashboard/tasks
/dashboard/communications
```

## 7. Redux flow

Redux Toolkit is used to separate UI state and async API logic.

Main slices:

```txt
authSlice.ts
```
Handles signup, login, logout, current user, and token.

```txt
dashboardSlice.ts
```
Handles analytics cards, revenue summary, pipeline summary, and recent activity.

```txt
clientsSlice.ts
```
Handles client list loading and client creation.

```txt
tasksSlice.ts
```
Handles task list loading, task creation, and status update.

```txt
communicationsSlice.ts
```
Handles communication timeline and new communication logs.

```txt
contactSlice.ts
```
Handles public contact form submission.

Each async API call is written using `createAsyncThunk`.

## 8. Backend architecture

The backend uses a feature-module structure.

```txt
backend/src/modules/auth
```
Handles signup, login, and current user.

```txt
backend/src/modules/dashboard
```
Handles dashboard summary metrics.

```txt
backend/src/modules/clients
```
Handles client CRUD starter functions.

```txt
backend/src/modules/tasks
```
Handles tasks and status updates.

```txt
backend/src/modules/pipeline
```
Handles deal pipeline data.

```txt
backend/src/modules/communications
```
Handles client communications.

```txt
backend/src/modules/contact
```
Handles public inquiry form messages.

## 9. JWT security flow

1. Signup/login generates token.
2. Frontend stores token in localStorage.
3. Axios request interceptor attaches token:

```txt
Authorization: Bearer token
```

4. Backend middleware verifies token.
5. Protected route receives `req.user`.
6. SQL queries are scoped by `owner_id`.

## 10. Database design

Main tables:

```txt
users
clients
pipeline_stages
deals
tasks
communications
contact_messages
```

Relationships:

```txt
users 1 → many clients
clients 1 → many deals
clients 1 → many tasks
clients 1 → many communications
pipeline_stages 1 → many deals
```

## 11. Recommended future improvements

- Add refresh tokens with HttpOnly cookies
- Add role-based access control
- Add email verification
- Add file uploads for client documents
- Add search/filter/pagination for all lists
- Add audit logs
- Add unit and integration tests
- Deploy frontend to Vercel and backend to Render/Railway/AWS
- Move secrets to a managed secret store
