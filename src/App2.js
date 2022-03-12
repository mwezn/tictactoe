let squares= Array(42).fill(null)
let indices=squares.map((d,i)=>i)

//my algorithm for connect4 possible row/col combinations

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
let row=[]
let r=rows();
r.map(d=>{
  let i=0;
  while(i+4<=d.length){
    row.push(d.slice(i,i+4))
    i++;
  }
})
let column=[]
let c=cols();
c.map(d=>{
  let i=0;
  while(i+4<=d.length){
    column.push(d.slice(i,i+4))
    i++;
  }
})


console.log(row,column)





