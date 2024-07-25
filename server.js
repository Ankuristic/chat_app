const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const {connect} = require('./config')
const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors());

// Create socket server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Use socket events
io.on('connection', (socket) => {
  console.log('connection is established');

  socket.on("join",(data)=>{
    socket.username=data;
  })
  socket.on('new_message',(message)=>{
    // broadcast this message to all the clients .


    let userMessage = {
      username: socket.username,
      message: message
    }

    const newChat = new chatModel({
      username:socket.username,
      message:message,
      timestamp: new Date()
    });


    newChat.save()






    io.emit('broadcast_message', message);
    
  })

  socket.on('disconnect', () => {
    console.log('connection is disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
  connect();
});