function FactorialDivision(numOne,numTwo) {
    let factorialOne =1;
    let factorialTwo=1;
    for(let i = numOne; i > 0; i--) {
        factorialOne*=i;
    }
    for(let i = numTwo; i > 0; i--) {
        factorialTwo*=i;
    }
    let division = factorialOne / factorialTwo;

    console.log(division.toFixed(2));
}
