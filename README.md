## Nlightn Foundation website

This repo contains:

- A **static website** (plain HTML/CSS/JS) that can be hosted anywhere: `index.html`, `about.html`, etc.
- A Next.js project scaffold (still present), if you ever want a React-based version later.

## Static website (recommended for simple hosting)

### Files

- `index.html` (home)
- `about.html`, `our-work.html`, `blog.html`, `contact.html`, `get-involved.html`, `search.html`
- `assets/styles.css`, `assets/main.js`, `assets/placeholders/hero.svg`

### How to host

- **Any normal hosting / cPanel / S3 / Netlify / Cloudflare Pages**:
  - Upload `index.html`, the other `*.html` files, and the `assets/` folder to your site root.
  - Ensure the server serves `index.html` by default.

### Quick local preview (no build)

- Open `index.html` directly in a browser, or use a tiny local server:

```bash
cd .
npx --yes serve .
```

## Next.js project (optional)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
