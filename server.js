var winCombos=[
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [2,4,6]
]


const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
const PORT= process.env.PORT|| 4000
allSocketIds=[]
var serverTurn
io.on('connection',(socket)=>{
allSocketIds.push(socket.id)
console.log(allSocketIds)
knots=[]
crosses=[]
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
         if(data.player==1){
         crosses.push(data.idClick)
        }
         else{
          knots.push(data.idClick)   
         }
         if(knots.length>=3||crosses.lenght>=3){
                console.log('knots:'+knots)
                console.log('crosses:'+crosses)
                winCombos.forEach((combo)=>{
                   
                 if(knots.indexOf(''+combo[0])!=-1&&knots.indexOf(''+combo[1])!=-1&&knots.indexOf(''+combo[2])!=-1){
                        io.emit('gameOver',{
                            winningCombo: combo,
                            playerWon: data.player
                        })
                        console.log(combo)
                    }else if(crosses.indexOf(''+combo[0])!=-1&&crosses.indexOf(''+combo[1])!=-1&&crosses.indexOf(''+combo[2])!=-1){
                        io.emit('gameOver',{
                            winningCombo: combo,
                            playerWon: data.player
                        })
                    }
                    
                })
            }

            io.emit('done',{
                id: data.idClick,
                turn:2,
                player: data.player
            })
          
        })
     
})

app.use('/', express.static(__dirname + '/public'))

server.listen(PORT,()=>{
    console.log('server started on 4000')
})