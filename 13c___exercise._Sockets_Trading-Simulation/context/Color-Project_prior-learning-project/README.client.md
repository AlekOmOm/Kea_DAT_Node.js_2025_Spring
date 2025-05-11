# Socket-Svelte Frontend

This Svelte application demonstrates real-time communication using Socket.IO. It allows users to register a nickname and then collaboratively change the background color of the page, seeing updates from other users in real-time.

## Core Functionality

The application consists of two main parts:
1.  **Registration**: Users can submit a nickname which is stored in the server-side session and locally.
2.  **Color Picker**: After registration, users can pick a color. This color is sent to the server via a socket message, and the server then broadcasts this color change to all connected clients.

## Socket Implementation (Svelte Client)

The client-side socket logic is primarily located in `src/pages/Colors/Colors.svelte`.

### Connection
- The Svelte application uses the `socket.io-client` library to establish a WebSocket connection.
- It connects to the Socket.IO server running at `http://localhost:8080` when the `Colors` component is mounted.

```javascript
// src/pages/Colors/Colors.svelte
import { onMount } from 'svelte';
import io from 'socket.io-client';

let socket;

onMount(() => {
  socket = io("http://localhost:8080");
  // ... socket event listeners
});
```

### Emitting Events
- When a user submits a new color, the client emits a `client-sends-color` event to the server with the selected color.

```javascript
// src/pages/Colors/Colors.svelte
function submitColor() {
  socket.emit("client-sends-color", { color });
}
```

### Receiving Events
- The client listens for the `server-sends-data` event from the server.
- Upon receiving this event, it updates:
    - The `document.body.style.backgroundColor` to the new color.
    - A Svelte store (`colorsList`) which keeps track of all submitted colors and the nicknames of the users who submitted them. This list is then displayed in the UI.

```javascript
// src/pages/Colors/Colors.svelte
socket.on("server-sends-data", (data) => {
  document.body.style.backgroundColor = data.color;
  colorsList.update((colorsListArray) => {
    colorsListArray.push({ color: data.color, nickname: data.nickname });
    return colorsListArray;
  });
});
```

### State Management
- Svelte stores are used for managing shared state:
    - `nicknameStore`: Stores the user's nickname.
    - `colorsListStore`: Stores the list of colors submitted by users.

## Interaction with the Express Server

The Svelte client communicates with an Express server that has Socket.IO integrated.

### Server Endpoint
- The client connects to the Socket.IO server, which is typically running on `http://localhost:8080` (as configured in `server/app.js`).

### Event Handling
- **`client-sends-color`**: When the server receives this event, it:
    1.  Retrieves the user's nickname from the `express-session` data associated with the socket connection. If no nickname exists, it defaults to "anonymous".
    2.  Tracks the number of times a user has submitted a color within their session.
    3.  Broadcasts a `server-sends-data` event to *all* connected clients. This payload includes the chosen `color`, the `nickname`, and the `timesSubmitted` count.
- **Session Integration**: The Express server uses `express-session` and the `io.engine.use(sessionMiddleware)` bridge to allow Socket.IO handlers to access and modify session data. This is how the nickname, once registered via a regular HTTP POST request in `Registration.svelte`, becomes available to the socket handlers.

### Server-Side Logic
- The corresponding server-side socket logic can be found in `server/app.js` within the main project directory. It handles incoming connections, processes messages, and manages broadcasting.
- CORS is configured on the server to allow connections from the Svelte development server (e.g., `http://localhost:5173`).

## Running the Application

1.  **Start the Server**: Navigate to the `server/` directory and run the Express server (e.g., `npm run dev`).
2.  **Start the Svelte App**: Navigate to the `Socket-Svelte/` directory and run the Svelte development server (e.g., `npm run dev`).
3.  Open your browser to the address provided by the Svelte development server (usually `http://localhost:5173`). 