# WebSocket Class Documentation

## Overview

The **WebSocket** class provides a robust, fully-featured interface for establishing and managing WebSocket connections with the Pterodactyl panel (or any WebSocket endpoint). It wraps the native WebSocket API and adds advanced features such as:

- Automatic reconnection with multiple strategies (fixed, exponential, exponential-jitter)
- Fallback URL support
- Heartbeat (ping/pong) mechanism with latency tracking
- Message queuing when the connection is down
- Outgoing/incoming interceptors (middleware)
- Auto‑JSON handling (stringify/parse)
- Rich event system with hooks for custom behaviors
- A helper for request/response patterns
- Connection metrics

This class is designed to be beginner-friendly while offering advanced configuration options for power users.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage Example](#usage-example)
- [Configuration Options](#configuration-options)
- [Method Reference](#method-reference)
  - [connect()](#connect)
  - [send()](#send)
  - [sendAndWaitResponse()](#sendandwaitresponse)
  - [manualReconnect()](#manualreconnect)
  - [close()](#close)
  - [isConnected() / getConnectionState()](#connection-status)
  - [getMetrics()](#getmetrics)
  - [updateOptions()](#updateoptions)
  - [clearMessageQueue()](#clearmessagequeue)
  - [destroy()](#destroy)
  - [Event Management](#event-management)
- [Events](#events)
- [Example Code](#example-code)
- [License](#license)
- [Author](#author)

---

## Features

| Feature                              | Description                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------- |
| **Reconnect Strategies**             | Fixed, exponential, or exponential-jitter delays for reconnection attempts.         |
| **Fallback URLs**                    | Specify alternative endpoints if the primary URL fails.                              |
| **Heartbeat Mechanism**              | Sends periodic pings and tracks latency with expected pong responses.                |
| **Message Queueing**                 | Queues messages when the connection is not open and flushes them when reconnected.      |
| **Interceptors (Middleware)**        | Modify outgoing and incoming messages with custom logic.                             |
| **Auto‑JSON Handling**               | Automatically stringifies outgoing objects and parses incoming JSON.                  |
| **Rich Event System**                | Built-in events for open, message, close, error, and custom events.                      |
| **Hooks**                            | `onBeforeReconnect`, `onBeforeSend`, and `onAfterSend` for fine-grained control.         |
| **Request/Response Pattern**         | `sendAndWaitResponse` method for request/response scenarios.                           |
| **Metrics**                          | Retrieve connection metrics like messages sent/received, latency, and reconnect count.   |

---

## Installation

Install the package via npm:

```bash
npm install pterodactyl-api-wrapper
```

Ensure your project is configured for TypeScript with the appropriate `tsconfig.json` settings.

---

## Usage Example

```typescript
import { WSConnectionOptions, AdvancedWebSocket as WebSocket, WSMetrics } from "pterodactyl-api-wrapper";

const options: WSConnectionOptions = {
  url: "wss://panel.example.com/api/client/servers/123/ws",
  autoReconnect: true,
  reconnectStrategy: "exponential-jitter",
  reconnectInterval: 1000,
  maxReconnectAttempts: 5,
  connectionTimeout: 10000,
  heartbeatInterval: 30000,
  heartbeatTimeout: 5000,
  queueMessages: true,
  autoJson: true,
  logger: (level, ...args) => console.log(`[WS ${level.toUpperCase()}]`, ...args),
};

const ws = new WebSocket(options);

ws.connect()
  .then((socket) => {
    console.log("Connected to WebSocket:", socket);
    ws.send({ action: "ping" })
      .then(() => console.log("Ping sent"))
      .catch((err) => console.error("Error sending ping:", err));
  })
  .catch((err) => console.error("Failed to connect WebSocket:", err));

ws.addEventListener("message", (event) => {
  console.log("Received message:", event.data);
});
```

---

## Configuration Options

| Option                   | Type                       | Default        | Description                                                                              |
| ------------------------ | -------------------------- | -------------- | ---------------------------------------------------------------------------------------- |
| **url**                  | `string` (required)        | N/A            | Primary WebSocket URL.                                                                   |
| **fallbackUrls**         | `string[]`                 | `[]`           | Alternative URLs if the primary fails.                                                   |
| **protocols**            | `string \| string[]`       | N/A            | Optional subprotocol(s) for the handshake.                                               |
| **autoReconnect**        | `boolean`                  | `false`        | Automatically reconnect on connection loss.                                              |
| **reconnectStrategy**    | `"fixed" \| "exponential" \| "exponential-jitter"` | `"exponential"` | Strategy for reconnection delays.                                                          |
| **reconnectInterval**    | `number`                   | `1000`         | Base delay (ms) for reconnection attempts.                                               |
| **maxReconnectAttempts** | `number`                   | `10`           | Maximum reconnection attempts.                                                           |
| **maxReconnectInterval** | `number`                   | `30000`        | Maximum delay (ms) allowed for exponential backoff.                                      |
| **jitter**               | `number`                   | `300`          | Additional jitter (ms) for "exponential-jitter" strategy.                                |
| **connectionTimeout**    | `number`                   | `10000`        | Timeout (ms) for establishing the connection.                                            |
| **heartbeatInterval**    | `number`                   | `30000`        | Interval (ms) to send heartbeat pings.                                                   |
| **heartbeatMessage**     | `string`                   | `"ping"`       | Message sent as a heartbeat ping.                                                        |
| **expectedPongMessage**  | `string`                   | `"pong"`       | Expected pong response.                                                                  |
| **heartbeatTimeout**     | `number`                   | `5000`         | Timeout (ms) waiting for a pong response.                                                |
| **queueMessages**        | `boolean`                  | `false`        | Queue outgoing messages if connection is not open.                                       |
| **messageQueueLimit**    | `number`                   | N/A            | Maximum messages to queue.                                                               |
| **autoJson**             | `boolean`                  | `false`        | Automatically stringify outgoing and parse incoming JSON.                              |
| **logger**               | `(level, ...args) => void` | N/A            | Custom logger callback; defaults to `console`.                                           |
| **outgoingMessageInterceptors** | `Array<(message: any) => any>` | N/A  | Interceptors for outgoing messages.                                                      |
| **incomingMessageInterceptors** | `Array<(message: any) => any>` | N/A  | Interceptors for incoming messages.                                                      |
| **onBeforeReconnect**    | `(attempt: number, lastCloseEvent: CloseEvent) => boolean` | N/A | Hook before reconnecting; return `false` to cancel reconnect.                             |
| **onBeforeSend**         | `(message: any) => any`    | N/A            | Hook before sending a message; can modify or cancel the send.                             |
| **onAfterSend**          | `(message: any) => void`   | N/A            | Hook after sending a message.                                                            |
| **onOpen, onMessage, onClose, onError** | Functions | N/A         | Standard event callbacks.                                                                  |

---

## Method Reference

### connect()

| Signature | `connect(): Promise<WebSocket>` |
| --------- | -------------------------------- |
| **Description:** | Establishes the WebSocket connection based on the provided options. Resolves with the active WebSocket instance. |

---

### send(data: any)

| Signature | `send(data: any): Promise<void>` |
| --------- | -------------------------------- |
| **Description:** | Sends data over the WebSocket connection. If the socket is closed and message queuing is enabled, the message is queued. Resolves once the message is sent. |

---

### sendAndWaitResponse()

| Signature | `sendAndWaitResponse(message: any, predicate: (msg: any) => boolean, timeout?: number): Promise<any>` |
| --------- | ---------------------------------------------------------------------------------------------------- |
| **Description:** | Sends a message and waits for a response matching the given predicate. Useful for request/response scenarios. Defaults to a 5000 ms timeout. |

---

### manualReconnect()

| Signature | `manualReconnect(): Promise<WebSocket>` |
| --------- | ----------------------------------------- |
| **Description:** | Forces a manual reconnection by closing the current connection (if open) and establishing a new one. |

---

### close()

| Signature | `close(code?: number, reason?: string): void` |
| --------- | ---------------------------------------------- |
| **Description:** | Closes the WebSocket connection gracefully with an optional status code and reason. |

---

### isConnected() / getConnectionState()

| Signature | `isConnected(): boolean` <br> `getConnectionState(): string` |
| --------- | -------------------------------------------------------------- |
| **Description:** | `isConnected()` returns `true` if the WebSocket is open. <br> `getConnectionState()` returns a human-readable connection state (e.g., `"OPEN"`, `"CLOSED"`). |

---

### getMetrics()

| Signature | `getMetrics(): WSMetrics` |
| --------- | ------------------------- |
| **Description:** | Returns an object containing metrics about the connection, including messages sent/received, last heartbeat latency, number of reconnect attempts, and the current URL. |

---

### updateOptions()

| Signature | `updateOptions(newOptions: Partial<WSConnectionOptions>): void` |
| --------- | ------------------------------------------------------------------ |
| **Description:** | Dynamically updates the connection options. Changes take effect on the next connection attempt. |

---

### clearMessageQueue()

| Signature | `clearMessageQueue(): void` |
| --------- | ----------------------------- |
| **Description:** | Clears any queued outgoing messages that haven’t been sent yet. |

---

### destroy()

| Signature | `destroy(): void` |
| --------- | ------------------- |
| **Description:** | Destroys the WebSocket instance by cleaning up timers, event listeners, and message queues, and closes the connection. |

---

## Event Management

The **WebSocket** class features a custom event system with the following events:

| Event Type          | Description                                              |
| ------------------- | -------------------------------------------------------- |
| **open**            | Emitted when the connection is successfully established. |
| **message**         | Emitted when a message is received.                      |
| **close**           | Emitted when the connection is closed.                   |
| **error**           | Emitted when an error occurs.                            |
| **reconnectAttempt**| Emitted when a reconnection attempt starts.              |
| **reconnectSuccess**| Emitted when a reconnection is successful.               |
| **reconnect**       | Emitted when a reconnect is triggered.                   |
| **ping**            | Emitted when a heartbeat ping is sent.                   |
| **pong**            | Emitted when a heartbeat pong is received.               |
| **custom**          | For any custom events dispatched by the user.            |

Use the following methods to manage events:

| Method                                      | Description                                        |
| ------------------------------------------- | -------------------------------------------------- |
| `addEventListener(eventType, callback)`     | Registers an event listener for the specified event type. |
| `removeEventListener(eventType, callback)`  | Unregisters an event listener.                     |
| `dispatchEvent(eventType, event)`           | Internally dispatches events to registered listeners. |

---

## Example Code

Below is a comprehensive example that demonstrates the full capabilities of the WebSocket class:

```typescript
import { WSConnectionOptions, AdvancedWebSocket as WebSocket, WSMetrics } from "pterodactyl-api-wrapper";

const options: WSConnectionOptions = {
  url: "wss://panel.example.com/api/client/servers/123/ws",
  autoReconnect: true,
  reconnectStrategy: "exponential-jitter",
  reconnectInterval: 1000,
  maxReconnectAttempts: 5,
  connectionTimeout: 10000,
  heartbeatInterval: 30000,
  heartbeatTimeout: 5000,
  queueMessages: true,
  autoJson: true,
  logger: (level, ...args) => console.log(`[WS ${level.toUpperCase()}]`, ...args),
};

const ws = new WebSocket(options);

// Connect to the WebSocket
ws.connect()
  .then((socket) => {
    console.log("Connected to WebSocket:", socket);

    // Listen for messages
    ws.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
    });

    // Send a ping message and wait for the pong response
    ws.sendAndWaitResponse({ action: "ping" }, (msg) => msg.action === "pong", 5000)
      .then((response) => {
        console.log("Received pong response:", response);
      })
      .catch((err) => {
        console.error("Error waiting for pong response:", err);
      });
  })
  .catch((err) => {
    console.error("Failed to connect WebSocket:", err);
  });

// Retrieve connection metrics after 60 seconds
setTimeout(() => {
  const metrics: WSMetrics = ws.getMetrics();
  console.log("Connection Metrics:", metrics);
}, 60000);

// Destroy the connection when done
// ws.destroy();
```