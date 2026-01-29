# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JavaScript learning/testing project (js-test) containing multiple self-contained modules, each with its own task. The project uses Vitest for testing with both CLI and browser UI modes.

## Essential Commands

### Running Tests
- `npm test` - Run all tests in CLI mode
- `npm run test:ui` - Run tests in browser UI mode (preferred for development)
- `npm run test:coverage` - Run tests with coverage reporting

### Running Specific Module Tests
To test a single module, use Vitest's file filtering:
```bash
npx vitest module-1/index.spec.js
npx vitest module-1/index.spec.js --ui
```

## Architecture

### Module Structure
Each module (module-1, module-2, ... module-17) is self-contained with:
- `index.js` - Implementation file (modify this)
- `index.spec.js` - Test file (do not modify)
- `README.md` - Task description in Russian
- `index.html` - Optional HTML file for browser-based modules

Modules are independent exercises - changes to one module do not affect others.

### Test Configuration
- **Test Framework**: Vitest with jsdom environment
- **Test Execution**: Sequential hooks (`hooks: "stack"`) and tests run in declaration order (`tests: "list"`)
- **Setup**: `vitest.setup.js` extends expect with @testing-library/jest-dom matchers
- **Reports**: HTML reports generated in `.vitest-reports/`
- **React Support**: Configured via @vitejs/plugin-react for React-based modules

### Module Types
Modules vary in complexity:
- Simple functions (module-1: basic math operations)
- DOM manipulation (module-10: form data collection)
- Full-stack applications (module-17: user registration with SQLite, Express server)

Some modules include database files (e.g., `module-17/database.db`).

## Development Workflow

1. Read the module's README.md for task requirements (written in Russian)
2. Implement solution in the module's index.js
3. Run tests to verify implementation
4. Tests use CommonJS (`require`) while config uses ES modules (`import`)

## Important Notes

- All module README files and tasks are written in Russian
- Do not modify `*.spec.js` test files
- Module implementations use CommonJS exports (`module.exports`)
- Vitest config uses ES modules
- Some modules require specific dependencies (sqlite3, undici for server-based tasks)
