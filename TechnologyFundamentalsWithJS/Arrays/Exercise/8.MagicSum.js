function solve(fixedArr,num) {

    let magicSum = 0;
    for (let i = 0; i < fixedArr.length; i++) {
        for (let j = i+1; j < fixedArr.length; j++) {
            if ((Number(fixedArr[i])+Number(fixedArr[j])) == num) {
                console.log(`${fixedArr[i]} ${fixedArr[j]}`);
            }
        }
    }
}
solve([1,7,6,2,19,23],8)