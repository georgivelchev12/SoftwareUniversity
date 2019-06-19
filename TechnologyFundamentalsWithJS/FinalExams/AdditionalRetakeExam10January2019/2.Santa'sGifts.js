santasGifts = (arr) => {
    let numOfCommands = Number(arr.shift());
    let houses = arr.shift().split(' ').map(Number);
    let santasPosition = 0;
    for (let i = 0; i < numOfCommands; i++) {
        let [command,valueOne,valueTwo] = arr[i].split(' ');
        valueOne = Number(valueOne);
        valueTwo = Number(valueTwo);
        if (command === 'Forward') {

            if (santasPosition + valueOne <= houses.length-1) {
                santasPosition += valueOne;
                houses.splice(santasPosition, 1);
            }
        } else if (command === 'Back') {
            if (santasPosition - valueOne >= 0){
                santasPosition -= valueOne;
                houses.splice(santasPosition, 1);
            }
        } else if (command === 'Gift') {
            if (valueOne >= 0 && valueOne <= houses.length-1) {
                houses.splice(valueOne, 0, valueTwo);
                santasPosition = valueOne;
            }
        } else if (command === 'Swap') {
            let indexOfValueOne = houses.indexOf(valueOne);
            let indexOfValueTwo = houses.indexOf(valueTwo);
            if (houses.includes(valueOne) && houses.includes(valueTwo)) {
                houses.splice(indexOfValueOne, 1, valueTwo);
                houses.splice(indexOfValueTwo, 1, valueOne);
            }
        }
    }
    console.log(`Position: ${santasPosition}`);
    console.log(houses.join(', '));
};
santasGifts([ '5',
    '255 500 54 78 98 24 30 47 69 58',
    'Forward 1',
    'Swap 54 47',
    'Gift 1 20',
    'Back 1',
    'Forward 3' ]);
santasGifts([ '6',
    '50 40 25 63 78 54 66 77 24 87',
    'Forward 4',
    'Back 3',
    'Forward 3',
    'Gift 2 88',
    'Swap 50 87',
    'Forward 1' ])