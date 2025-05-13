import dotenv from 'dotenv'; 
dotenv.config({ path: '../../../.env'});
// --- export constants ---


const makeUrl = (endpoint) => {
   return `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${endpoint}`
}

// home, user, trade
export const URLS = {
   HOME: makeUrl('home'),
   USER: makeUrl('user'),
   TRADE: makeUrl('trade')
}

console.log(`URLS: ${JSON.stringify(URLS)}`)

