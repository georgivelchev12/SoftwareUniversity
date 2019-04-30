function solve(arr) {
    let IsIndexExists = false;
    let leftSum = 0;
    let rightSum = 0;
    if (arr.length == 1) {
        console.log("0");
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        for (let L = 0; L < i; L++) {
            leftSum += arr[L];
        }
        for (let R = i+1; R < arr.length; R++) {
            rightSum+=arr[R];
        }
        if (leftSum==rightSum) {
            console.log(i);
            IsIndexExists = true;   
        }
        else{
            leftSum = 0;
            rightSum = 0;
        }
    }
    if (IsIndexExists == false) {
        console.log("no");
        
    }
}