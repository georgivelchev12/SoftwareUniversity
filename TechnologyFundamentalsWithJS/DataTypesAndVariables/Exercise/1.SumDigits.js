function solve(number) {
    let digit = 0;
    let sum = 0;
    while (number!=0) {
        digit = number % 10;
        number=parseInt(number/10);
        sum+=digit;
    }
    console.log(sum);
    
}