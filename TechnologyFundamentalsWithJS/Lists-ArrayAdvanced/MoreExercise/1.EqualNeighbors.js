function solve(arr) {
    let counter = 0;
    for (let i = 0; i < arr.length -1; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] == arr[i + 1][j]) {
                counter++;
            }
            if (arr[i][j] == arr[i][j + 1]) {
                counter++;
            }
            if (i == arr.length -2 && arr[i+1][j] == arr[i+1][j+1]) {
                counter++
            }
        }
    }
    console.log(counter);
    
}
solve([['test', 'yes', 'yo', 'ho'],
['well', 'done', 'yo', '6'],
['not', 'done', 'yet', '5']]);
