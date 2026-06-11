# Spotify Tracks API

A RESTful API built with Express and MongoDB that serves data about 50 popular Spotify tracks. Built as part of the Technigo bootcamp.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | API documentation (all available endpoints) |
| GET | `/tracks` | Returns all tracks. Supports `?genre=` and `?artistName=` query filters |
| GET | `/tracks/:id` | Returns a single track by MongoDB ID |
| GET | `/tracks/genre/:genre` | Returns all tracks matching a genre |

## View it live

https://technigo-project-first-api-7ar3.onrender.com

## Tech Stack

- Node.js + Express
- MongoDB Atlas + Mongoose
- Deployed on Render

## Run locally

```bash
npm i && code . && npm run dev
```

To seed the database on first run:

```bash
RESET_DB=true npm run dev
```
