# WunderGraph: Next13, Postgres, Tailwind, Auth0

This template demonstrates how to use WunderGraph with Next.js 13 app directory with PostgreSQL, Tailwind CSS and Auth0

## Getting Started

1. Copy the `.env.example` file to `.env`
2. Go to [Auth0](https://auth0.com/) and create a new application of type "Regular Web Application"
3. Skip the Quickstart
4. Copy the `Domain`, `Client ID` and `Client Secret` to the clipboard
5. Update the Auth0 entrieds in the `.env` file
6. Roll your own Postgres server and get the connection string: `postgresql://user:password@server-address/database-name`
7. Update the `src/seed/seed.ts` file with an social email address (gmail, etc.)
8. Install dependencies and bootstrap WunderGraph server and database

```shell
npm install && npm run start
```

After a while, a new browser tab will open,
and you can start exploring the application.
If no tab is open, navigate to [http://localhost:3000](http://localhost:3000).

## GraphQL Operations

You can add more Operations (e.g. Queries or Mutations) by adding more "\*.graphql" files to the directory `./wundergraph/operations`.
Each file becomes an Operation. The Operation name is not relevant, the file name is.

## Additional Configurations

- Prisma schema changes: `npx prisma migrate dev --name <name>`

## Troubleshooting

If you are having trouble with WG after updating the postgres database scheme, delete the following folders:

- `.wundergraph/cache`
- `.wundergraph/generated`
- `src/components/generated`
