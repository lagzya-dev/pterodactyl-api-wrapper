# Pterodactyl API Wrapper

[![NPM version](https://img.shields.io/npm/v/pterodactyl-api-wrapper.svg)](https://npmjs.com/package/pterodactyl-api-wrapper)
[![License](https://img.shields.io/npm/l/pterodactyl-api-wrapper.svg)](LICENSE)

A fully-featured Node.js API wrapper for the [Pterodactyl](https://pterodactyl.io/) panel. This package provides an easy-to-use interface for both the **Client API** and **Application API** of your Pterodactyl panel, allowing you to manage users, servers, nodes, locations, databases, files, and more directly from your Node.js projects.

## Features

- **Client API Functions**:
  - Manage your account (2FA, API keys, email, password updates, etc.)
  - Manage your servers (list servers, view permissions, file management, network settings, schedules, startup variables, and user assignments)
- **Application API Functions**:
  - Administrative control over the panel (user, node, location, server, and nest management)
- **Global Setup**:
  - Easily set your panel URL globally using the `Setup` class.
- **TypeScript Support**:
  - Written in TypeScript for full type-safety and IntelliSense support.

## Installation

Install the package via NPM:

```bash
npm install pterodactyl-api-wrapper
```

## Usage

### Setup

Before making any API calls, set your panel URL globally using the `Setup` class:

```typescript
import { Setup } from 'pterodactyl-api-wrapper';

Setup.setPanel("https://panel.example.com");
```

### Client API Example

The Client API is designed for user-level interactions with your Pterodactyl panel.

```typescript
import { Client } from 'pterodactyl-api-wrapper';

const client = new Client("YOUR_API_KEY");

async function getAccountDetails() {
    try {
        const details = await client.account.getDetails();
        console.log("Account Details:", details);
    } catch (error) {
        console.error("Error fetching account details:", error);
    }
}

getAccountDetails();
```

### Application API Example

The Application API is for administrative control of the panel.

```typescript
import { Application } from 'pterodactyl-api-wrapper';

const app = new Application("YOUR_API_KEY");

async function listUsers() {
    try {
        const users = await app.users.list();
        console.log("Users:", users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

listUsers();
```

## Project Structure

```
src/
└── class/
    ├── main/
    │   ├── Application.ts       // Main class for Application API functions.
    │   ├── Client.ts            // Main class for Client API functions.
    │   └── Setup.ts             // Global configuration class.
    └── source/
        ├── app/                 // Application API implementations.
        │   ├── users/           // User management functions.
        │   ├── nodes/           // Node management functions.
        │   ├── locations/       // Location management functions.
        │   ├── servers/         // Server management functions.
        │   └── nests/           // Nest & Egg management functions.
        └── client/              // Client API implementations.
            ├── account/         // Account management functions.
            └── servers/         // Server management functions (files, network, schedules, settings, startup, users, backups, etc.)
```

Each function is implemented in its own file, and all are grouped by category. The `Client.ts` and `Application.ts` classes import these functions directly, providing a clean and intuitive API.

## License

This project is licensed under the **Apache 2.0 License**. See the [LICENSE](LICENSE) file for details.

## Author

**cptcr**

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find bugs, have improvements, or new feature requests.

## Support

If you have any questions or need help, please feel free to open an issue on the [GitHub repository](https://github.com/cptcr/pterodactyl-api-wrapper) or reach out via email.
