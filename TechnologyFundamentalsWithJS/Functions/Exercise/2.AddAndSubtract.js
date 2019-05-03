function solve(num1,num2,num3) {
    let sumOfFirstTwoNums = (num1,num2) => num1+num2;
    
    function subtractFirstTwoNumsWithThrid(sumOfFirstTwoNums,num3) {
        return sumOfFirstTwoNums-num3;
    }

    let sum = sumOfFirstTwoNums(num1,num2);
    let subtract = subtractFirstTwoNumsWithThrid(sum,num3);

    console.log(subtract);
    
}