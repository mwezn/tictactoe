import React from 'react';
import Nav from './Nav'

function Square(props) {
  return (
    <button className={props.value=="X"?"square colourR ": "square colourB"} onClick={props.onClick}>
      {props.value}
    </button>
  );
}


const initialState={squares:Array(9).fill(null),human:"",ai:""}

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
      let btn=document.getElementById('resetbtn')
      btn.style.display="";
  }
  reset(){
    this.setState(initialState);
    let parentDiv=document.getElementById('choice')
    parentDiv.style.display="";
    let btn=document.getElementById('resetbtn')
    btn.style.display="none";
  }

  bestMove(board){
    let bestScore=Infinity;
    let bestmove;
    for (let i=0;i<9;i++){
      if (board[i]==null){
         board[i]=this.state.ai;
         let score=miniMax1(this.state.human,this.state.ai,board,0,true)
         board[i]=null;
         console.log(score)
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
        squares:sq,
        //xIsNext:!this.state.xIsNext,
      })
    setTimeout(this.bestMove(sq),500)
    }
    return;
    
  }
  renderSquare(i) {
   
    return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)} />;
  }
 

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      console.log(winner);
      status = <div className={winner=="X"?"colourRWin":winner=="O"?"colourBWin":"colourG"}>Winner!{winner}</div>
    }
    let player=this.state.human!==""?<h2>You are {this.state.human}</h2>:<h2>Choose a player</h2>

    return (
      <div className="container">
        {player}
        
        <div className="status">{status}</div>
        <div className="choice" id="choice">
            
            <button className="btn btn-danger" value="X" onClick={(e)=>this.choosePlayer(e)}>X</button>
            <button className="btn btn-primary" value="O" onClick={(e)=>this.choosePlayer(e)}>O</button>
        </div>
        <button id="resetbtn" onClick={this.reset}>Reset</button>
        <div>Click on a square:</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
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
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
      else if(!squares.includes(null)) return "TIE"
    }
    return null;
  }
 function miniMax1(human,ai,board,depth,Max){
  let res=calculateWinner(board);
  if (res!==null){
    let score=res==human?10:res==ai?-10:0;
    return score
  }
  
  if(Max){
    let best=-Infinity
    for (let i=0;i<9;i++){
      if (board[i]==null){
        board[i]=human;
        var score=miniMax1(human,ai,board,depth+1,false);
        board[i]=null
        best=Math.max(best,score);
      }
    }
    return best
  }
  else{
    let best=Infinity
    for (let i=0;i<9;i++){
      if(board[i]==null){
        board[i]=ai;
        score=miniMax1(human,ai,board,depth+1,true);
        board[i]=null
        best=Math.min(best,score);
      }
    }
    return best
    
  }
}

export default Game;
