import express from 'express';

const app = express();

import 'dotenv/config'

app.use(express.static("public"))
app.use(express.json())

// ------------------------------------------------------------
// --------------- middleware ---------------

// cors
import cors from 'cors'
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}))

// session
import session from 'express-session'

   // sessionMiddleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // http
})

// ------------------------------------------------------------
// --------------- http server and socket.io initialization ---------------

import http from 'http';
const server = http.createServer(app)

import { Server } from 'socket.io';

// io is namespace of server
const io = new Server(server, {
   cors: {
      origin: "http://localhost:5173",
      // so that session server, can send cookies to client
      credentials: true
   }
});


// ------------------------------------------------------------
// --------------- custom middleware applied to server ---------------

// note: 
    // sessionMiddleware is applied to the io object
    // io.engine.use(sessionMiddleware)

io.engine.use(sessionMiddleware); // Essential for Socket.IO to access session

// ------------------------------------------------------------
// --------------- routers ---------------

import nicknamesRouter from './routers/nicknamesRouter.js'
app.use(nicknamesRouter)


// ------------------------------------------------------------
// --------------- Socket.IO connection handling ---------------

io.on("connection", (socket) => {
   console.log("A client connected", socket.id);

   socket.on("client-sends-color", (data) => {
      // data.nickname = socket.request.session.nickname
      data.nickname = socket.request.session.nickname || "anonymous"
      socket.request.session.timesSubmitted = (socket.request.session.timesSubmitted + 1 || 1)
      data.timesSubmitted = socket.request.session.timesSubmitted

      console.log("Received color data:", data);
      console.log("Session nickname on color send:", socket.request.session?.nickname);


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

// ------------------------------------------------------------
// -------------------------- server --------------------------

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT)); 




