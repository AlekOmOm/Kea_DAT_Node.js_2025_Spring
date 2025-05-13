import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

// --- socket server with cors ---
import http from 'http'
import { Server } from 'socket.io'

// cors before socket server
import cors from 'cors'
app.use(cors())

// json parser
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
   cors: {
      origin: 'localhost:5173'
   }
})

// --- routing ---
// root route
app.get('/', (req, res) => {
   res.send('Trading Simulation Server running')
})

// --- socket server ---
/**
 * * namespaces: '/', '/trading', '/chat'
 *
 */

io.on('connection', (socket) => {
   console.log('global connection:', socket.id)
   socket.on('ping', () => socket.emit('pong'))
})

const tradeNS = io.of('/trade')
const userNS = io.of('/trade')

// middleware
tradeNS.use((socket, next) => {
   console.log('auth middleware checked', socket.id)
   next()
})

import * as handler from './socketHandlers/trade.js';
tradeNS.on('connection', (socket) => {
   socket.on('buy', (data) => handler.buy(socket, data))
   socket.on('sell', (data) => handler.sell(socket, data))

   socket.on('trade history', (data) => handler.tradeHistory(socket, data))

   socket.on('disconnect', () => {
      console.log('user disconnected', socket.id)
   })
})

userNS.on('log in', (socket) => {
   console.log('logged in', socket.id)
})






// --- server ---
const PORT = process.env.SERVER_PORT || 3000
server.listen(PORT, () => {
   console.log('server running on ', PORT)
})

