import fs from 'fs';
// queue

const history = [];

function addTrade(event, data) {
  const trade = {
    event,
    data,
    timestamp: new Date().toISOString(),
  };
  history
      .push(trade)
      .slice(-100); // Keep only the last 100 trades

   logTrade(trade);
   return trade;
}

function logTrade(trade) {
   // write 
   const logEntry = `${trade.timestamp} - ${trade.event}: ${JSON.stringify(trade.data)}\n`;
   fs.appendFile('trade_history.log', logEntry, (err) => {
     if (err) {
       console.error('Error writing to log file:', err);
     } else {
       console.log('Trade logged:', logEntry);
     }
   });

}

// --- export ---

export { addTrade, history };
