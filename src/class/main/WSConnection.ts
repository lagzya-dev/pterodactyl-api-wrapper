// WSConnection.ts

type ReconnectStrategy = "fixed" | "exponential" | "exponential-jitter";

type EventType =
  | "open"
  | "message"
  | "close"
  | "error"
  | "reconnectAttempt"
  | "reconnectSuccess"
  | "reconnect"
  | "ping"
  | "pong"
  | "custom";

export interface WSConnectionOptions {
  /** Primary WebSocket URL (required) */
  url: string;
  /** Optional fallback URLs if the primary fails */
  fallbackUrls?: string[];
  /** Optional subprotocol(s) to use during the handshake */
  protocols?: string | string[];

  /** Automatically reconnect on connection loss */
  autoReconnect?: boolean;
  /** Reconnect strategy: fixed, exponential, or exponential with jitter */
  reconnectStrategy?: ReconnectStrategy;
  /** Base delay (ms) for reconnect attempts */
  reconnectInterval?: number;
  /** Maximum number of reconnect attempts */
  maxReconnectAttempts?: number;
  /** Maximum delay (ms) allowed for exponential backoff */
  maxReconnectInterval?: number;
  /** Additional random jitter (ms) to add when using jitter strategy */
  jitter?: number;

  /** Connection timeout (ms) for establishing the connection */
  connectionTimeout?: number;

  /** Enable heartbeat (ping/pong) mechanism; set interval in ms */
  heartbeatInterval?: number;
  /** Heartbeat ping message (default "ping") */
  heartbeatMessage?: string;
  /** Expected pong message (default "pong") */
  expectedPongMessage?: string;
  /** How long (ms) to wait for a pong before closing the connection */
  heartbeatTimeout?: number;

  /** If true, queue outgoing messages if the connection is not open */
  queueMessages?: boolean;
  /** Maximum number of messages to queue */
  messageQueueLimit?: number;

  /** Automatically JSON‑stringify outgoing objects and parse incoming JSON strings */
  autoJson?: boolean;

  /** Custom logger callback; if not provided, uses console */
  logger?: (
    level: "debug" | "info" | "warn" | "error",
    ...args: any[]
  ) => void;
  /** Outgoing message interceptors (middleware) */
  outgoingMessageInterceptors?: Array<(message: any) => any>;
  /** Incoming message interceptors (middleware) */
  incomingMessageInterceptors?: Array<(message: any) => any>;

  /** Hook called before reconnecting; return false to cancel reconnect */
  onBeforeReconnect?: (attempt: number, lastCloseEvent: CloseEvent) => boolean;
  /** Hook called before sending a message; can modify or cancel the send */
  onBeforeSend?: (message: any) => any;
  /** Hook called after a message is sent */
  onAfterSend?: (message: any) => void;

  /** Standard event callbacks (optional) */
  onOpen?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
}

export interface WSMetrics {
  messagesSent: number;
  messagesReceived: number;
  lastLatency: number;
  reconnectAttempts: number;
  currentUrl: string;
}

class AdvancedWebSocket {
  private socket: WebSocket | null = null;
  private currentUrl: string;
  private fallbackUrls: string[];
  private reconnectAttempts: number = 0;
  private messageQueue: Array<any> = [];
  private heartbeatIntervalId: number | null = null;
  private pongTimeoutId: number | null = null;
  private connectionTimeoutId: number | null = null;
  private destroyed: boolean = false;

  // Metrics
  private messagesSent: number = 0;
  private messagesReceived: number = 0;
  private lastPingTimestamp: number = 0;
  private lastLatency: number = 0;

  // Custom event listeners
  private eventListeners: Record<EventType, Array<(event: any) => void>> = {
    open: [],
    message: [],
    close: [],
    error: [],
    reconnectAttempt: [],
    reconnect: [],
    reconnectSuccess: [],
    ping: [],
    pong: [],
    custom: [],
  };

  private options: WSConnectionOptions;

