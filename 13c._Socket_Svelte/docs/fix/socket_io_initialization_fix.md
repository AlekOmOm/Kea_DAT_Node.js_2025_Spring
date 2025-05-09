# Fixing a `ReferenceError` in `server/app.js` During Socket.IO Setup

This document outlines a `ReferenceError` encountered while setting up a Node.js server with Express, Socket.IO, and `express-session`, and the steps taken to resolve it.

## The Problem: `ReferenceError: Cannot access 'io' before initialization`

When starting the Node.js server (`server/app.js`), the following error occurred:

```
ReferenceError: Cannot access 'io' before initialization
    at file:///D:/devdrive/0._GitHub/01._Uni/.electives/NodeJS/01_Course_and_Exercises/Kea_DAT_Node.js_2025_Spring/13c._Socket_Svelte/server/app.js:28:1
    ...
```

This error indicated that the `io` object (the Socket.IO server instance) was being used before it was assigned a value (initialized).

**File Affected:** `server/app.js`

**Cause:**
The issue was in the order of operations. The line `io.engine.use(sessionMiddleware)` was called before `const io = new Server(server, { ... });` was executed.

**Conceptual Incorrect Order:**
```javascript
// sessionMiddleware is defined

// Attempt to use 'io'
io.engine.use(sessionMiddleware); // <--- ERROR: 'io' is not yet defined

// ... other code ...

// 'httpServer' (or 'server' in our case) is defined
const httpServer = http.createServer(app);

// 'io' is initialized much later
const io = new Server(httpServer, { /* ...options... */ });
```

## The Solution: Reordering Initialization

To fix this, the initialization of the `http` server, the `Server` instance for Socket.IO (`io`), and the application of the session middleware to Socket.IO needed to be correctly sequenced:

1.  Initialize the Express app (`app`).
2.  Define the `sessionMiddleware`.
3.  Create the `http` server instance using the Express `app`.
4.  Initialize the Socket.IO `Server` instance (`io`), passing it the `http` server.
5.  Apply the `sessionMiddleware` to the Socket.IO engine: `io.engine.use(sessionMiddleware)`.

**Conceptual Corrected Order:**
```javascript
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';

const app = express();

// 1. Define sessionMiddleware
const sessionMiddleware = session({
  secret: 'your secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

// 2. Create HTTP server
const httpServer = http.createServer(app);

// 3. Initialize Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Or your client's origin
    credentials: true
  }
});

// 4. Apply session middleware to Socket.IO
io.engine.use(sessionMiddleware);

// Now 'io' can be used for event handling, etc.
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  // Access session via socket.request.session
});

// Routers and other app configurations
// ...

// Start the server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

By ensuring `io` was initialized before being referenced, the `ReferenceError` was resolved, allowing the server to start correctly.

## Additional Improvement

During the fix, an optional chaining operator (`?.`) was added to a `console.log` statement:

```javascript
// console.log(socket.request.session.nickname) // Original
console.log("Session nickname on color send:", socket.request.session?.nickname); // Improved
```
This prevents a potential runtime error if `socket.request.session` exists but the `nickname` property has not yet been set on it. 