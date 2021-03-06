import React from 'react';
import Nav from './Nav'

let human='X';
let ai='O'
let initialState={squares: Array(42).fill(null)}
let memo;
let combos= require('./combos')
console.log(combos)
function Square(props) {
  return (
    <button className={props.value=="X"?"circle Rcircle ":props.value=="O"?"circle Ycircle":"circle"} onClick={props.onClick}>
      
    </button>
  );
}

class Board extends React.Component {
    constructor(props){
      super(props);
      this.state={...initialState}; //Prevents Mutation?!
      
    }
    reset=this.reset.bind(this); //This is needed for reset
    
  
    bestMove(board){
      let bestScore=Infinity;
      let bestmove;
      for (let i=0;i<42;i++){
        if (board[i]==null){
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
      board[bestmove]=ai;
  }
  
    handleClick(i){
  
      const sq=this.state.squares.slice()
    
    if (sq[i]==null){
      sq[i]=human
      this.setState({
        squares:sq,

      })
      setTimeout(this.bestMove(sq),500)
      }
  }
    renderSquare(i) {
     
      return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)} />;
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
    
    for (let i = 0; i < combos.length; i++) {
      for (let j=0;j<combos[i].length;j++){
        console.log(combos[i][j])
        const [a, b, c, d] = combos[i][j];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c] ===squares[d]) {
          return squares[a];
        }
        else if(!squares.includes(null)) return "TIE"

      }
      return null;
     
    }
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
       if (board[i]==null){
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
       if(board[i]==null){
         board[i]=ai;
         var score=miniMax1(human,ai,board,memo,depth+1,true);
         board[i]=null
         best=Math.min(best,score);
         memo[depth]=best
       }
     }
     return memo[depth]
     
   }
 }

  export default Game;
