# Klikly - URL Shortener

Aplikasi URL shortener dengan monorepo structure (frontend + backend).

## Struktur Project

```
my-klikly-app/
├── apps/
│   ├── web/              # Frontend (React + Vite)
│   └── api/              # Backend (Hono + SQLite)
├── packages/
│   └── shared-types/     # TypeScript shared types
├── package.json          # Root workspace config
└── pnpm-workspace.yaml   # pnpm workspace config
```

## Prerequisites

- Node.js >= 20
- pnpm >= 10

## Setup

```bash
# Install dependencies
pnpm install

# Setup environment
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Run database migrations
pnpm --filter @klikly/api db:migrate

# Seed database (optional)
pnpm --filter @klikly/api db:seed
```

## Development

```bash
# Run both frontend & backend
pnpm dev

# Run frontend only
pnpm dev:web

# Run backend only
pnpm dev:api
```

## Demo Account

- Email: `demo@klikly.id`
- Password: `demo123`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login |
| POST | `/auth/register` | Register |
| GET | `/auth/me` | Get current user |
| GET | `/links` | List links |
| POST | `/links` | Create link |
| GET | `/links/:id` | Get link detail |
| PATCH | `/links/:id` | Update link |
| DELETE | `/links/:id` | Delete link |
| GET | `/links/:id/analytics` | Link analytics |
| GET | `/dashboard/stats` | Dashboard stats |
| GET | `/:shortCode` | Redirect to original URL |
