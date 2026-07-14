# Computed Blog

A minimalist, responsive personal blog written for a 17-year-old author. Features a smart, conversational tone, focusing on two distinct topics: tech recommendations and physics/aerodynamics.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (with custom `@theme` for an earthy palette: cream, sage, olive, terracotta)
- **Language**: TypeScript
- **Database ORM**: Prisma 6 (using SQLite for local dev, intended for Vercel Postgres in production)
- **Content Rendering**: `react-markdown` with Tailwind Typography (`prose-custom`)
- **Auth**: Secure JWT cookies via `jose`, Next.js Middleware, and Server Actions

## Database Architecture
The backend uses a single `Post` model:
- `id`: UUID (Primary Key)
- `title`: String
- `slug`: String (Unique URL slug)
- `content`: String (Raw Markdown text)
- `category`: String ('Tech Recs' or 'Physics to Flight')
- `createdAt` / `updatedAt`: DateTime

## Current State (July 2026)
- **Frontend Scaffolding Complete**: Navbar, Home page, Archive, Tech Recs, and Physics to Flight pages are fully designed and mobile-responsive.
- **Dynamic CMS Built**: 
  - The `/admin` dashboard is protected by a password-based JWT login route (`/login`).
  - A minimalist Markdown editor form at `/admin/new` saves posts directly to the database.
  - All public pages dynamically fetch and display posts based on their assigned track.
- **Recent Fixes**: Resolved a Next.js Turbopack module resolution bug by downgrading from Prisma 7 (beta) to the stable Prisma 6.

## Getting Started
To run the project locally:
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```
