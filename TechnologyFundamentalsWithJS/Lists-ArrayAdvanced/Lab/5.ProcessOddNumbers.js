function processOddNumbers(arr) {
    let doubledArr = [];
    let result = [];
    doubledArr = arr.map(e => e * 2);
    for (const element in doubledArr) {
        if (element % 2 != 0) {
            result.push(doubledArr[element]);
        }
    }
    console.log(result.reverse().join(' '));
}