const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// let count = 0


io.on('connection', (socket) => {
    console.log("new conn websocket")

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message',"a new user has joined")

    // socket.emit('countUpdated',count)
    // socket.on('increment',()=>{
    //     count++;
    //     // emitting tope\articular conn
    //     socket.emit('countUpdated',count)
    //     // server emits countUpdteed
    //     // io.emit('countUpdated',count)
    // dd})
    socket.on('sendMessage', (message) => {
        // broadcasta vevetnt to evry single
        io.emit('message', message)
    })

    socket.on('sendLocation',(coords)=>{
        io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })


    socket.on('disconnect',()=>{
        io.emit('message','a user has left')
    })
})

server.listen(port, () => {
    console.log(`server is up on ${port} `)
})