  constructor(options: WSConnectionOptions) {
    if (!options.url) {
      throw new Error("A URL is required to establish a WebSocket connection.");
    }
    this.options = {
      autoReconnect: false,
      reconnectStrategy: "exponential",
      reconnectInterval: 1000,
      maxReconnectAttempts: 10,
      maxReconnectInterval: 30000,
      jitter: 300,
      connectionTimeout: 10000,
      heartbeatInterval: 30000,
      heartbeatMessage: "ping",
      expectedPongMessage: "pong",
      heartbeatTimeout: 5000,
      queueMessages: false,
      autoJson: false,
      ...options,
    };
    this.currentUrl = this.options.url;
    this.fallbackUrls = this.options.fallbackUrls || [];
  }

  /** Internal logger */
  private log(level: "debug" | "info" | "warn" | "error", ...args: any[]) {
    if (this.options.logger) {
      this.options.logger(level, ...args);
    } else {
      console[level](...args);
    }
  }

  /**
   * Establishes the WebSocket connection.
   * Returns a promise that resolves when connected.
   */
  connect(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      if (this.destroyed) {
        return reject(new Error("Instance has been destroyed."));
      }
      this.log("debug", `[WS] Connecting to ${this.currentUrl}`);
      this.socket = new WebSocket(this.currentUrl, this.options.protocols);

      if (this.options.connectionTimeout) {
        this.connectionTimeoutId = window.setTimeout(() => {
          this.log("error", "[WS] Connection timeout reached");
          reject(new Error("Connection timeout reached"));
          this.socket?.close();
        }, this.options.connectionTimeout);
      }

      this.socket.onopen = (event) => {
        this.log("info", `[WS] Connected to ${this.currentUrl}`);
        if (this.connectionTimeoutId) {
          clearTimeout(this.connectionTimeoutId);
          this.connectionTimeoutId = null;
        }
        this.reconnectAttempts = 0;
        if (this.options.heartbeatInterval) {
          this.startHeartbeat();
        }
        if (this.options.queueMessages && this.messageQueue.length > 0) {
          this.flushMessageQueue();
        }
        if (this.options.onOpen) this.options.onOpen(event);
        this.dispatchEvent("open", event);
        resolve(this.socket!); // Assert non-null
      };

      this.socket.onmessage = (event) => {
        let data: any = event.data;
        if (this.options.incomingMessageInterceptors) {
          this.options.incomingMessageInterceptors.forEach((fn) => {
            data = fn(data);
          });
        }
        if (this.options.autoJson && typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (e) {
            // fallback to raw data if JSON parsing fails
          }
        }
        this.messagesReceived++;
        // Handle heartbeat pong.
        if (
          this.options.heartbeatInterval &&
          data === this.options.expectedPongMessage
        ) {
          this.log("debug", "[WS] Received pong");
          this.dispatchEvent("pong", event);
          if (this.pongTimeoutId) {
            clearTimeout(this.pongTimeoutId);
            this.pongTimeoutId = null;
          }
          this.lastLatency = Date.now() - this.lastPingTimestamp;
          return;
        }
        const modifiedEvent = { ...event, data };
        if (this.options.onMessage) this.options.onMessage(modifiedEvent);
        this.dispatchEvent("message", modifiedEvent);
      };

      this.socket.onerror = (event) => {
        this.log("error", "[WS] Error:", event);
        if (this.options.onError) this.options.onError(event);
        this.dispatchEvent("error", event);
      };

      this.socket.onclose = (event) => {
        this.log("warn", "[WS] Connection closed:", event);
        this.stopHeartbeat();
        if (this.options.onClose) this.options.onClose(event);
        this.dispatchEvent("close", event);
        // Attempt auto-reconnect if enabled and not destroyed.
        if (
          this.options.autoReconnect &&
          this.reconnectAttempts < (this.options.maxReconnectAttempts || 0) &&
          !this.destroyed
        ) {
          // Allow hook to cancel reconnect.
          if (
            this.options.onBeforeReconnect &&
            !this.options.onBeforeReconnect(this.reconnectAttempts, event)
          ) {
            this.log("info", "[WS] Reconnect canceled by onBeforeReconnect hook.");
            return;
          }
          this.reconnectAttempts++;
          this.dispatchEvent("reconnectAttempt", {
            attempt: this.reconnectAttempts,
          });
          let delay = this.computeReconnectDelay();
          this.log(
            "info",
            `[WS] Reconnecting in ${delay}ms... (Attempt ${this.reconnectAttempts})`
          );
          setTimeout(() => {
            // Try fallback URLs if provided.
            if (this.fallbackUrls.length > 0) {
              const nextUrl = this.fallbackUrls.shift();
              if (nextUrl) {
                this.log("info", `[WS] Switching to fallback URL: ${nextUrl}`);
                this.currentUrl = nextUrl;
              }
            }
            this.dispatchEvent("reconnect", { attempt: this.reconnectAttempts });
            this.connect()
              .then((sock) => {
                this.dispatchEvent("reconnectSuccess", {
                  attempt: this.reconnectAttempts,
                });
              })
              .catch((err) => {
                this.log("error", "[WS] Reconnection failed:", err);
              });
          }, delay);
        }
      };
    });
  }

  /**
   * Computes the delay (ms) for the next reconnection attempt based on strategy.
   */
  private computeReconnectDelay(): number {
    let base = this.options.reconnectInterval || 1000;
    let delay: number;
    switch (this.options.reconnectStrategy) {
      case "fixed":
        delay = base;
        break;
      case "exponential":
        delay = base * Math.pow(2, this.reconnectAttempts - 1);
        break;
      case "exponential-jitter":
        delay = base * Math.pow(2, this.reconnectAttempts - 1);
        const jitter = this.options.jitter || 300;
        delay += Math.floor(Math.random() * jitter);
        break;
      default:
        delay = base;
    }
    if (this.options.maxReconnectInterval) {
      delay = Math.min(delay, this.options.maxReconnectInterval);
    }
    return delay;
  }

  /**
   * Sends data over the WebSocket.
   * Returns a promise that resolves once the message is sent.
   */
  send(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        if (this.options.queueMessages) {
          if (
            this.options.messageQueueLimit &&
            this.messageQueue.length >= this.options.messageQueueLimit
          ) {
            this.log("error", "[WS] Message queue full; discarding message.");
            return reject(new Error("Message queue is full."));
          }
          this.log("debug", "[WS] Queuing message (connection not open).");
          this.messageQueue.push(data);
          return resolve();
        } else {
          this.log("error", "[WS] Socket not open; cannot send.");
          return reject(new Error("WebSocket is not open."));
        }
      }
      // Before-send hook.
      if (this.options.onBeforeSend) {
        data = this.options.onBeforeSend(data);
      }
      // Apply outgoing interceptors.
      if (this.options.outgoingMessageInterceptors) {
        this.options.outgoingMessageInterceptors.forEach((fn) => {
          data = fn(data);
        });
      }
      // Auto‑JSON stringify.
      if (this.options.autoJson && typeof data === "object") {
        try {
          data = JSON.stringify(data);
        } catch (err) {
          this.log("error", "[WS] JSON stringify error:", err);
          return reject(err);
        }
      }
      try {
        this.socket.send(data);
        this.messagesSent++;
        if (this.options.onAfterSend) {
          this.options.onAfterSend(data);
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  /** Flush queued messages */
  private flushMessageQueue(): void {
    this.log("debug", `[WS] Flushing ${this.messageQueue.length} queued message(s).`);
    while (this.messageQueue.length > 0) {
      const msg = this.messageQueue.shift();
      if (msg !== undefined && this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.send(msg).catch((err) => {
          this.log("error", "[WS] Error sending queued message:", err);
        });
      }
    }
  }

  /** Starts the heartbeat (ping/pong) mechanism */
  private startHeartbeat(): void {
    if (this.options.heartbeatInterval && this.socket) {
      this.log("debug", "[WS] Starting heartbeat.");
      this.heartbeatIntervalId = window.setInterval(() => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.log("debug", "[WS] Sending heartbeat ping.");
          this.dispatchEvent("ping", { timestamp: Date.now() });
          this.lastPingTimestamp = Date.now();
          this.socket.send(this.options.heartbeatMessage!);
          if (this.options.heartbeatTimeout) {
            this.pongTimeoutId = window.setTimeout(() => {
              this.log("error", "[WS] Pong timeout; closing connection.");
              this.socket?.close();
            }, this.options.heartbeatTimeout);
          }
        }
      }, this.options.heartbeatInterval);
    }
  }

  /** Stops the heartbeat mechanism */
  private stopHeartbeat(): void {
    if (this.heartbeatIntervalId) {
      clearInterval(this.heartbeatIntervalId);
      this.heartbeatIntervalId = null;
    }
    if (this.pongTimeoutId) {
      clearTimeout(this.pongTimeoutId);
      this.pongTimeoutId = null;
    }
  }

  /** Closes the WebSocket connection gracefully */
  close(code?: number, reason?: string): void {
    if (this.socket) {
      this.socket.close(code, reason);
      this.log("info", "[WS] Connection closed manually.");
    }
  }

  /** Returns whether the connection is currently open */
  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  /** Returns a human‑readable connection state */
  getConnectionState(): string {
    if (!this.socket) return "CLOSED";
    switch (this.socket.readyState) {
      case WebSocket.CONNECTING:
        return "CONNECTING";
      case WebSocket.OPEN:
        return "OPEN";
      case WebSocket.CLOSING:
        return "CLOSING";
      case WebSocket.CLOSED:
        return "CLOSED";
      default:
        return "UNKNOWN";
    }
  }

  /** Forces a manual reconnect */
  manualReconnect(): Promise<WebSocket> {
    this.log("info", "[WS] Manual reconnect initiated.");
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
    return this.connect();
  }

  /**
   * Sends a message and waits for a response matching the predicate.
   * Useful for request/response patterns.
   */
  sendAndWaitResponse(
    message: any,
    predicate: (msg: any) => boolean,
    timeout: number = 5000
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const listener = (event: MessageEvent) => {
        if (predicate(event.data)) {
          this.removeEventListener("message", listener);
          resolve(event.data);
        }
      };
      this.addEventListener("message", listener);
      this.send(message).catch((err) => {
        this.removeEventListener("message", listener);
        reject(err);
      });
      setTimeout(() => {
        this.removeEventListener("message", listener);
        reject(new Error("Response timeout exceeded."));
      }, timeout);
    });
  }

  /** Returns metrics on the current connection */
  getMetrics(): WSMetrics {
    return {
      messagesSent: this.messagesSent,
      messagesReceived: this.messagesReceived,
      lastLatency: this.lastLatency,
      reconnectAttempts: this.reconnectAttempts,
      currentUrl: this.currentUrl,
    };
  }

  /** Destroys the instance, cleans up timers and listeners */
  destroy(): void {
    this.destroyed = true;
    this.stopHeartbeat();
    if (this.connectionTimeoutId) {
      clearTimeout(this.connectionTimeoutId);
      this.connectionTimeoutId = null;
    }
    this.eventListeners = {
      open: [],
      message: [],
      close: [],
      error: [],
      reconnectAttempt: [],
      reconnect: [],
      reconnectSuccess: [],
      ping: [],
      pong: [],
      custom: [],
    };
    this.messageQueue = [];
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.log("info", "[WS] Connection destroyed.");
  }

  /** Adds an event listener for a given event type */
  addEventListener(eventType: EventType, callback: (event: any) => void): void {
    this.eventListeners[eventType].push(callback);
  }

  /** Removes an event listener for a given event type */
  removeEventListener(eventType: EventType, callback: (event: any) => void): void {
    this.eventListeners[eventType] = this.eventListeners[eventType].filter(
      (cb) => cb !== callback
    );
  }

  /** Dispatches an event to all registered listeners */
  private dispatchEvent(eventType: EventType, event: any): void {
    this.eventListeners[eventType].forEach((cb) => cb(event));
  }

  /** Updates connection options dynamically (effective on next connection) */
  updateOptions(newOptions: Partial<WSConnectionOptions>): void {
    this.options = { ...this.options, ...newOptions };
    this.log("debug", "[WS] Options updated:", this.options);
  }

  /** Clears the outgoing message queue */
  clearMessageQueue(): void {
    this.messageQueue = [];
    this.log("debug", "[WS] Message queue cleared.");
  }
}

export default AdvancedWebSocket;