solve = (arr) => {
    let numbers = arr.shift().split(' ').map(Number);
    let completed = 0;
    let dropped = 0;
    let incompleted = 0;
    for (let i = 0; i < numbers.length; i++) {
        if(numbers[i] <= -1){
            dropped++;
        }
        else if(numbers[i] == 0){
           completed++;
        }
        else{
            incompleted++;
        }
    }
    for (let arrElement of arr) {
        let [command, index, time] = arrElement.split(' ');
        switch (command) {
            case 'Complete':
                index = +index;
                if (index >= 0 && index <= numbers.length) {
                    numbers[index] = 0;
                    completed++;
                    incompleted--;
                }
                break;
            case 'Change':
                index=+index;
                time =+time;
                if(index >= 0 && index <= numbers.length){
                    numbers[index] = time;
                }
                break;
            case 'Drop':
                index = +index;
                if (index >= 0 && index <= numbers.length) {
                    numbers[index] = -1;
                    dropped++;
                    incompleted--;
                }
                break;
            case 'Count':
                if(index == 'Completed'){
                    console.log(completed);
                }
                else if(index == 'Incomplete'){
                    console.log(incompleted);
                }
                else if(index == 'Dropped'){
                    console.log(dropped);
                }
                break;
            case 'End':
                let output = '';
                for (let i = 0; i < numbers.length; i++) {
                    if(!(numbers[i] <= -1) && numbers[i] !== 0){
                        output+= numbers[i] + ' ';
                    }
                }
                console.log(output);
                break;
        }
    }
};
solve([ '1 2 3 4 5 4 0 3 2 1',
    'Complete 0',
    'Complete 1',
    'Complete 2',
    'Drop 3',
    'Change 4 1',
    'Count Completed',
    'End' ]);