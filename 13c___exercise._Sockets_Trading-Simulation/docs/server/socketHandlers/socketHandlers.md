# Modular Socket.IO Event Handler Pattern for Svelte/Express Projects

This document outlines a **pattern** for structuring Socket.IO event handlers in a modular way for
- a Node.js/Express backend serving 
- a Svelte frontend. 
  
  This approach improves code organization, scalability, and maintainability, especially as your real-time trading simulation project grows.

---

## toc

- [Modular Socket.IO Event Handler Pattern for Svelte/Express Projects](#modular-socketio-event-handler-pattern-for-svelteexpress-projects)
  - [toc](#toc)
  - [Rationale](#rationale)
  - [Proposed Structure](#proposed-structure)
  - [Implementation Details](#implementation-details)
    - [1. Main Handler Aggregator (`socketHandlers/index.js`)](#1-main-handler-aggregator-sockethandlersindexjs)
    - [2. Specialized Handler Modules](#2-specialized-handler-modules)
      - [**Example: `tradeHandlers.js` (Handling SimCoin Trades)**](#example-tradehandlersjs-handling-simcoin-trades)
    - [3. Integration into Main Server File (`server.js`)](#3-integration-into-main-server-file-serverjs)
  - [Benefits of This Pattern](#benefits-of-this-pattern)

---
terms
- [terms sockets](../terms/sockets.md)

## Rationale

building for long-term clean code, 
- placing all Socket.IO event handling logic directly within the main `server.js` or the `io.on('connection', ...)` callback can become unwieldy. 
  
-> 
  **A modular approach**, separating handlers into distinct files based on their functionality (e.g., trading actions, user status), keeps your codebase clean and easier to manage.

pattern:
- identify namespaces
- identify event types of namespaces
- dir structure for namespaces


## Proposed Structure

Create a dedicated directory for your socket event handlers within your `server/src` directory.

```
server/
└── src/
    ├── socketHandlers/
    │   ├── index.js          // Main handler aggregator
    │   ├── tradeHandlers.js  // For trading-related events 
    │   └── (userHandlers.js) // Extensible: user events 
    ├── priceEngine.js        // business logic: price calculation logic
    └── server.js             // main 
```

## Implementation Details

### 1. Main Handler Aggregator (`socketHandlers/index.js`)

central index for registration of namespace handlers (domain-specific event-types). 
- imports individual handler modules 
- provides a primary function called once per new socket connection.

```javascript
// server/src/socketHandlers/index.js

import * as tradeHandlers from './tradeHandlers.js';
// import * as userHandlers from './userHandlers.js'; // extension 

/**
 * Registers all socket event handlers for a new client connection.
 * @param {object} io - The main Socket.IO server instance.
 * @param {object} socket - The individual client socket instance.
 */
export default function registerSocketHandlers(io, socket) {
  console.log(`Client connected: ${socket.id}`);

  // 'register' - main pattern for index.js to aggregate namespace-handler-modules 
  tradeHandlers.register(io, socket);
  // userHandlers.register(io, socket); // extension 

  // Enhanced disconnect handler
  socket.on('disconnect', (reason, description) => {
    console.log(`Client disconnected: ${socket.id}. Reason: ${reason}`);
    if (description) {
      console.log('Disconnect description:', description);
    }
    // Optionally, call cleanup in other modules, e.g., userHandlers.handleDisconnect(socket.id);
  });

  // Generic error handler for this socket
  socket.on('error', (error) => {
    console.error(`Socket Error from ${socket.id}:`, error);
    // You might want to inform the client if appropriate, though many errors are connection-related
  });

  // For learning: Catch-all for incoming events (useful for debugging)
  socket.onAny((eventName, ...args) => {
    console.log(`[DEBUG] Event received from ${socket.id}: ${eventName}`, args);
  });
}
```

### 2. Specialized Handler Modules

Each module 
- is within a namespace (domain) 
- focuses on a category of events. 

for trading simulation, `tradeHandlers.js` is key.
- 'trade' is the **namespace**
- 'buyOrder' and 'sellOrder' are the **event types**
  - '*Order' is a significant term within the trading domain (trading namespace)
    - sub-domain of 'trade' namespace

#### **Example: `tradeHandlers.js` (Handling SimCoin Trades)**

This module will handle `buyOrder` and `sellOrder` events from the Svelte client, interact with your `priceEngine.js`, broadcast price updates, and provide direct feedback to the client using **acknowledgements**.

pattern:
- identify events within domain and sub-domain 
  - 'trade' domain, 
  - 'order' sub-domain
  - 'event types': 'buy' and 'sell' 
    - -> trade: { order: { buy, sell }}
    - -> 'buyOrder, sellOrder' is the relevant event-types
- identify module dependencies (business logical connections)
  - 'priceEngine.js' is main data source for this module
  - 'socket' and 'io'
    - 'socket' is the connection to the client
    - 'io' is the socket-io server instance
  - client events
    - '.on': the client-side event listener
    - '.emit': the client-side event emitter
    - '.emitWithAck': the client-side event emitter with acknowledgement

```javascript
// server/src/socketHandlers/tradeHandlers.js
// import priceEngine from '../priceEngine.js'; // Assuming priceEngine exports necessary functions

export function register(io, socket) {
  // Handle 'buyOrder' event for SimCoin
  socket.on('buyOrder', async (orderData, ack) => {
    console.log(`Buy order for SimCoin received from ${socket.id}:`, orderData);
    try {
      // Example interaction with a price engine (replace with your actual logic)
      // const { newPrice, executedPrice, success, message } = priceEngine.processBuyOrder(orderData.quantity);

      // MOCK IMPLEMENTATION FOR LEARNING:
      const MOCK_ASSET_NAME = "SimCoin";
      const mockExecutedPrice = 101.00; // Simulate the price the trade executed at
      const mockNewPrice = 101.50;      // Simulate the new price after the trade
      const mockQuantity = orderData.quantity || 1;
      // END MOCK

      // if (success) { // From your actual priceEngine logic
      // Broadcast the new price to all clients
      io.emit('priceUpdate', { newPrice: mockNewPrice, assetName: MOCK_ASSET_NAME });

      // Send acknowledgement (feedback) to the originating client
      if (typeof ack === 'function') {
        ack({
          status: 'success',
          message: {
            trade: {
              order: {
                type: 'buy',
                quantity: mockQuantity,
                price: mockExecutedPrice,
                asset: MOCK_ASSET_NAME
              },
              filled: true,
            }
          }
        });
      } else {
        if (typeof ack === 'function') {
          ack({ status: 'error', message: message || 'Could not process buy order.' });
        }
      }
    } catch (error) {
      console.error(`Error processing buy order for ${socket.id}:`, error);
      if (typeof ack === 'function') {
        ack({
          status: 'error',
          message: {
            trade: {
              order: {
                type: 'buy',
                quantity: mockQuantity,
                price: mockExecutedPrice,
                asset: MOCK_ASSET_NAME
              },
              filled: false,
            }
          }
        });
      }
    }
  });

  // Handle 'sellOrder' event for SimCoin
  socket.on('sellOrder', async (orderData, ack) => {
    console.log(`Sell order for SimCoin received from ${socket.id}:`, orderData);
    try {
      // Example interaction with a price engine
      // const { newPrice, executedPrice, success, message } = priceEngine.processSellOrder(orderData.quantity);

      // MOCK IMPLEMENTATION FOR LEARNING:
      const MOCK_ASSET_NAME = "SimCoin";
      const mockExecutedPrice = 99.00;
      const mockNewPrice = 98.50;
      const mockQuantity = orderData.quantity || 1;
      // END MOCK

      // Broadcast the new price
      io.emit('priceUpdate', { newPrice: mockNewPrice, assetName: MOCK_ASSET_NAME });

      // Send acknowledgement
      if (typeof ack === 'function') {
        ack({
          status: 'success',
          message: {
            trade: {
              order: {
                type: 'sell',
                quantity: mockQuantity,
                price: mockExecutedPrice,
                asset: MOCK_ASSET_NAME
              },
              filled: true,
            }
          }
        });
      }
    } catch (error) {
      console.error(`Error processing sell order for ${socket.id}:`, error);
      if (typeof ack === 'function') {
        ack({
          status: 'error',
          message: 'An unexpected error occurred while processing your sell order.',
          details: error.message
        });
      }
    }
  });

  // Add other trade-related event listeners here if your simulation expands
}
```

### 3. Integration into Main Server File (`server.js`)

Import `registerSocketHandlers` in your `server.js` and call it within the `io.on('connection', ...)` callback.

```javascript
// server/src/server.js (simplified example)

import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

// Import the main socket handler registration function
import registerSocketHandlers from './socketHandlers/index.js';
// import priceEngine from './priceEngine.js'; // Your price engine

const app = express();
app.use(cors()); // Basic CORS for Express

// Example: Initialize your price engine
// priceEngine.initialize("SimCoin", 100.00, 1000000);

const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*", // For learning; restrict in production (e.g., your Svelte app's URL)
    methods: ["GET", "POST"]
  }
});

// Main Socket.IO connection listener
io.on('connection', (socket) => {
  // Pass the priceEngine instance or related functions if handlers need it directly,
  // or handlers can import it themselves if it's a singleton/module.
  registerSocketHandlers(io, socket /*, priceEngine */);
});

app.get('/', (req, res) => {
  res.send('Trading Simulation Server Running');
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Trading Simulation Server with Socket.IO on http://localhost:${PORT}`);
});
```


## Benefits of This Pattern

- **Improved Organization:** SimCoin trading logic is separate from other potential event types.
- **Enhanced Scalability:** Easy to add new event categories (e.g., `userHandlers.js`) as your project grows.
- **Better Readability:** Smaller, focused files are easier to understand.
- **Simplified Debugging:** `socket.onAny()` aids in tracing event flow.

This modular structure provides a solid foundation for your Socket.IO learning journey with the trading simulation project. Remember to adapt and extend it as your understanding and project requirements evolve!
