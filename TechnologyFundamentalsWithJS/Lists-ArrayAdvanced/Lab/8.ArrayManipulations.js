function solve(input) {
    let numbers = input.shift().split(' ').map(e => Number(e));

    for (let operation of input) {
        let [command,firstOperand,secondOperand] = operation.split(' ');
        let firstNumber = Number(firstOperand);
        let secondNumber = Number(secondOperand);

        switch (command) {
            case 'Add':
            numbers.push(firstNumber);
                break;
            case 'Remove':
            numbers = numbers.filter(n=> n !== firstNumber);
                break;
            case 'RemoveAt':
            numbers.splice(firstNumber,1);
                break;
            case 'Insert':
            numbers.splice(secondNumber,0,firstNumber);
                break;
        }
    }
    console.log(numbers.join(' '));
}