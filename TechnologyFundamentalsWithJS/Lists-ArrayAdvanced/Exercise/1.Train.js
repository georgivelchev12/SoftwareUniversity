function Train(arr) {
    let wagonsList = arr
    .shift()
    .split(' ')
    .map(Number);
    let maxCapacity = arr.shift();
    
    for (let i = 0; i < arr.length; i++) {
        let currentCommand = arr[i].split(' ');

        if (currentCommand[0] == 'Add') {
            wagonsList.push(Number(currentCommand[1]));
        }
        else {
            for (let j = 0; j < wagonsList.length; j++) {
                if (wagonsList[j]+Number(currentCommand[0]) <= maxCapacity) {
                    wagonsList[j] += Number(currentCommand[0]);
                    break;
                }
            }
        }
    }
    console.log(wagonsList.join(' '));
}