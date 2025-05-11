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

// --- sockets ---
import * as socketHandler from './socketHandlers/index.js'
io.on('connection', (socket) => {
   console.log('new client connected:', socket.id)

   // --- socket connection  ---
   socketHandler.connection.handleConnection(io, socket)
   socketHandler.connection.handleDisconnection(io, socket)

   // namespace routes
   io.of('/trade').on('connection', (socket) => {
      // --- socket handlers ---
      socketHandler.trade.handleConnection(io, socket)
      socketHandler.trade.handleDisconnection(io, socket)
   })

   io.of('/user').on('connection', (socket) => {
      // --- socket handlers ---
      socketHandler.user.handleConnection(io, socket)
      socketHandler.user.handleDisconnection(io, socket)
   })

})


// --- server ---
const PORT = process.env.SERVER_PORT || 3000
server.listen(PORT, () => {
   console.log('server running on ', PORT)
})

