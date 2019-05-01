function solve(numOne,numTwo,numThree) {
    let isPositive = n => n >= 0;
    let isProductPositive = (a,b) => {
        let pos = isPositive(a) && isPositive(b);
        let neg = !isPositive(a) && !isPositive(b);

        return (pos || neg);
    };
    let firstResult = isProductPositive(numOne,numTwo);
    let finalResult = isProductPositive(firstResult,numThree);
    if (finalResult) {
        console.log('Positive');
    }
    else{
        console.log('Negative');
        
    }
}