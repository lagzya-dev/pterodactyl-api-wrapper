# Pterodactyl Client Class Documentation

## Overview
The `Client` class provides an interface for interacting with the Pterodactyl Client API. It supports **account management, server control, file operations, backups, networking, schedules, settings, startup variables, and more**.

### Example Usage:
```javascript
const client = new Client("YOUR_API_KEY");
const servers = await client.servers.list();
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

---

### **Backup Management**
- **list(server_id)**: Lists all backups for a server.
- **getDetails(server_id, backup_id)**: Fetches backup details.
- **create(server_id, backup_data)**: Creates a backup.
- **delete(server_id, backup_id)**: Deletes a backup.
- **download(server_id, backup_id)**: Downloads a backup.

**Example Usage:**
```javascript
const backups = await client.backups.list("5");
await client.backups.create("5", { name: "DailyBackup" });
```

---

### **File Management**
- **list(server_id, directory?)**: Lists files in a directory.
- **getContent(server_id, file_path)**: Retrieves file content.
- **download(server_id, file_path)**: Downloads a file.
- **rename(server_id, from, to)**: Renames a file.
- **copy(server_id, file_path)**: Copies a file.
- **write(server_id, file_path, content)**: Writes content to a file.
- **compress(server_id, files)**: Compresses files.
- **decompress(server_id, file_path)**: Decompresses a file.
- **delete(server_id, files)**: Deletes files.
- **createFolder(server_id, folder_path)**: Creates a folder.
- **upload(server_id, file_data)**: Uploads a file.

**Example Usage:**
```javascript
await client.files.upload("5", formData);
await client.files.rename("5", "old.txt", "new.txt");
```

---

### **Network Management**
- **listAllocations(server_id)**: Lists server allocations.
- **assignAllocations(server_id, allocation_id)**: Assigns an allocation.
- **setAllocationNote(server_id, allocation_id, note)**: Sets a note on an allocation.
- **setPrimaryAllocation(server_id, allocation_id)**: Sets an allocation as primary.
- **unassignAllocation(server_id, allocation_id)**: Unassigns an allocation.

**Example Usage:**
```javascript
await client.network.setPrimaryAllocation("5", "10");
```

---

### **Schedule Management**
- **list(server_id)**: Lists all schedules.
- **createSchedule(server_id, schedule_data)**: Creates a schedule.
- **scheduleDetails(server_id, schedule_id)**: Retrieves schedule details.
- **updateSchedule(server_id, schedule_id, schedule_data)**: Updates a schedule.
- **deleteSchedule(server_id, schedule_id)**: Deletes a schedule.
- **createTask(server_id, schedule_id, task_data)**: Creates a schedule task.
- **updateTask(server_id, schedule_id, task_id, task_data)**: Updates a task.
- **deleteTask(server_id, schedule_id, task_id)**: Deletes a task.

**Example Usage:**
```javascript
await client.schedules.createSchedule("5", { name: "Nightly Restart" });
```

---

### **Startup Management**
- **listVariables(server_id)**: Lists all startup variables.
- **updateVariable(server_id, variable_id, value)**: Updates a startup variable.

**Example Usage:**
```javascript
await client.startup.updateVariable("5", "10", "256");
```

---

### **User Management**
- **listUsers(server_id)**: Lists all server users.
- **createUser(server_id, user_data)**: Creates a new user.
- **updateUser(server_id, user_id, user_data)**: Updates user details.
- **deleteUser(server_id, user_id)**: Deletes a user.
- **userDetails(server_id, user_id)**: Retrieves user details.

**Example Usage:**
```javascript
const users = await client.users.listUsers("5");
await client.users.createUser("5", { username: "guest" });
```