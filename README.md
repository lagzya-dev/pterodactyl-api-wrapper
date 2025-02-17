# Pterodactyl API Wrapper

[![NPM version](https://img.shields.io/npm/v/pterodactyl-api-wrapper.svg)](https://npmjs.com/package/pterodactyl-api-wrapper)  
[![License](https://img.shields.io/npm/l/pterodactyl-api-wrapper.svg)](LICENSE)

Pterodactyl API Wrapper is a **fully-featured Node.js library** designed to interact with the [Pterodactyl](https://pterodactyl.io/) panel. This package provides access to both the **Client API** (user interactions) and **Application API** (administrative control), allowing full management of users, servers, nodes, files, and more.

> **Note:** This wrapper supports all endpoints from the Pterodactyl API, ensuring that you have full control over every aspect of your panel.  
> For detailed documentation, please refer to the online docs linked below.

**Read full Documentation:**  
- **Installation:** [Installation and Setup](https://cptcr.featurebase.app/en/help/articles/0607206-installation-and-setup)  
- **Application Class:** [Application Class Docs](https://cptcr.featurebase.app/en/help/articles/5154163-application-class)  
- **Client Class:** [Client Class Docs](https://cptcr.featurebase.app/en/help/articles/1119802-client-class)  
- **Setup Class:** [Setup Class Docs](https://cptcr.featurebase.app/en/help/articles/1198926-setup-class)  
- **WebSocket Class:** [WebSocket Class Docs](https://cptcr.featurebase.app/help/articles/9295649-websocket-class)

---

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Classes Overview](#classes-overview)
  - [Setup Class](#setup-class)
  - [Client Class](#client-class)
  - [Application Class](#application-class)
  - [WebSocket Class](#websocket-class)
- [API Reference](#api-reference)
  - [Client API Functions](#client-api-functions)
  - [Application API Functions](#application-api-functions)
- [Project Structure](#project-structure)
- [License](#license)
- [Author](#author)
- [Contributing](#contributing)
- [Support](#support)

---

## Installation

Install the package via npm:

```bash
npm install pterodactyl-api-wrapper
```

---

## Setup

Before making API calls, **set the panel URL globally** using the `Setup` class:

```typescript
import { Setup } from "pterodactyl-api-wrapper";

Setup.setPanel("https://panel.example.com");
```

---

## Classes Overview

This package contains several core classes that help you interact with the Pterodactyl API:

### Setup Class

The `Setup` class is responsible for managing global configuration.

| Method | Description |
| ------ | ----------- |
| `Setup.setPanel(url: string): void` | Sets the global panel URL. |
| `Setup.getPanel(): string` | Retrieves the configured panel URL. |

---

### Client Class

The `Client` class provides an interface for interacting with the **Client API**, designed for user-level interactions.

#### Example Usage:

```typescript
import { Client } from "pterodactyl-api-wrapper";

const client = new Client("YOUR_CLIENT_API_KEY");

// Get account details
const details = await client.account.getDetails();
console.log(details);
```

---

### Application Class

The `Application` class is used for **administrative control**, such as managing users, servers, nodes, and more.

#### Example Usage:

```typescript
import { Application } from "pterodactyl-api-wrapper";

const app = new Application("YOUR_APPLICATION_API_KEY");

// List all users
const users = await app.users.list();
console.log(users);
```

---

### WebSocket Class

The `WSConnection` (exported as part of the wrapper) is an advanced WebSocket class that supports:

- Multiple reconnect strategies (fixed, exponential, exponential-jitter)
- Fallback URLs
- Heartbeat (ping/pong) with latency tracking
- Message queuing with configurable limits
- Outgoing/incoming interceptors (middleware)
- Auto‑JSON handling
- Rich event system with hooks for advanced use cases

#### Example Usage:

```typescript
import { WSConnection } from "pterodactyl-api-wrapper";

const ws = new WSConnection({
  url: "wss://panel.example.com/api/client/servers/{server_id}/ws",
  autoReconnect: true,
  reconnectStrategy: "exponential-jitter",
  reconnectInterval: 1000,
  maxReconnectAttempts: 10,
  connectionTimeout: 10000,
  heartbeatInterval: 30000,
  heartbeatTimeout: 5000,
  queueMessages: true,
  autoJson: true,
  logger: (level, ...args) => console.log(`[WS ${level.toUpperCase()}]`, ...args),
});

ws.connect().then(() => {
  console.log("WebSocket connected.");
  ws.send({ action: "ping" });
}).catch((err) => {
  console.error("Failed to connect WebSocket:", err);
});
```

---

## API Reference

### Client API Functions

#### Account Management

| Method | Description |
| ------ | ----------- |
| `client.account.getDetails()` | Retrieves the authenticated user's account details. |
| `client.account.enable2FA(codes: string[])` | Enables two-factor authentication (2FA). |
| `client.account.disable2FA(tokens: string[])` | Disables 2FA using recovery tokens. |
| `client.account.updateEmail(email: string, password: string)` | Updates the email address. |
| `client.account.updatePassword(current_password: string, new_password: string)` | Changes the account password. |
| `client.account.createApiKey(description: string, allowed_ips: string[])` | Creates a new API key. |
| `client.account.deleteApiKey(key_id: string)` | Deletes an existing API key. |
| `client.account.listApiKeys()` | Lists all API keys. |

#### Server Management

| Method | Description |
| ------ | ----------- |
| `client.servers.list()` | Lists all accessible servers. |
| `client.servers.showPermissions(server_id: string)` | Retrieves permissions for a specific server. |

#### File Management

| Method | Description |
| ------ | ----------- |
| `client.files.list(server_id: string)` | Lists files in a server. |
| `client.files.getContent(server_id: string, file_path: string)` | Reads the content of a file. |
| `client.files.download(server_id: string, file_path: string)` | Generates a download link for a file. |
| `client.files.rename(server_id: string, from: string, to: string)` | Renames a file or folder. |
| `client.files.copy(server_id: string, file_path: string)` | Copies a file. |
| `client.files.write(server_id: string, file_path: string, content: string)` | Writes to a file. |
| `client.files.compress(server_id: string, files: string[])` | Compresses files into a ZIP archive. |
| `client.files.decompress(server_id: string, file_path: string)` | Extracts a ZIP archive. |
| `client.files.delete(server_id: string, files: string[])` | Deletes files or folders. |
| `client.files.createFolder(server_id: string, folder_path: string)` | Creates a new folder. |
| `client.files.upload(server_id: string, file_data: FormData)` | Uploads a file to the server. |

---

### Application API Functions

#### User Management

| Method | Description |
| ------ | ----------- |
| `app.users.list()` | Lists all users. |
| `app.users.getDetails(user_id: string)` | Retrieves details for a specific user. |
| `app.users.getDetailsByExternalId(external_id: string)` | Retrieves user details by external ID. |
| `app.users.create(user_details: object)` | Creates a new user. |
| `app.users.update(user_id: string, user_data: object)` | Updates an existing user. |
| `app.users.delete(user_id: string)` | Deletes a user. |

#### Node Management

| Method | Description |
| ------ | ----------- |
| `app.nodes.list()` | Lists all nodes. |
| `app.nodes.getDetails(node_id: string)` | Retrieves node details. |
| `app.nodes.create(node_data: object)` | Creates a new node. |
| `app.nodes.update(node_id: string, node_data: object)` | Updates node information. |
| `app.nodes.delete(node_id: string)` | Deletes a node. |

#### Server Management

| Method | Description |
| ------ | ----------- |
| `app.servers.list()` | Lists all servers. |
| `app.servers.getDetails(server_id: string)` | Retrieves server details. |
| `app.servers.create(server_data: object)` | Creates a new server. |
| `app.servers.update(server_id: string, update_data: object)` | Updates server details. |
| `app.servers.delete(server_id: string)` | Deletes a server. |

---

## Project Structure

```
src/
├── class/
│   ├── main/
│   │   ├── Application.ts       // Application API class (Admin)
│   │   ├── Client.ts            // Client API class (User)
│   │   ├── Setup.ts             // Global configuration
│   │   └── WSConnection.ts      // Advanced WebSocket class
│   └── source/
│       ├── app/                 // Application API endpoints
│       │   ├── users/
│       │   ├── nodes/
│       │   ├── locations/
│       │   ├── servers/
│       │   └── nests/
│       └── client/              // Client API endpoints
│           ├── account/
│           └── servers/
└── index.ts                     // Main entry point
```

---

## License

This project is licensed under the [Apache 2.0 License](LICENSE).

---

## Author

Developed by **cptcr**.  
This project is **NOT** affiliated with or endorsed by [Pterodactyl](https://pterodactyl.io).

---

## Contributing

Contributions are welcome! Open an issue or submit a pull request on [GitHub](https://github.com/cptcr/pterodactyl-api-wrapper/issues).

---

## Support

If you need help, please open an issue on [GitHub](https://github.com/cptcr/pterodactyl-api-wrapper/issues) or reach out via our support channels.