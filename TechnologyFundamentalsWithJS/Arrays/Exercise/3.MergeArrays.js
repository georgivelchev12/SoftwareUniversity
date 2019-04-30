function solve(arr1,arr2) {
    let resultArr = [];
    let output = '';

    for (let i = 0; i < arr1.length; i++) {
        if (i%2==0) {
            resultArr[i] = Number(arr1[i]) + Number(arr2[i]);
        }
        else{
            resultArr[i] = arr1[i] + arr2[i] + "";
        }
        
        output = resultArr.join(' - ');
    }
    console.log(output);
}