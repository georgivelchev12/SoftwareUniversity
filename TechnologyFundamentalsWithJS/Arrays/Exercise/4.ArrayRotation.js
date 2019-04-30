function solve(arr,number) {
    let takenNumOutput = [];
    let resultArr = [];
    let takenNum;
    let output = '';
    for (let i = 1; i <= number; i++) {
        takenNum = arr.shift();
        arr.push(takenNum);
    }
    console.log(`${arr.join(' ')}`);
    
}