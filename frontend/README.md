# Syncflow Frontend

This project is built using **React**, **TypeScript**, and **Vite**.

## Available Scripts

In the project directory, you can run:

### `pnpm run dev`
Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `pnpm run build`
Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `pnpm run preview`
Locally preview the production build after running `pnpm run build`.

## Code Quality (Linting & Formatting)
This project uses **[Biome](https://biomejs.dev/)** as a fast, all-in-one toolchain for code formatting and linting. It completely replaces Prettier and ESLint for a cleaner and faster developer experience.

Configuration can be found in `biome.json`.

Available commands:
- **`pnpm run lint`**: Checks for code issues (linting).
- **`pnpm run lint:fix`**: Automatically fixes safe-to-apply linting issues.
- **`pnpm run format`**: Automatically formats the codebase according to standards.

## Tests (Vitest & React Testing Library)
We use **[Vitest](https://vitest.dev/)** paired with **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** to run component and unit tests. Vitest was chosen because it natively understands our Vite configuration and is drop-in compatible with the Jest API.

The setup for the testing environment is located in `src/setupTests.ts` and included in `vite.config.ts`.

Available commands:
- **`pnpm run test`**: Runs the entire test suite (by default starts in watch mode).
- **`pnpm run test:ui`**: Opens the Vitest UI dashboard in your browser to execute and analyze test runs visually.

*(Tip for Docker/CI: You can run tests without the interactive watcher mode using `pnpm run test -- --run`)*
