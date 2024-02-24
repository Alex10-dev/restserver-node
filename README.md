# Node Rest Server With TypeScript

This project is to create a REST server with Node.js and TypeScript. In this project, I use a PostgreSQL database and Prisma for CRUD operations.

## Installation

Please use the following commands:

```bash
npm i
```

Don't forget to recreate the following files:
    - `.env`
    - `.env.test`

Start the PostgreSQL database container:

```bash
docker compose up -d
```

Run the server in development mode:

```bash
npm run dev
```

## Testing

For running tests, use the following command:
```bash
npm run test:watch
```
