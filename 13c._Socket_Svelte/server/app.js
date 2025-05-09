import express from 'express';

const app = express();

import 'dotenv/config'

app.use(express.static("public"))
app.use(express.json())

import cors from 'cors'
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}))

import session from 'express-session'
 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // http
}))

import nicknamesRouter from './routers/nicknamesRouter.js'
app.use(nicknamesRouter)

import http from 'http';

const server = http.createServer(app)

import { Server } from 'socket.io';


// io is namespace of server
const io = new Server(server, {
   cors: {
      origin: "http://localhost:5173"
   }
}); 




io.on("connection", (socket) => {
   console.log("A client connected", socket.id);



   socket.on("client-sends-color", (data) => {


      // broadcast to all
      io.emit("server-sends-data", data)
  
      // broadcast to others but itself
      //   fx. movements in-game 
      //       instantaneous movement for oneself, but broadcast (slight delay) of the character movement to other players
    //  socket.broadcast.emit("server-sends-data", data)

      // emits to a its own socket
    //  socket.emit("server-sends-data", data )
   })

   socket.on("disconnect", () => {
      console.log("a client disconnected", socket.id);
   })

})




// --- server --

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log("Server is running on port", PORT)); 




