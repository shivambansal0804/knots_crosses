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
roomsCreated=[]

io.on('connection',(socket)=>{
    var roomName
        allSocketIds.push(socket.id)
        console.log(allSocketIds)

    socket.on('createRoom',()=>{

    roomsCreated.push(socket.id)
    console.log('room created'+socket.id)
    roomName= socket.id
    
    })

    socket.on('joinRoom',(data)=>{
        if(roomsCreated.includes(data.id)){
            socket.join(data.id)
            console.log(data.id)
             roomName=data.id
             console.log(roomName)
            io.to(data.id).emit('twoPlayersIn')
        }else{
            socket.emit('err')
        }

    })


            knots=[]
            crosses=[]
            socket.on('playerVal',(data)=>{
                console.log('player is outside if  ' + data.player)
            
                if(data.id==roomName){
                    console.log('player is inside if ' + data.player + ''+ data.id)
                    socket.emit('chooseDone',{
                        turn: data.player
                    })
                }else{
                    console.log('player is else  ' + data.player + ' '+ data.id)
                    socket.emit('chooseDone',{
                        turn: data.player
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
                    if(knots.length>=3||crosses.length>=3){
                            console.log('knots:'+knots)
                            console.log('crosses:'+crosses)
                            winCombos.forEach((combo)=>{
                            
                            if(knots.indexOf(''+combo[0])!=-1&&knots.indexOf(''+combo[1])!=-1&&knots.indexOf(''+combo[2])!=-1){
                                    io.to(roomName).emit('gameOver',{
                                        winningCombo: combo,
                                        playerWon: data.player
                                    })
                                    console.log(combo)
                                }else if(crosses.indexOf(''+combo[0])!=-1&&crosses.indexOf(''+combo[1])!=-1&&crosses.indexOf(''+combo[2])!=-1){
                                    io.to(roomName).emit('gameOver',{
                                        winningCombo: combo,
                                        playerWon: data.player
                                        
                                    })
                                    console.log(combo)
                                }else if((crosses.length + knots.length)==9){
                                    io.to(roomName).emit('gameOver',{
                                        number: 9
                                        
                                    })
                                }
                                
                            })
                        }

                        io.to(roomName).emit('done',{
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