function solve(arr) {
    let fixedArr = arr[0].split(' ');
    let num = arr[1].split(' ');
    let magicSum = 0;
    for (let i = 0; i < fixedArr.length; i++) {
        for (let j = i+1; j < fixedArr.length; j++) {
            if ((Number(fixedArr[i])+Number(fixedArr[j])) == num) {
                console.log(`${fixedArr[i]} ${fixedArr[j]}`);
            }
        }
    }
}