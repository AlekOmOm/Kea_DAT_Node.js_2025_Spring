import * as tradeHandler from 'tradeHandlers.js'
import * as userHandler from 'userHandlers.js'

/**
 * consts: 
 * - connection:
 *    - handleConnection
 *    - handleDisconnection
 * - trade:
 *    - handleConnection
 *    - handleDisconnection
 * - user:
 *    - ..
 * 
 * @returns {Object} 
 */

const connection =  {
   handleConnection: (io, socket) => {
      console.log(conMsg, socket.id)
   },
   

   handleDisconnection: (io, socket) => {
      console.log(discMsg, socket.id)
   }
}

const trade = {
   handleTrade: (io, socket) => {
      console.log(tradeMsg, socket.id)
   },

   handleTradeDisconnection: (io, socket) => {
      console.log(tradeDiscMsg, socket.id)
   }
}

const user = {
}










// --- export default ---
export default {
   connection,
   trade,
   user
}

