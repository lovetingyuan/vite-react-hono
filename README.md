# React + TypeScript + Vite + Hono

You can use this repo to develop fullstack web app powered by react & hono & vite.

## Features

- Completely decoupled front-end and back-end
- File system-based routing conventions
  - `/a/[b]/index.tsx` --> `/a/:b`
  - `/a/-[b]/index.tsx` --> `/a/:b?`
  - `/a/b/index.tsx` --> `/a/b`
  - `/a/-b/index.tsx` --> `/a/b?`
  - `/a/[...b]/index.tsx` --> `/a/:b`, `/a/:b/:c` ...
- Both frontend and backend development support hot reloading
- One-click full-stack application build

## Usage

- run `npm run dev`
  - write api under `src/server`
  - write web page under `src/app`
- run `npm run build` to build both frontend and backend
- run `npm run preview` to preview the built app
