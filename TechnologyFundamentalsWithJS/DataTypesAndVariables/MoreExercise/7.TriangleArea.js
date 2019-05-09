function solve(a,b,c) {
  //  let area = 1/4*(Math.sqrt((a+b+c)*(b+c-a)*(a-b+c)*(a+b-c)));
    
    let s = (a+b+c) / 2;
    let area = Math.sqrt(s*(s-a)*(s-b)*(s-c))
    console.log(area);
    
}
solve(2,
    3.5,
    4)