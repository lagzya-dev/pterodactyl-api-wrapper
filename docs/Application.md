# Application Application Class Documentation

## Overview
The `Application` class provides an interface for interacting with the Pterodactyl Application API. It enables full control over the panel, including user, node, location, server, database, nest, and allocation management.

### Example Usage:
```javascript
const app = new Application("YOUR_API_KEY");
const users = await app.users.list();
```

## Class: Application

### Constructor
```javascript
constructor(apiKey: string)
```
- **apiKey**: The API key used for authentication.
- **panel**: The panel URL fetched from the `Setup` class.

---

## API Endpoints

### **User Management**
- **list()**: Retrieves a list of all users.
- **getDetails(user_id: string)**: Fetches details of a user based on the provided `user_id`.
- **getDetailsByExternalId(external_id: string)**: Fetches user details based on their external ID.
- **create(user_details)**: Creates a new user.
- **update(user_id, user_data)**: Updates an existing user's details.
- **delete(user_id)**: Deletes a user from the system.

**Example Usage:**
```javascript
const users = await app.users.list();
const user = await app.users.getDetails("123");
await app.users.create({ email: "user@example.com", username: "newuser" });
await app.users.update("123", { first_name: "John" });
await app.users.delete("123");
```

---

### **Node Management**
- **list()**: Retrieves a list of all nodes.
- **getDetails(node_id)**: Fetches details of a specific node.
- **create(node_data)**: Creates a new node.
- **update(node_id, node_data)**: Updates an existing node's details.
- **delete(node_id)**: Deletes a node from the system.

**Example Usage:**
```javascript
const nodes = await app.nodes.list();
const node = await app.nodes.getDetails("10");
await app.nodes.create({ name: "Node1", location_id: 1 });
await app.nodes.update("10", { memory: 2048 });
await app.nodes.delete("10");
```

---

### **Server Management**
- **list()**: Retrieves a list of all servers.
- **getDetails(server_id)**: Fetches details of a specific server.
- **create(server_data)**: Creates a new server.
- **updateDetails(server_id, update_data)**: Updates a server's details.
- **updateBuild(server_id, build_data)**: Updates the server build configurations.
- **updateStartup(server_id, startup_data)**: Updates the startup configurations of a server.
- **suspend(server_id)**: Suspends a server.
- **unsuspend(server_id)**: Unsuspends a server.
- **reinstall(server_id)**: Reinstalls a server.
- **delete(server_id)**: Deletes a server.
- **forceDelete(server_id)**: Force deletes a server.

**Example Usage:**
```javascript
const servers = await app.servers.list();
const server = await app.servers.getDetails("5");
await app.servers.create({ name: "MyServer", user: 1 });
await app.servers.updateDetails("5", { name: "UpdatedServer" });
await app.servers.suspend("5");
await app.servers.unsuspend("5");
await app.servers.reinstall("5");
await app.servers.delete("5");
await app.servers.forceDelete("5");
```

---

### **Database Management**
- **list(server_id)**: Retrieves all databases associated with a server.
- **getDetails(server_id, database_id)**: Fetches details of a specific database.
- **create(server_id, database_data)**: Creates a new database.
- **resetPassword(server_id, database_id)**: Resets the password of a database.
- **delete(server_id, database_id)**: Deletes a database.

**Example Usage:**
```javascript
const databases = await app.databases.list("4");
const database = await app.databases.getDetails("4", "1");
await app.databases.create("4", { name: "game_db" });
await app.databases.resetPassword("4", "1");
await app.databases.delete("4", "1");
```

---

### **Allocations Management**
- **list(node_id)**: Retrieves all allocations for a specific node.
- **create(node_id, ip, ports)**: Creates new allocations for a node.
- **delete(node_id, allocation_id)**: Deletes a specific allocation from a node.

**Example Usage:**
```javascript
const allocations = await app.allocations.list("2");
await app.allocations.create("2", "192.168.1.1", [25565, 25566]);
await app.allocations.delete("2", "5");
```
