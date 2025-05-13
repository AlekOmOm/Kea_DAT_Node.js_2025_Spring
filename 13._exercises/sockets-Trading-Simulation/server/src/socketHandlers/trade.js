import * as tradeHistory from '../trade/history.js';


// --- trade.js ---
const buy = (amount, price) => {
   console.log(`Buying ${amount} at ${price}`);
   tradeHistory.addTrade('buy', {
      amount,
      price,
      timestamp: new Date().toISOString()
   });
}

const sell = (amount, price) => {
   console.log(`Selling ${amount} at ${price}`);
   tradeHistory.addTrade('sell', {
      amount,
      price,
      timestamp: new Date().toISOString()
   });
}



// --- export ---

export default {
   buy,
   sell
}

