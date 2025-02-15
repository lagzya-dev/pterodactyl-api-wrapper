# Installation and Setup

## Overview
The `Client` class provides an interface for interacting with the Pterodactyl Client API. It supports **account management, server control, file operations, backups, networking, schedules, settings, startup variables, and more**.

## Installation Guide
To install the `pterodactyl-api-wrapper` package, use npm:

```sh
npm install pterodactyl-api-wrapper
```

Or using yarn:

```sh
yarn add pterodactyl-api-wrapper
```

## Setup Configuration
Before using the API, you must configure the panel URL using the `Setup` class:

```javascript
const { Setup } = require("pterodactyl-api-wrapper");

Setup.setPanel("https://panel.example.com");
```

### Basic Example Usage
After installing the package and configuring the panel, you can use it as follows:

```javascript
const { Client } = require("pterodactyl-api-wrapper");

const client = new Client("YOUR_API_KEY");

async function main() {
    const servers = await client.servers.list();
    console.log("Servers:", servers);
}

main();
```

## Class: Client

### Constructor
```javascript
constructor(apiKey: string)
```
- **apiKey**: The API key used for authentication.
- **panel**: The panel URL fetched from the `Setup` class.

---

## API Endpoints

### **Account Management**
- **getDetails()**: Retrieves account details.
- **enable2FA(codes: string[])**: Enables two-factor authentication.
- **disable2FA(tokens: string[])**: Disables two-factor authentication.
- **updateEmail(email: string, password: string)**: Updates the account email.
- **updatePassword(current_password: string, new_password: string)**: Updates the account password.
- **createApiKey(description: string, allowed_ips: string[])**: Creates an API key.
- **deleteApiKey(key_id: string)**: Deletes an API key.
- **listApiKeys()**: Lists API keys associated with the account.

**Example Usage:**
```javascript
const account = await client.account.getDetails();
await client.account.updateEmail("new@example.com", "currentPassword");
await client.account.createApiKey("My Key", ["192.168.1.1"]);
```

---

### **Server Management**
- **list()**: Retrieves a list of all servers.
- **showPermissions(server_id)**: Displays server permissions.
- **sendCommand(server_id, commandStr)**: Sends a command to a server.
- **powerAction(server_id, signal)**: Sends a power action (start, stop, restart, kill) to a server.
- **getConsoleDetails(server_id)**: Retrieves console details.
- **getResources(server_id)**: Fetches server resource usage.
- **getDetails(server_id)**: Retrieves server details.

**Example Usage:**
```javascript
const servers = await client.servers.list();
await client.servers.powerAction("5", "restart");
```