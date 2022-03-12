let squares= Array(42).fill(null)
let indices=squares.map((d,i)=>i)
console.log(indices)

let slice;

for (let j=0;j<42;j+=7){  
  let res=[]
  for (let i=j;i<=j+6;i++){
    res.push(i)
  }
  console.log(res)
}


