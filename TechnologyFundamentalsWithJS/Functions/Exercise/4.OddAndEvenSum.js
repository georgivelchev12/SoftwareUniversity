function solve(number) {
    let oddSum = 0;
    let evenSum = 0;

    let myArray = number.toString().split('').map(Number);
  
    
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i]%2===0) {
            evenSum+=myArray[i];
        }
        else{
            oddSum +=myArray[i];
        }
    }
    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
    
    
}