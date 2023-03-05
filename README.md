# Bourbon Journal

![Bourbon Journal Login](/app/images/frontpage.png "Bourbon Journal")

## Powered by...

- [Remix.run](https://remix.run/) via [Remix Stacks](https://remix.run/docs/en/v1/pages/stacks)
- [Fly app deployment](https://fly.io) with [Docker](https://www.docker.com/)
- Production-ready [SQLite Database](https://sqlite.org)
- Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Email/Password Authentication with [cookie-based sessions via Remix](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Install

- Clone the repository to your machine and run

  ```sh
  npm install
  ```

## Development

- Initial setup: _If you just generated this project, this step has been done for you._

  ```sh
  npm run setup
  ```

  The database seed script creates a new user with some data you can use to get started.

- Start dev server:

  ```sh
  npm run dev
  ```

  This starts your app in development mode, rebuilding assets on file changes.

## Database

This project uses sqlite to store data. Anytime you change the `prisma/schema.prisma` file you must run `npm run migrate` to migrate the changes to the actual database. (**Note**, _you may also need to run this command when installing new Cypress packages_)

### Connecting to the database

You can connect to the dev database by running `npm run db:dev`.

You can connect to the live database by running `npm run db:prod`.

## Deployment

### GitHub Actions

This project uses GitHub Actions for Continuous Integration and Continuous Deployment. The current workflow triggers the action on push and runs the following checks:

- Lint (ESLint)
- Typecheck (TypeScript)
- Unit Testing (Vitest)
- E2E / Integration Testing (Cypress)
- Build (Docker)
- Deploy (Fly)

You can adjust the GitHub Action workflow by editing the `.github/workflows/deploy.yml` file

### Pushing changes

- Anything that is pushed into the `main` branch will be deployed to production.
- Anything that is pushed into the `dev` branch will be deployed to staging.

## Testing

### Vitest ⚡

This project uses `vitest` for utility and component testing. There are DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

```sh
npm run test
```

### Cypress

This project uses Cypress 🧪 for E2E test. They are configured in the `cypress` directory. The `cypress/e2e` directory is used to add integration suites to test your integrations.

Also using [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run

```sh
npm run test:e2e:dev
```

which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker

#### Cypress Utilities

There is a utility for testing authenticated features without having to go through the login flow:

```ts
cy.login();
// you are now logged in as a new user
```

There is also a utility to auto-delete the user at the end of your test. Just make sure to add this in each test file:

```ts
afterEach(() => {
  cy.cleanupUser();
});
```

That way, you keep your local db clean and keep your tests isolated from one another.

## Code Quality

### Type Checking

This project uses TypeScript. Setup your editor for the best Typescript experience. To run type checking across the whole project, run

```sh
npm run typecheck
```

You can also adjust your TypeScript configuration in the `tsconfig.json` file.

### Linting

This project uses ESLint for linting, which is configured in `.eslintrc.js`. To check for linting errors for the whole project, run

```sh
npm run lint
```

### Formatting

This project uses Prettier for auto-formatting. You can use the

```sh
npm run format
```

script to format all files in the project.

### Helpful commands

Setup -- prepares the database locally

```sh
npm run setup
```

Migrate -- migrates changes to your local database

```sh
npm run migrate
```

Precommit -- runs format, lint, and typecheck

```sh
npm run precommit
```
