# Server-Side WebSocket Implementation with Express

This document outlines the WebSocket implementation on the server using Express and the `socket.io` library. It also touches upon how this server-side setup is designed to interact with a Svelte frontend.

## Core Technologies

*   **Node.js**: The runtime environment for the server.
*   **Express.js**: A web application framework for Node.js, used here to set up the HTTP server and RESTful API endpoints.
*   **Socket.IO**: A library that enables real-time, bidirectional and event-based communication between web clients and servers. It's used here to handle WebSocket connections.

## Setup and Initialization

1.  **HTTP Server Creation**: An HTTP server is created using Node.js's built-in `http` module, with the Express app as its request handler.
    ```javascript
    import http from 'http';
    const server = http.createServer(app);
    ```

2.  **Socket.IO Server Initialization**: The `socket.io` Server is initialized by passing the HTTP server instance. CORS (Cross-Origin Resource Sharing) is configured to allow connections from the Svelte development server (assumed to be `http://localhost:5173`). Credentials are set to `true` to allow the server to send cookies to the client, which is important for session management.
    ```javascript
    import { Server } from 'socket.io';

    const io = new Server(server, {
       cors: {
          origin: "http://localhost:5173",
          credentials: true
       }
    });
    ```

3.  **Session Middleware**: `express-session` middleware is configured and applied to the `socket.io` engine. This allows WebSocket connections to access and utilize session data, enabling stateful communication.
    ```javascript
    import session from 'express-session';

    const sessionMiddleware = session({
      secret: process.env.SESSION_SECRET, // Ensure SESSION_SECRET is set in your .env file
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false } // Set to true if using HTTPS
    });

    io.engine.use(sessionMiddleware);
    ```

## WebSocket Connection Handling

The server listens for new WebSocket connections using `io.on("connection", (socket) => { ... })`.

*   **Client Connection**: When a client connects, a message is logged to the console with the client's unique `socket.id`.
*   **Receiving Data (`client-sends-color`)**:
    *   The server listens for a custom event named `"client-sends-color"`.
    *   When this event is received, the server retrieves the `nickname` from the socket's session (or defaults to "anonymous").
    *   It updates or initializes `timesSubmitted` in the session for the connected client.
    *   The received data, along with the `nickname` and `timesSubmitted`, is logged.
    *   Finally, the server broadcasts this augmented data to **all connected clients** (including the sender) using `io.emit("server-sends-data", data)`.
*   **Client Disconnection**: When a client disconnects, a message is logged to the console.

```javascript
io.on("connection", (socket) => {
   console.log("A client connected", socket.id);

   socket.on("client-sends-color", (data) => {
      data.nickname = socket.request.session.nickname || "anonymous";
      socket.request.session.timesSubmitted = (socket.request.session.timesSubmitted || 0) + 1;
      data.timesSubmitted = socket.request.session.timesSubmitted;

      console.log("Received color data:", data);
      io.emit("server-sends-data", data);
   });

   socket.on("disconnect", () => {
      console.log("a client disconnected", socket.id);
   });
});
```

## Interaction with Svelte (Client-Side)

While this `README.md` focuses on the server, it's important to understand its role in a full-stack application with a Svelte frontend:

*   **Client-Side Socket.IO**: The Svelte application would use the `socket.io-client` library to connect to this server.
*   **Emitting Events**: The Svelte client would emit events (e.g., `"client-sends-color"` with color data) to the server.
*   **Listening for Events**: The Svelte client would listen for events broadcast by the server (e.g., `"server-sends-data"`) to update its UI in real-time based on data from other users or server-side logic.
*   **Session Management**: The session data established via HTTP requests (e.g., for nickname registration) can be accessed and utilized by WebSocket handlers on the server, allowing for a more personalized and stateful real-time experience. For instance, the `nickname` set via an HTTP POST request is available in the `socket.request.session` object.

## Running the Server

The server starts and listens on a port defined by the `PORT` environment variable, or defaults to `8080`.

```javascript
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT));
```

This setup provides a robust foundation for real-time features in a Svelte application, leveraging the power of Express for HTTP handling and Socket.IO for WebSocket communication. 