let squares= Array(42).fill(null)
let indices=squares.map((d,i)=>i)

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

let r=rows();
let res=r.map(d=> slice4(d))
let c=cols();
let res2=c.map(d=> slice4(d))
let combos={row:res, col:res2}
let combos2= [... res, ... res2]

console.log(res,res2)

module.exports= combos2;





