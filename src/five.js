import React from 'react'
import './App.css'

let memo;
function Square(props) {
  return (
    <button className={props.value=="X"?"square colourR ": "square colourB"} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const initialState={squares:Array(25).fill(null),human:"",ai:""}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state={...initialState}; //Prevents Mutation?!
    
  }
  reset=this.reset.bind(this); //This is needed for reset

  choosePlayer(e){
    let player=e.target.value;
    console.log(player)
    e.target.value=="X"?this.setState({human:"X",ai:"O"}):this.setState({human:"O",ai:"X"})
    let parentDiv=document.getElementById('choice')
    console.log(parentDiv)
    parentDiv.style.display="none";
}
 


  

  bestMove(board){
    let bestScore=100;
    let bestmove;
    for (let i=0;i<25;i++){
      if (board[i]==null){
         board[i]=this.state.ai;
         let score=miniMax1(this.state.human,this.state.ai,board,memo={},0,true);
         board[i]=null;
         if (score<bestScore){
          bestmove=i
          bestScore=score;
          
         }
      }
    }
    board[bestmove]=this.state.ai;
}

  handleClick(i){
    const sq=this.state.squares.slice()
    if (sq[i]==null){
      sq[i]=this.state.human
    
      this.setState({
        squares:sq
      })
    setTimeout(this.bestMove(sq),500)
    }
    return;
    
  }
  renderSquare(i) {
   
    return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)} />;
  }
  reset(){
    this.setState(initialState);
    let parentDiv=document.getElementById('choice');
    parentDiv.style.display="";
    
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      console.log(winner);
      status = <div className={winner=="X"?"colourRWin":"colourBWin"}>Winner!{winner}</div>
    } 

    return (
      <div className="container">
        <div className="status">{status}</div>
        <div className="choice" id="choice">
            <h2>Choose a player</h2>
            <button className="btn btn-danger" value="X" onClick={(e)=>this.choosePlayer(e)}>X</button>
            <button className="btn btn-primary" value="O" onClick={(e)=>this.choosePlayer(e)}>O</button>
        </div>
        <button onClick={this.reset}>Reset</button>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-row">
          
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
      
        </div>
        <div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
         
        </div>
        <div className="board-row">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
         
        </div>
        
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = 
    [ [0, 1, 2, 3, 4],
      [5,6, 7,8,9],
      [10,11, 12 ,13, 14],//Bug on this horizontal line?
      [15, 16, 17 ,18,19],
      [20, 21 ,22 ,23,24],
      [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
    [0,6,12,18,24],
    [4, 8,12, 16,20]
      
    ];
    
    for (let i = 0; i < lines.length; i++) {
      var [a, b, c, d, e] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c] ===squares[d] && squares[d]===squares[e]) {
        return squares[a];
      }
      else if(!squares.includes(null)) return "TIE"
    }
    return null;
  }
 function miniMax1(human,ai,board,memo={},depth,Max){
   if (depth in memo) return memo[depth]
  let res=calculateWinner(board);
  if (res!==null){
    let score=res==human?100:res==ai?-100:0;
    return score
  }
  
  if(Max){
    let best=-100
    for (let i=0;i<25;i++){
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
    for (let i=0;i<25;i++){
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


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game

