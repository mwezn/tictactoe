import React from 'react';
import Nav from './Nav'

let human='X';
let ai='O'
let initialState={squares: Array(42).fill(null)}
let memo;
const {mycombos, winningArrays}= require('./combos')

console.log(mycombos,winningArrays)


function Square(props) {
  return (
    <button id={props.id} className={props.value=="X"?"circle Rcircle ":props.value=="O"?"circle Ycircle":"circle playable"} onClick={props.onClick} onMouseEnter={props.onHover} onMouseOut={props.onMouseOut} onTouchStart={props.onTouch}>
      
    </button>
  );
}

function Square2(props) {
  return (
    <div className="topsquares" id={props.id}>
    </div>
  );
  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


class Board extends React.Component {
    constructor(props){
      super(props);
      this.state={...initialState}; //Prevents Mutation?!
      
    }
    reset=this.reset.bind(this); //This is needed for reset
  
    
  
    async bestMove(board){
      let bestScore=Infinity;
      let bestmove;
      for (let i=0;i<42;i++){
        if (board[i]==null && board[i+7]!==null){
           board[i]=ai;
           let score=miniMax1(human,ai,board,memo={},0,true)
           board[i]=null;
           console.log(score)
           if (score<bestScore){
            bestmove=i
            bestScore=score;
            
           }
        }
      }
      let top=bestmove%7;
      let n=top;
      while(n<=top+bestmove){
        let drop=document.getElementById(`square${n}`)
        let prevdrop=document.getElementById(`square${n-7}`)
        if (prevdrop) prevdrop.classList.remove('fall2')
        drop.classList.add('fall2')
        await sleep(50)
        n+=7;
      }
      board[bestmove]=ai;
      this.setState({
        squares:board, 
      })
  }
  
    async handleClick(i){
      const sq=this.state.squares.slice()
      let top=i%7;
      let n=top;
      
      if (sq[i]==null && sq[i+7]!==null){
        while(n<=top+i){
          let drop=document.getElementById(`square${n}`)
          let prevdrop=document.getElementById(`square${n-7}`)
          if (prevdrop) prevdrop.classList.remove('fall')
          drop.classList.add('fall')
          await sleep(50)
          n+=7;
        }
        sq[i]=human
        
        
        this.bestMove(sq)
        this.setState({
          squares:sq, 
        })
        
        
      }
      else {
        alert("Cant go Here")
      }
      
     
      
     
  }
    handleHover(i) {
       console.log(`Hovered over square number: ${i} & this is ${i%7}mod7`)
       let startTile=document.getElementById(i%7)
       console.log(startTile)
       startTile.classList.toggle('active')
    }
    handleMouseOut(i){
       let startTile=document.getElementById(i%7)
       console.log(startTile)
       startTile.classList.toggle('active')

    }


    async OnTouchStart(i){
      const sq=this.state.squares.slice()
      let top=i%7;
      let n=top;
      
      if (sq[i]==null && sq[i+7]!==null){
        while(n<=top+i){
          let drop=document.getElementById(`square${n}`)
          let prevdrop=document.getElementById(`square${n-7}`)
          if (prevdrop) prevdrop.classList.remove('fall')
          drop.classList.add('fall')
          await sleep(50)
          n+=7;
        }
        sq[i]=human
        
        
        this.bestMove(sq)
        this.setState({
          squares:sq, 
        })
        
        
      }
      else {
        alert("Cant go Here")
      }
    }
    /*OnTouchEnd(i){
      let startTile=document.getElementById(i%7)
      alert("screen touch end!")
      startTile.classList.toggle('active')
   }*/


    renderSquare(i) {
     
      return <Square id={`square`+i} value={this.state.squares[i]} onClick={()=>this.handleClick(i)} onHover={()=>this.handleHover(i)} onMouseOut={()=>this.handleMouseOut(i)} onTouch={()=>this.OnTouchStart(i)} touchEnd={()=>this.OnTouchEnd(i)}/>;
    }

    renderTopRow(){
      let toprow=[]
      for (let i=0;i<7;i++){
        toprow.push(<Square2 id={i}></Square2>)
      }
      return toprow
    }
    
    reset(){
      this.setState(initialState);
    }
    
  
    render() {
      const winner = c4Winner(this.state.squares);
      
      let status;
      if (winner) {
        console.log(winner);
        status = <div className={winner=="X"?"colourRWin":winner=="O"?"colourBWin":"colourG"}>Winner!{winner}</div>
      } 

    
  
      return (
        <div className="container">
          
          <div className="status">{status}</div>
          <button onClick={this.reset}>Reset</button>
          <div>Click on a square:</div>
          <div className="c4container">
          <div className='toprow'>
            {this.renderTopRow()}
          </div>
          <div className='board-row'>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className='board-row'>
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
          </div>
          <div className='board-row'>
            {this.renderSquare(14)}
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
          </div>
          <div className='board-row'>
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
            {this.renderSquare(25)}
            {this.renderSquare(26)}
            {this.renderSquare(27)}
          </div>
          <div className='board-row'>
            {this.renderSquare(28)}
            {this.renderSquare(29)}
            {this.renderSquare(30)}
            {this.renderSquare(31)}
            {this.renderSquare(32)}
            {this.renderSquare(33)}
            {this.renderSquare(34)}
          </div>
          <div className='board-row'>
            {this.renderSquare(35)}
            {this.renderSquare(36)}
            {this.renderSquare(37)}
            {this.renderSquare(38)}
            {this.renderSquare(39)}
            {this.renderSquare(40)}
            {this.renderSquare(41)}
          </div>
          
        </div>
        </div>
      );
    }
  }

  class Game extends React.Component {
    render() {
      return (
        <div>
          <Nav></Nav>
          <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
        </div>
      );
    }
  }

function c4Winner(squares){
    
    for (let i = 0; i < winningArrays.length; i++) {
        let a=winningArrays[i][0]
        let b=winningArrays[i][1]
        let c=winningArrays[i][2]
        let d=winningArrays[i][3]
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c] ===squares[d]) {
          return squares[a];
        }
        else if(!squares.includes(null)) return "TIE"

    }
      return null;
}
  function miniMax1(human,ai,board,memo={},depth,Max){
    
      
    if (depth in memo) return memo[depth]
   
   let res=c4Winner(board);
   if (res!==null){
     let score=res==human?100:res==ai?-100:0;
     return score
   }
   
  
   
   if(Max){
     let best=-100
     for (let i=0;i<42;i++){
       if (board[i]==null && board[i+7]!==null){
         board[i]=human;
         var score=miniMax1(human,ai,board,memo,depth+1,false);
         board[i]=null
         best=Math.max(best,score);
         memo[depth]=best
         
       }
     }
     return memo[depth]
   }
   else{
     let best=100
     for (let i=0;i<42;i++){
       if(board[i]==null && board[i+7]!==null){
         board[i]=ai;
         var score=miniMax1(human,ai,board,memo,depth,true);
         board[i]=null
         best=Math.min(best,score);
         memo[depth]=best

       }
     }
     return memo[depth]
     
   }
  }

  export default Game;
