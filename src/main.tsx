/*
 * IMPORTANT: Google AdSense & Client-Side Rendering (CSR) Warning
 *
 * This app uses Client-Side Rendering (CSR) via Vite + React. Google AdSense crawlers may see a blank page, which is a common reason for AdSense rejection.
 *
 * Solution: To ensure Google can see your content, migrate to a framework that supports Server-Side Rendering (SSR) or Static Site Generation (SSG).
 *
 * Recommendation: Migrate to Next.js (https://nextjs.org/), which is the industry standard for SSR/SSG with React and TypeScript.
 *
 * Migration Steps:
 * 1. Run: npx create-next-app@latest --typescript
 * 2. Move your components and pages into the new Next.js app structure (use the /app or /pages directory as appropriate).
 * 3. Adapt your routing: Next.js uses file-based routing, so each page becomes a file in /pages or /app.
 * 4. Move static assets (images, etc.) into the /public directory.
 * 5. Update any Vite-specific code to Next.js conventions.
 * 6. Test your site locally and deploy.
 *
 * This change will ensure all your content is visible to Google and will maximize your chances of AdSense approval.
 */
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
