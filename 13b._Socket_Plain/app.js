import express from 'express';

const app = express();

app.use(express.static("public"))

import http from 'http';

const server = http.createServer(app)

import { Server } from 'socket.io';


// io is namespace of server
const io = new Server(server); 




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




