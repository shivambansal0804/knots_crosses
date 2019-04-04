

var board;
let playerOne ='X'
let playerTwo = 'O'
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



$(()=>{
    const socket = io()
    socket.on('connect', () => {
        console.log('Socket created ' + socket.id)
      })

 $('#gameBoard').hide()
 $('#submitPlayer').click(()=>{
     console.log('clicked')
     console.log($('#player').val())
     $('#choosePlayer').hide()
     $('#divButton').hide()
     $('#gameBoard').show()
     socket.emit('playerVal',{
         player: $('#player').val()
     })
    socket.on('chooseDone',(data)=>{
    console.log('player chosen succsfully')
       
        takeTurn(data.turn)
        
    })
    
 })
 function Clicked(ev){
     console.log('clicked')
    // if(document.getElementById(ev.target.id).innerText==''){
    //     $('#'+ev.target.id).text(playerOne)
    if(document.getElementById(ev.target.id).innerText==''){
        socket.emit('clicked',{
            idClick: ev.target.id,
            
            player: $('#player').val()
        })
    }
     //    if(data.text=='x')
     //    {
     //    socket.emit('knOrCr',{
     //     push: knots   })
     // }else{
     //     socket.emit('knOrCr',{
     //         push: crosses
     //     })
     // }

//  }
 }
  function takeTurn(currTurn){
     
        if(currTurn==1){
         document.getElementById('table').addEventListener('click',Clicked)
         socket.on('done',(data)=>{
           if(data.player==1){
            $('#'+data.id)
            .attr('style','color: rgb(242, 235, 211)')
            .text('X')
           }else {
            $('#'+data.id)
            .attr('style','color: rgba(0,0,0,.54)')
            .text('O')
           }
            
            document.getElementById('table').removeEventListener('click',Clicked)
            takeTurn(data.turn)
           })
        }
        else{
            socket.on('done',(data)=>{
                if(data.player==1){
                    $('#'+data.id)
                    .attr('style','color: rgb(242, 235, 211)')
                    .text('X')
                   }else {
                    $('#'+data.id)
                    .attr('style','color: rgb(0,0,0,.54)')
                    .text('O')
                   }
            let varTurn=1
            takeTurn(varTurn)
            })
        }
       socket.on('gameOver',(data)=>{
           
           if(data.winningCombo){
        console.log(data.winningCombo)
        $('#'+data.winningCombo[0])
        .attr('style','background-color: #ffcc99;')

        $('#'+data.winningCombo[1])
        .attr('style','background-color: #ffcc99;')

        $('#'+data.winningCombo[2])
           
        .attr('style','background-color: #ffcc99;')
           }
         if(data.playerWon==1){
             $('#table').hide()
             $('#cross1').attr('style','animation: growCross1 1s  1  forwards;')
             $('#cross2').attr('style','animation: growCross2 1s  1  forwards;')
         }else{
            $('#table').hide()
            $('#circle').attr('style','animation: growCircle 1.2s 1  forwards;')
         }
         if(data.number==9)
         { 
            $('#table').hide()
            $('#cross1').attr('style','animation: growCross1 1s  1  forwards;')
            $('#cross2').attr('style','animation: growCross2 1s  1  forwards;')
            $('#circle').attr('style','animation: growCircle 1.2s 1  forwards;')
         }
        
        


       })

        }
//  let turn = true
//  startGame()
 
//  function startGame(){
//     let knots=[]
//     let crosses=[]
   
//     const cells = $('.cell')
   
//    $('#gameOver').attr('style','display:none')
//      $('.cell').click((ev)=>{
//         const idClicked ='#'+ev.target.id
//         // socket.emit('clicked',{
//         //     idClick: idClicked
//         // })
      
//     if(document.getElementById(ev.target.id).innerText==''){
        
//        if(turn==true){
//         $(idClicked)
//         .text(playerOne)
//         knots.push(ev.target.id)
//         turn = false
//        }else{
//            $(idClicked)
//            .text(playerTwo)
//            crosses.push(ev.target.id)
//            turn=true
//        }
//     }
//     if(knots.length>=3||crosses.lenght>=3){
//     console.log('knots:'+knots)
//     console.log('crosses:'+crosses)
//     winCombos.forEach((combo)=>{
       
//      if(knots.indexOf(''+combo[0])!=-1&&knots.indexOf(''+combo[1])!=-1&&knots.indexOf(''+combo[2])!=-1){
//             gameOver(combo,'playerOne')
//             console.log(combo)
//         }else if(crosses.indexOf(''+combo[0])!=-1&&crosses.indexOf(''+combo[1])!=-1&&crosses.indexOf(''+combo[2])!=-1){
//             gameOver(combo,'playerTwo')
//         }
        
//     })
// }
//      })

// }
// function gameOver(winCell,player){
// $('#'+winCell[0])
// .attr('style','background-color: green')
// $('#'+winCell[1])
// .attr('style','background-color: green')
// $('#'+winCell[2])
// .attr('style','background-color: green')


//     $('#gameOver')
//     .attr('style','display: block')
//     .text(player+' won')


// }
})