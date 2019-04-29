function solve(arr) {
    let evenSum = 0;
    let oddSum = 0;
    let result = 0;
    for (let i = 0; i < arr.length; i++) {

        if (arr[i] % 2 == 0) {
            evenSum += Number(arr[i]);
        }
        if (arr[i] % 2 != 0) {
            oddSum += Number(arr[i]);
        }
    }
    result = evenSum-oddSum;
    console.log(result);

}