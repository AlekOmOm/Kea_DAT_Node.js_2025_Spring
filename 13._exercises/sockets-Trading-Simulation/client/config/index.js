// config/index.js  

console.log('Config loaded')
console.log('env vars:', process.env.SERVER_HOST, process.env.SERVER_PORT)

const toNum = x => Number(x)  

const makeUrl = (endpoint, host, port) => {
   return `http://${host}:${port}/${endpoint}`  
}

const SERVER = (() => {
  const HOST = process.env.SERVER_HOST
  const PORT = toNum(process.env.SERVER_PORT)
  return {
    HOST,
    PORT,
    URL: {
      HOME:  makeUrl('home',  HOST, PORT),
      USER:  makeUrl('user',  HOST, PORT),
      TRADE: makeUrl('trade', HOST, PORT),
    }
  }
})() // IIFE - for compute host and port, and build object 

export const config = {  
  CLIENT: {  
    HOST: process.env.CLIENT_HOST,  
    PORT: toNum(process.env.CLIENT_PORT),  
  },  
   SERVER,
}  

