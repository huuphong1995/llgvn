# LLG VN Consulting Website

Professional, production-ready website for **LLG VN** with:
- Corporate landing pages
- Knowledge Hub / news-style article layout
- MongoDB-backed article management (CRUD APIs)
- Admin login and article publishing
- Search, category filtering, and pagination

## Tech Stack
- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- Node.js API routes (built into Next.js)

## Project Structure
- `app/`: pages and API routes
- `components/`: reusable UI components
- `lib/`: shared helpers (db/auth/articles/seed data)
- `models/`: Mongoose schemas
- `types/`: shared TypeScript types

## Pages
- `/` Home
- `/about`
- `/services`
- `/knowledge`
- `/knowledge/[slug]`
- `/news`
- `/contact`
- `/admin/login`
- `/admin`

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   copy .env.example .env.local
   ```
3. Ensure MongoDB is running locally (or update `MONGODB_URI`).
4. Run app:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`

## Seed Sample Data
Run:
```bash
curl -X POST http://localhost:3000/api/seed
```

This seeds:
- Sample articles for Knowledge Hub and News
- Default admin user

## Admin Credentials
- Username: `admin`
- Password: `admin123456`

Use `/admin/login` to sign in and publish articles.

## Notes
- Contact API currently validates and accepts form submissions (ready to connect to email/CRM).
- Rich text editor is prepared as extensible textarea in admin form; can be swapped with TipTap or Quill.
