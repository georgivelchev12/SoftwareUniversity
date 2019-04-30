function solve(arr) {
    let count = 1;
    let maxCount = 1;
    let maxNum = 0;
    arr = arr[0].split(' ');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == arr[i+1]) {
            count++;
            if (count>maxCount) {
                maxCount = count;
                maxNum = arr[i];
            }
        }
        else{
            count = 1;
        }
        if (maxCount == 1) {
            maxNum = arr[0];
        }
    }
    let output = '';
    for (let i = 0; i < maxCount; i++) {
        output+=maxNum + " ";
        
    }
    console.log(output);
}
