# Socket.IO Color Changer - Svelte & Express

This project demonstrates a simple real-time color changing application using Svelte for the frontend and Express with Socket.IO for the backend. It's designed to illustrate the basic principles of WebSocket communication.

## Tech Stack

*   **Frontend**: Svelte
*   **Backend**: Node.js with Express
*   **Real-time Communication**: Socket.IO

## Architecture & Socket Communication Flow

The core idea is to allow users to pick a color on a Svelte frontend, send this color to an Express backend via Socket.IO, which then broadcasts this color to all connected clients.

### 1. Client Connects to Server

*   **File**: `Socket-Svelte/src/pages/Colors/Colors.svelte`
*   **Action**: Inside the `onMount` lifecycle function, the Svelte client initiates a Socket.IO connection to the server (typically `io("http://localhost:8080")`).

    ```javascript
    // Socket-Svelte/src/pages/Colors/Colors.svelte
    import { onMount } from 'svelte';
    import io from 'socket.io-client';

    let socket;

    onMount(() => {
       socket = io("http://localhost:8080"); // Connect to the server
       // ... other client-side socket event listeners
    });
    ```

*   **File**: `server/app.js`
*   **Action**: The Express server, with Socket.IO integrated, listens for new connections.

    ```javascript
    // server/app.js
    import { Server } from 'socket.io';
    // ... other imports and Express setup ...
    const io = new Server(server); // server is the HTTP server instance

    io.on("connection", (socket) => {
       console.log("A client connected", socket.id);
       // ... server-side socket event listeners for this specific client
    });
    ```

### 2. Client Sends Color to Server

*   **File**: `Socket-Svelte/src/pages/Colors/Colors.svelte`
*   **Action**: When the user submits a color, the `submitColor` function emits a `client-sends-color` event to the server, along with the color data.

    ```javascript
    // Socket-Svelte/src/pages/Colors/Colors.svelte
    let color = "#ff0000";

    function submitColor() {
       console.log("Sending color:", color);
       socket.emit("client-sends-color", { color });
    }
    ```

*   **File**: `server/app.js`
*   **Action**: The server listens for the `client-sends-color` event from any connected client.

    ```javascript
    // server/app.js
    io.on("connection", (socket) => {
       // ...
       socket.on("client-sends-color", (data) => {
          console.log("Received color from client:", data.color);
          // ... process data and broadcast
       });
       // ...
    });
    ```

### 3. Server Broadcasts Color to All Clients

*   **File**: `server/app.js`
*   **Action**: Upon receiving a color, the server broadcasts a `server-sends-color` event (or a similar event name, like `server-sends-data` as per your current server code) to *all* connected clients, including the sender.

    ```javascript
    // server/app.js
    io.on("connection", (socket) => {
       socket.on("client-sends-color", (data) => {
          // Broadcast to all connected clients
          io.emit("server-sends-color", { color: data.color });
          // Or, as in your current server/app.js:
          // io.emit("server-sends-data", data);
       });
    });
    ```
    *Note: Your `server/app.js` currently uses `io.emit("server-sends-data", data)`. The client should listen for this exact event name.*

### 4. Clients Receive Color and Update UI

*   **File**: `Socket-Svelte/src/pages/Colors/Colors.svelte`
*   **Action**: Each connected client listens for the `server-sends-color` (or `server-sends-data`) event. When received, it updates its state or UI. For instance, changing the background color or updating a list of colors.

    ```javascript
    // Socket-Svelte/src/pages/Colors/Colors.svelte
    onMount(() => {
       socket = io("http://localhost:8080");

       socket.on("server-sends-color", (data) => { // Or "server-sends-data"
          console.log("Received color from server:", data.color);
          document.body.style.backgroundColor = data.color;
          // Potentially update a shared Svelte store as well
       });
    });
    ```

## Key Files for Socket Logic

*   **Backend Socket Handling**: `server/app.js`
*   **Frontend Socket Handling & UI**: `Socket-Svelte/src/pages/Colors/Colors.svelte`
*   **(Optional) Frontend State Management**: `Socket-Svelte/src/stores/colorsListStore.js` (if you are using a store to share color data across components)

## How to Run

### 1. Backend Server (Express)

Navigate to the `server` directory:
```bash
cd server
npm install
npm start
```
The server will typically start on port 8080.

### 2. Frontend Client (Svelte)

Navigate to the `Socket-Svelte` directory:
```bash
cd Socket-Svelte
npm install
npm run dev
```
The Svelte development server will start (usually on port 5173 or similar) and open the application in your browser.

---

This structure provides a clear path for understanding how data flows from the client to the server and back to all clients using Socket.IO. 