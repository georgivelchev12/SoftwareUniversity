function solve(arr) {
    let sumOfOriginalArr = 0;
    let sumOfModifiedArr = 0;
    let output = '';
    for (let i = 0; i < arr.length; i++) {
        sumOfOriginalArr+=arr[i];

        if (arr[i]%2==0) {
            arr[i] = arr[i] + i;
        }
        else{
            arr[i] = arr[i] - i;
        }
        output = arr.join(', ')
        sumOfModifiedArr+=arr[i];
    }
    console.log(`[ ${output} ]`);
    console.log(sumOfOriginalArr);
    console.log(sumOfModifiedArr);
    
}