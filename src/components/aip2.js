import React from 'react'
import Nav from './Nav'
let human="X"
let ai="O"

let memo;
function Square(props) {
  return (
    <button className={props.value=="X"?"square colourR ": "square colourB"} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const initialState={squares:Array(25).fill(null),player:"X",speed:1000,OIsNext:null,XIsNext:null}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state={...initialState}; //Prevents Mutation?!
    
  }
  reset=this.reset.bind(this); //This is needed for reset
  startAi=this.startAi.bind(this)
  bestMove=this.bestMove.bind(this)
  worstMove=this.worstMove.bind(this)

bestMove(board){
    let worstScore=-100;
    let worst;
  for (let i=0;i< 25;i++){
    if (board[i]==null){
        board[i]=human;
        let score=miniMax1(human,ai,board,memo={},0,false);
        board[i]=null;
        if (score>worstScore){
            worst=i;
            worstScore=score;
        }
    }
   }
   board[worst]=human;
   this.setState({squares:board, player:ai})
   let sq2=this.state.squares.slice()
  
   const makeWorseMove=setTimeout(()=>this.worstMove(sq2),this.state.speed);
   this.setState({OIsNext: makeWorseMove})
}

  

  worstMove(board){
    let bestScore=100;
    
    let bestmove;
    for (let i=0;i<25;i++){
      if (board[i]==null){
         board[i]=ai;
         let score=miniMax1(human,ai,board,memo={},0,true);
         board[i]=null;
         if (score<bestScore){
          bestmove=i
          bestScore=score;
          
         }
      }
    }
    board[bestmove]=ai;
    this.setState({squares:board,player:human})
    let sq=this.state.squares.slice()
    const makeBestMove= setTimeout(()=>this.bestMove(sq),this.state.speed);
    this.setState({XIsNext: makeBestMove})
}


  startAi(){
    
    const sq=this.state.squares.slice()
    let i=Math.floor(Math.random()*25) //We randomly choose an empty square for X
    if (sq[i]==null){
      sq[i]=human;
    
      this.setState({
        squares:sq,player:ai
      })
    }
    setTimeout(()=>this.worstMove(sq),this.state.speed)
  
    
  }
  renderSquare(i) {
   
    return <Square value={this.state.squares[i]} />;
  }
  reset(){
    this.setState(initialState);
    clearTimeout(this.state.XIsNext);
    clearTimeout(this.state.OIsNext)
  }

  speed(){
    let speed=document.getElementById('speed').value;
    this.setState({speed: Number(speed)})

  }


  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    let playerTurn=this.state.player;
    if (winner) {
      console.log(winner);
      status = <div className={winner=="X"?"colourRWin":"colourBWin"}>Winner!{winner}</div>
      clearTimeout(this.state.XIsNext);
      clearTimeout(this.state.OIsNext)
    } 

    return (
      <div className="container">
        <div className="status">{status}</div>
        <div className="choice" id="choice">
            <h2>Computer vs Computer: {playerTurn}'s turn</h2>
            <button onClick={()=>this.startAi()}>Start AI Game</button>
            <select id="speed" onChange={()=>this.speed()}>
              <option value="200">200ms</option>
              <option value="400">400ms</option>
              <option value="600">600ms</option>
              <option value="800">800ms</option>
              <option value="1000">1s</option>
              <option value="2000">2s</option>
            </select>
        </div>
        <button onClick={()=>this.reset()}>Reset</button>
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
  const lines = [
    [4,9,14,19,24],
      [0, 1, 2, 3, 4],
      [5,6, 7,8,9],
      [10,11, 12 ,13, 14],
      [15, 16, 17 ,18,19],
      [20, 21 ,22 ,23,24],
      [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [0,6,12,18,24],
    [4, 8,12, 16,20]
      
    ];
    
    for (let i = 0; i < lines.length; i++) {
      var [a, b, c, d, e] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c] ===squares[d] && squares[d]==squares[e]) {
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

export default Game
