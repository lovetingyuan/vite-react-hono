# Vite React Hono Starter

Minimal full-stack starter powered by React, Vite, Hono, TypeScript, SWR, Tailwind CSS, and daisyUI.

## Features

- Frontend and backend are kept in separate npm workspaces
- Type-safe Hono RPC client shared from the backend API type
- SWR-powered API request example
- Global counter state example with `react-atomic-store`
- File system-based routing conventions
  - `/a/[b]/index.tsx` --> `/a/:b`
  - `/a/-[b]/index.tsx` --> `/a/:b?`
  - `/a/b/index.tsx` --> `/a/b`
  - `/a/-b/index.tsx` --> `/a/b?`
  - `/a/[...b]/index.tsx` --> `/a/:b`, `/a/:b/:c` ...
- Both frontend and backend development support hot reloading
- One-click full-stack application build

## Included Example

The home page contains a minimal counter example:

- The counter value is stored on the frontend with `react-atomic-store`.
- The API button sends the current count to the Hono backend with SWR.
- The backend exposes `GET /api/counter?count=1` and returns the count plus a text response.

## Usage

- run `npm run dev`
- write API routes under `server/src`
- write web pages under `app/src/pages`
- write SWR hooks under `app/src/swr`
- run `npm run build` to build both frontend and backend
- run `npm run preview` to preview the built app
