function solve(arr) {
    let numbersArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i])) {
            numbersArray.push(arr[i]);
        }
        else {
            DoMath(numbersArray, arr[i]);
        }
    }
    if (numbersArray.length >= 2){
        console.log('Error: too many operands!')
    }
    else if (numbersArray.length === 1) {
        console.log(numbersArray.toString());
    }
    function DoMath(numbers, operator) {
        if (numbers.length <=1) {
            console.log('Error: not enough operands!');
        }
        if (operator == '+') {
            numbers[numbers.length - 2] += numbers[numbers.length - 1];
            numbers.splice(numbers.length - 1, 1);
        }
        else if (operator == '-') {
            numbers[numbers.length - 2] -= numbers[numbers.length - 1];
            numbers.splice(numbers.length - 1, 1);
        }
        else if (operator == '*') {
            numbers[numbers.length - 2] *= numbers[numbers.length - 1];
            numbers.splice(numbers.length - 1, 1);
        }
        else if (operator == '/') {
            numbers[numbers.length - 2] /= numbers[numbers.length - 1];
            numbers.splice(numbers.length - 1, 1);

        }
    }
}
solve([5,
    3,
    4,
    '*',
    '-']
   );