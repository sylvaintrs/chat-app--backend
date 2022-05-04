const http = require('http');
const express = require('express')
const socket = require('socket.io')
const cors = require('cors');

const app = express()
const port = process.env.PORT || 8000


const server = http.createServer(app);

app.use(cors());


const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

io.on('connection', socket => {
    console.log("socket:", socket.id)

    socket.on('CLIENT_MSG', data => {
        console.log('msg:', data)
        io.emit('SERVER_MSG', data)
    })

})

server.listen(port);