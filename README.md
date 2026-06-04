# OnlyGirlsCCS 🛍️

Full-stack ecommerce platform for **OnlyGirlsCCS**, a Caracas-based store specializing in plushies, bags, toys, and thermoses. Built as a bilingual SPA with React 19 + Express 5.

🔗 [Live Demo](https://onlygirlsccs.vercel.app/) · `React 19` `TypeScript` `Tailwind CSS 4` `Express 5` `Supabase` `Playwright`


## Screenshots 📸
![image alt](https://github.com/lpalacios1410/OnlyGirlsCss-Ecommerce/blob/85599a5bd68d21f4849bd06935c80f629379cb23/frontend/public/ogc1.png)


![image alt](https://github.com/lpalacios1410/OnlyGirlsCss-Ecommerce/blob/85599a5bd68d21f4849bd06935c80f629379cb23/frontend/public/ogc2.png)


![image alt](https://github.com/lpalacios1410/OnlyGirlsCss-Ecommerce/blob/85599a5bd68d21f4849bd06935c80f629379cb23/frontend/public/ogc3.png)

## Description 📄

This project was built with two goals in mind:

1. **Sell online** — Provide customers with a smooth, intuitive shopping experience to browse products by category, search, add to cart, and save favorites.

2. **Keep evolving** — This is a living project that I'll continue improving as I learn new tools and techniques. Feedback and suggestions are always welcome.

Built as a bilingual single-page application with React, featuring a product catalog with category filtering, shopping cart management, favorites, admin dashboard, and a fully responsive dark-themed design.

## Tech Stack 💻

| Category | Technology |
|---|---|
| **Frontend** | [React 19](https://react.dev) + [Vite 7](https://vite.dev) + [TypeScript 6](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **State** | [Zustand 5](https://zustand.docs.pmnd.rs) |
| **Backend** | [Express 5](https://expressjs.com) + [Supabase](https://supabase.com) |
| **Validation** | [Zod 4](https://zod.dev) |
| **E2E Tests** | [Playwright](https://playwright.dev) |
| **Package Manager** | pnpm (workspaces) |

## Features ⛓️

- **Product catalog** — Grid layout with pagination (6 items/page)
- **Category filtering** — Filter by Todos, Peluches, Bolsos, Juguetes, Termos with SVG icons
- **Smart search** — Detects category keywords and navigates to results
- **Shopping cart** — Slide-out modal managed with Zustand
- **Favorites / Wishlist** — Heart toggle on product cards and detail page
- **Admin dashboard** — Create products with live preview and API key auth
- **Product detail** — Full view with image, description, price, availability badge, size selector
- **Responsive design** — Mobile-first, adapts to all screen sizes
- **SEO ready** — Open Graph tags, Twitter Cards, JSON-LD, sitemap.xml, robots.txt
- **Contact & Social** — WhatsApp, Instagram, TikTok integration

## Run Locally

```bash
git clone https://github.com/lpalacios1410/OnlyGirlsCss-Ecommerce.git

cd OnlyGirlsCss-Ecommerce

pnpm install
```

### Start the backend

```bash
pnpm run dev:backend
```

### Start the frontend (in a new terminal)

```bash
pnpm run dev:frontend
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The frontend dev server proxies `/api` requests to the backend at `http://localhost:1234`.

### Commands

| Command | Action |
|---|---|
| `pnpm run dev:frontend` | Start frontend dev server at `localhost:5173` |
| `pnpm run dev:backend` | Start backend dev server at `localhost:1234` |
| `pnpm --filter frontend run build` | Build frontend for production to `./dist/` |
| `pnpm --filter frontend run preview` | Preview frontend production build locally |

### Environment Variables

The backend requires the following environment variables in `backend/.env`:

| Variable | Description |
|---|---|
| `SUPABASE_API_URL` | Supabase project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `ADMIN_SECRET_KEY` | Secret key for admin dashboard access |

The frontend also needs `VITE_ADMIN_SECRET_KEY` for the admin dashboard.

## Project Structure

```
OnlyGirlsCss-Ecommerce/
├── frontend/          # React SPA (Vite)
│   ├── public/        # Static assets
│   └── src/           # Components, pages, stores, assets
├── backend/           # Express REST API
│   ├── config/        # Database & app config
│   ├── controllers/   # Route controllers
│   ├── models/        # Data access layer
│   └── schemas/       # Zod validation schemas
└── tests/             # Playwright E2E tests
```

## Deployment

Deployed on [Vercel](https://vercel.com):

- **Frontend:** `https://onlygirlsccs-ecommerce-frontend.vercel.app`
- **Backend:** `https://onlygirlsccs-ecommerce-backend.vercel.app`

## Testing

```bash
cd tests
npm install
npx playwright test
```

Backend API tests:

```bash
cd backend
node --test app.test.js
```

## Author

**Luis Palacios** — [@lpalacios1410](https://github.com/lpalacios1410)

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://instagram.com/onlygirlsccs)
[![TikTok](https://img.shields.io/badge/TikTok-000000?style=flat&logo=tiktok&logoColor=white)](https://tiktok.com/@onlygirlccs)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat&logo=whatsapp&logoColor=white)](https://wa.me/584241728767)
[![Email](https://img.shields.io/badge/Email-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:luisarmando20092009@gmail.com)
