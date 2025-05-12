[back](index.md)

# Socket.IO Terms

## toc
- [Socket.IO Terms](#socketio-terms)
  - [toc](#toc)
  - [Core Concepts](#core-concepts)
    - [Namespace](#namespace)
    - [Room](#room)
    - [Socket](#socket)
    - [Event](#event)
    - [Acknowledgement (Ack)](#acknowledgement-ack)
  - [Protocol \& Transport](#protocol--transport)
    - [Packet](#packet)
    - [Transport](#transport)
    - [Engine.IO](#engineio)
    - [Parser](#parser)
  - [Server-Side Architecture](#server-side-architecture)
    - [Adapter](#adapter)
    - [Middleware](#middleware)
  - [Utilities](#utilities)
    - [Emitter](#emitter)
    - [Handshake](#handshake)

## Core Concepts

### Namespace
- A communication channel that allows splitting application logic over a single shared connection.
    - **Default Namespace:** `/` (implicitly used if no namespace is specified).
    - **Custom Namespace:** User-defined path (e.g., `/admin`, `/chat`) to segment communication.
        - Server: `io.of('/namespace_name')`
        - Client: `io('/namespace_name')`

### Room
- An arbitrary channel that sockets can `join` and `leave`.
- Used to broadcast data to a subset of connected clients within a namespace.
- A socket can be in multiple rooms.
- Sockets automatically join a room identified by their own `socket.id`.

### Socket
- Represents an individual connection between a client and a server.
    - **Server-side Socket:** An object on the server instance representing a connected client.
    - **Client-side Socket:** An object in the client application that establishes and manages the connection to a server/namespace.

### Event
- A named message that can be emitted (sent) and listened for (received).
    - **`emit(eventName, ...args)`:** Sends an event with a name and optional data.
    - **`on(eventName, callback)`:** Registers a callback function to handle an incoming event.
    - Can be client-to-server, server-to-client, or server-to-room/namespace.

### Acknowledgement (Ack)
- A callback function that can be passed as the last argument to `emit`.
- The recipient of the event can invoke this callback to send a response back to the emitter.
- Confirms message delivery and allows for request-response patterns.

## Protocol & Transport

### Packet
- The fundamental unit of data exchanged in Socket.IO.
- Each packet has a `type` and usually a `namespace` and `data`.
    - **`CONNECT (0)`:** Client requests to connect to a namespace.
    - **`DISCONNECT (1)`:** Client requests to disconnect from a namespace, or server informs client of disconnection.
    - **`EVENT (2)`:** Transmits an event with data.
    - **`ACK (3)`:** Transmits an acknowledgement for a received event.
    - **`ERROR (4)`:** Transmits an error message.
    - **`BINARY_EVENT (5)`:** An EVENT packet that contains binary data.
    - **`BINARY_ACK (6)`:** An ACK packet that contains binary data (not used in v3+ as binary data is part of the main ACK packet).

### Transport
- The underlying communication mechanism.
    - **WebSocket:** The primary and preferred transport, offering a persistent, bidirectional connection.
    - **HTTP Long-Polling:** A fallback mechanism where the client repeatedly polls the server for messages. Used if WebSocket connection cannot be established.

### Engine.IO
- The low-level library that Socket.IO is built upon.
- Handles the actual transport connections (WebSocket, polling) and the mechanics of exchanging packets.
- Deals with connection establishment, upgrades, and heartbeats (ping/pong).

### Parser
- Responsible for encoding and decoding Socket.IO packets.
    - **`socket.io-parser`:** Handles the Socket.IO protocol layer, including namespaces, event names, and binary data placeholders.
    - **`engine.io-parser`:** Handles the Engine.IO framing and transport-level packet types (open, close, ping, pong, message, upgrade, noop).

## Server-Side Architecture

### Adapter
- A server-side component that synchronizes Socket.IO events and room information across multiple server instances (nodes) in a clustered environment.
- Allows broadcasting to all clients, or clients in a specific room, regardless of which server instance they are connected to.
    - e.g., `socket.io-redis`, `socket.io-mongo`

### Middleware
- Functions that can execute code during the connection lifecycle or for each incoming packet.
    - **Connection Middleware:**
        - **Socket.IO Namespace Middleware:** `namespace.use((socket, next) => { ... })`. Executed when a client tries to connect to a specific namespace. Useful for authentication/authorization.
        - **Engine.IO Middleware:** `io.engine.use((req, res, next) => { ... })`. Operates at the HTTP level for Engine.IO requests (polling, WebSocket handshake).
    - **Packet Middleware (less common):** Intercepts individual packets.

## Utilities

### Emitter
- A class or mixin that provides event emitting and listening capabilities (`on`, `emit`, `once`, etc.).
- Both `Socket` and `Namespace` instances are Emitters.
- `@socket.io/component-emitter` is the standalone library.

### Handshake
- The initial phase of a client connecting to the server.
- During the handshake, initial data can be exchanged, such as authentication tokens or query parameters.
    - `socket.handshake.auth`: Contains authentication payload from client.
    - `socket.handshake.query`: Contains query parameters from client connection URI.
    - `socket.handshake.headers`: Contains HTTP headers from the initial connection request.

---

_This list provides an overview of common terms. For a more detailed understanding, refer to the official Socket.IO documentation._


---


[terms index](./index.md) | [back to top](#toc) | 
- [svelte terms](./svelte.md)   |
- [express terms](./express.md)   | 