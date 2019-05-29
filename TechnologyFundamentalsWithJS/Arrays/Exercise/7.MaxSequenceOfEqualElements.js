function solve(arr) {
    let count = 1;
    let maxCount = 1;
    let maxNum = 0;
    let splited;
    if (arr.length == 1) {
      splited =  arr[0].split(' ').map(Number);
    }
    else {
        splited = arr;
    }
    for (let i = 0; i < splited.length; i++) {
        
        if (splited[i] == splited[i+1]) {
            count++;
            if (count>maxCount) {
                maxCount = count;
                maxNum = splited[i];
            }
        }
        else{
            count = 1;
        }
        if (maxCount == 1) {
            maxNum = splited[0];
        }
    }
    let output = '';
    for (let i = 0; i < maxCount; i++) {
        output+=maxNum + " ";
        
    }
    console.log(output);
}
solve([])