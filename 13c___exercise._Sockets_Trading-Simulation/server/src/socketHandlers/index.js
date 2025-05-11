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

const connection = {
   handleConnection: (io, socket) => {
      console.log('new client connected:', socket.id)
   },
   handleDisconnection: (io, socket) => {
      console.log('client disconnected:', socket.id)
   }
}












// --- export default ---
export default {
   connection,
   trade,
   user
}

