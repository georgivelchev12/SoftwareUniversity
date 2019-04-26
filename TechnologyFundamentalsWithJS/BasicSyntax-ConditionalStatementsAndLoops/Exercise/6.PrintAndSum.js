function solve(one,two){
    var sum = 0;
    var outputOneLine = "";
    for(let i = one;i<=two;i++){
        sum+=i;
        outputOneLine += i + " ";
       
    }
    console.log(outputOneLine);
    console.log(`Sum: ${sum}`);
}	