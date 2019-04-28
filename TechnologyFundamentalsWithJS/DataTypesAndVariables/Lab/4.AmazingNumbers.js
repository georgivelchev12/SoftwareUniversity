
function solve(number) {
    let numberToString = number.toString();
    let sum = 0;
    for (let index = 0; index<= numberToString.length-1; index++) {
        sum+=Number(numberToString[index]);
    }
    if (sum.toString().includes("9")) {
        console.log(`${number} Amazing? True`);
    }
    else{
        console.log(`${number} Amazing? False`);
    }
}