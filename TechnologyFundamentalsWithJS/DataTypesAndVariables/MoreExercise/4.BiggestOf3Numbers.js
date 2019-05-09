function solve(num1,num2,num3) {
    // var max = Math.max(num1, num2, num3);
    // console.log(max);
    if (num1 > num2 && num1 > num3) {
        console.log(num1);
    }
    else if (num2 > num3 && num2>num1) {
        console.log(num2);
        
    }
    else if (num3 > num2 && num3>num1) {
        console.log(num3);
        
    }
}
solve(5,-2,7)