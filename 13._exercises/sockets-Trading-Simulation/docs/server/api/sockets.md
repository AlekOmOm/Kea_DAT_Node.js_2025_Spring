# Socket.IO API: Communication Data Structures

**defining** - the ***data structures*** for 
- payloads, 
- acknowledgements 

---
- [Socket.IO API: Communication Data Structures](#socketio-api-communication-data-structures)
  - [1. Event: `buyOrder`](#1-event-buyorder)
  - [2. Event: `sellOrder`](#2-event-sellorder)
  - [3. Event: `priceUpdate`](#3-event-priceupdate)


## 1. Event: `buyOrder`

*   **Direction:** Client → Server
*   **Description:** Emitted when the client initiates a request to buy a quantity of an asset (e.g., "SimCoin").
*   **Payload Structure:**
    ```json
    {
      "quantity": 1
    }
    ```
    *   `quantity` (Number): The amount of the asset the client wishes to buy.

*   **Acknowledgement Structure (Server → Client):**
     used for direct feedback to the client 

    *   **On Success (`status: "success"`):**
        ```json
        {
          "status": "success",
          "message": {
            "trade": {
              "order": {
                "type": "buy",
                "quantity": 1,
                "price": 101.00,
                "asset": "SimCoin"
              },
              "filled": true
            }
          }
        }
        ```
        *   `status` (String): Indicates the outcome.
        *   `message.trade.order.type` (String): Always "buy".
        *   `message.trade.order.quantity` (Number): The quantity successfully bought.
        *   `message.trade.order.price` (Number): The price at which the asset was bought.
        *   `message.trade.order.asset` (String): The name of the asset (e.g., "SimCoin").
        *   `message.trade.filled` (Boolean): Always `true` for a successful trade.

    *   **On Error (`status: "error"`):**
        ```json
        {
          "status": "error",
          "message": {
            "trade": {
              "order": {
                "type": "buy",
                "quantity": 1,
                "price": 101.00, // attempted price
                "asset": "SimCoin"
              },
              "filled": false,
              "errorReason": "Specific error message from server, e.g., 'Could not process buy order.'"
            }
          },
          "details": "Optional raw technical error message for debugging."
        }
        ```
        *   `status` (String): Indicates the outcome.
        *   `message.trade.order.type` (String): always "buy".
        *   `message.trade.order.quantity` (Number): attempted quantity
        *   `message.trade.order.price` (Number): attempted price
        *   `message.trade.order.asset` (String): asset name
        *   `message.trade.filled` (Boolean): always `false` for a failed trade.
        *   `message.trade.errorReason` (String): a user-friendly reason why the order failed (might be forwardable to the UI - written for users & devs).
        *   `details` (String, Optional): additional technical details about the error, primarily for server-side logging or debugging (not forwardable to the UI - written for devs).

## 2. Event: `sellOrder`

*   **Direction:** Client → Server
*   **Description:** Emitted when the client initiates a request to sell a quantity of an asset.
*   **Payload Structure:**
    ```json
    {
      "quantity": 1
    }
    ```
    *   `quantity` (Number): the amount of the asset the client wishes to sell.

*   **Acknowledgement Structure (Server → Client):**
    Used to provide direct feedback to the client about the outcome of their sell order.

    *   **On Success (`status: "success"`):**
        ```json
        {
          "status": "success",
          "message": {
            "trade": {
              "order": {
                "type": "sell",
                "quantity": 1,
                "price": 99.00,
                "asset": "SimCoin"
              },
              "filled": true
            }
          }
        }
        ```
        *   Fields are analogous to the successful `buyOrder` acknowledgement.

    *   **On Error (`status: "error"`):**
        ```json
        {
          "status": "error",
          "message": {
            "trade": {
              "order": {
                "type": "sell",
                "quantity": 1,
                "asset": "SimCoin"
              },
              "filled": false,
              "errorReason": "Specific error message from server, e.g., 'Not enough assets to sell.'"
            }
          },
          "details": "Optional raw technical error message for debugging."
        }
        ```
        *   Fields are analogous to the failed `buyOrder` acknowledgement.

## 3. Event: `priceUpdate`

*   **Direction:** Server → All Clients (Broadcast)
*   **Description:** Emitted by the server whenever the price of an asset changes due to trading activity.
*   **Payload Structure:**
    ```json
    {
      "newPrice": 101.50,
      "assetName": "SimCoin"
    }
    ```
    *   `newPrice` (Number): The updated current market price of the asset.
    *   `assetName` (String): The name of the asset whose price was updated (e.g., "SimCoin").

---
*This document should be kept in sync with actual implementations in `server/src/socketHandlers/` and the Svelte client.* 