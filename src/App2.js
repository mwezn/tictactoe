let human="X";
let ai="O"
let memo;


var inner=[null,null,null,null,null]
var squares2= [inner,inner,inner,inner,inner]
var squares3=
[[null,null,null,null,null],
[null,null,null,null,null],
[null,null,null,null,null],
[null,null,null,null,null],
[null,null,null,null,null]]


function calculateWinner(squares) {
    const lines = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8 ,9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21 ,22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8 ,12, 16, 20]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a]===squares[d] && squares[a]===squares[e]) {
        return squares[a];
      }
      else if(!squares.includes(null)) return "TIE"
    }
    return null;
  }
 function miniMax1(board,memo={},depth,Max){
    if(board in memo) return memo[board];
    let res=calculateWinner(board);
    if (res!==null){
       let score=res==human?100:res==ai?-100:0;
       return score
    }
  
  if(Max){
    let best=-Infinity
    for (let i=0;i<25;i++){
      if (board[i]==null){
        board[i]=human;
        var score=miniMax1(board,memo,depth+1,false);
        board[i]=null
        best=Math.max(best,score);
        memo[depth]=best
      }
    }
    return memo[depth]
  }
  else{
    let best=Infinity
    for (let i=0;i<25;i++){
      if(board[i]==null){
        board[i]=ai;
        var score=miniMax1(board,memo,depth-1,true);
        board[i]=null
        best=Math.min(best,score);
        memo[depth]=best
        
      }
    }
    return memo[depth]
    
  }
}

function heuristic(board){
    let score=0;
    for (let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            board[i][j]==human?score+=20:board[i][j]==ai?score-=20:score+0;

        }
        

    }
    return score
}

function depth(board){
  for (let j=0;j<board.length;j++){
    for(let i=0;i<board[j].length;i++){
      console.log(board[i][j])

    }
  }
}

squares3[0][0]=human;
squares3[0][1]=human;
squares3[0][2]=human;
console.log(squares3)
console.log(heuristic(squares3))
console.log(depth(squares3))

