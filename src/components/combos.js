
//my algorithm for connect4 possible row/col combinations

function slice4(d){
  let arr=[]
  let i=0;
  while(i+4<=d.length){
    arr.push(d.slice(i,i+4))
    i++;
  }
  return arr;
}


const rows =()=>{
  let r=[]
  for (let j=0;j<42;j+=7){  
    let res=[]
    for (let i=j;i<=j+6;i++){
      res.push(i)
    }
    r.push(res)
  }
  return r
}

const cols =()=>{
  let c=[]
  for (let i=0;i<=6;i++){
    let res=[]
    for (let j=i;j<42;j+=7){
      res.push(j)
    }
    c.push(res)
  }
  return c
}

/*console.log(cols());
let combos={row:[... rows()], col:[... cols()]}
console.log(combos)*/

const winningArrays = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
]

let r=rows();
let res=r.map(d=> slice4(d))
let c=cols();
let res2=c.map(d=> slice4(d))
//let combos={row:res, col:res2}
let mycombos= [...res, ...res2]


//This implementation of minimax is a response from chatGPT
/*function minimax(board, depth, isMaximizing) {
  let result = checkWin(board);
  if (result !== null) {
    return result;
  }
  if (depth === 0) {
    return 0;
  }
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < 7; i++) {
      if (!board[i][5]) {
        board[i][5] = 1;
        let eval = minimax(board, depth - 1, false);
        board[i][5] = 0;
        maxEval = Math.max(maxEval, eval);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 7; i++) {
      if (!board[i][5]) {
        board[i][5] = 2;
        let eval = minimax(board, depth - 1, true);
        board[i][5] = 0;
        minEval = Math.min(minEval, eval);
      }
    }
    return minEval;
  }
}

function checkWin(board) {
  // Check rows
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      let player = board[j][i];
      if (player &&
          player === board[j + 1][i] &&
          player === board[j + 2][i] &&
          player === board[j + 3][i]) {
        return player;
      }
    }
  }
  // Check columns
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 3; j++) {
      let player = board[i][j];
      if (player &&
          player === board[i][j + 1] &&
          player === board[i][j + 2] &&
          player === board[i][j + 3]) {
        return player;
      }
    }
  }
  // Check diagonals
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      let player = board[i][j];
      if (player &&
          player === board[i + 1][j + 1] &&
          player === board[i + 2][j + 2] &&
          player === board[i + 3][j + 3]) {
        return player;
      }
      player = board[6 - i][j];
      if (player &&
          player === board[5 - i][j + 1] &&
          player === board[4 - i][j + 2] &&
          player === board[3 - i][j + 3]) {
        return player;
      }
    }
  }
  return null;
}*/





module.exports= {mycombos, winningArrays};





