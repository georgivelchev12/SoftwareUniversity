function solve(reverseString= "") {
    let oneLineOutput = "";

    for(let i = reverseString.length-1;i>=0;i--){
        oneLineOutput+=reverseString[i];
    }
    console.log(oneLineOutput);
}