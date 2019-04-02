const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
allSocketIds=[]
var serverTurn
io.on('connection',(socket)=>{
allSocketIds.push(socket.id)
console.log(allSocketIds)
    socket.on('playerVal',(data)=>{
    // if(data.player==1){
    //     socket.emit('turn',{
    //         msg: 'IT IS YOUR TURN'
    //     })
    //     socket.broadcast.emit('notTurn',{
    //         msg: 'IT IS OTHER PLAYERS TURN'
    //     })
    // }else {
    //     socket.emit('notTurn',{
    //         msg: 'IT IS OTHER PLAYERS TURN'
    //     })
    //     socket.broadcast.emit('turn',{
    //         msg: 'IT IS YOUR TURN'
    //     })
    // }
   serverTurn = data.player
    if(data.player==1){
        socket.emit('chooseDone',{
            turn: serverTurn
        })
    }else{
        socket.emit('chooseDone',{
            turn: serverTurn
        })
    }
    
    })
    socket.on('clicked',(data)=>{
        console.log(data.idClick)
        
            io.emit('done',{
                id: data.idClick,
                turn:2,
                player: data.player
            })
          
        })
     
})

app.use('/', express.static(__dirname + '/public'))

server.listen(4000,()=>{
    console.log('server started on 4000')
})