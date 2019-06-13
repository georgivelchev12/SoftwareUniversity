function BombNumbers(arrOne, arrTwo) {
    let bomb = arrTwo[0];
    let power = arrTwo[1];
    let sum = 0;
    for (let i = 0; i < arrOne.length; i++) {
        if (arrOne[i] == bomb) {
            for (let j = 1; j <= power; j++) {
                if (i < arrOne.length) {
                    arrOne.splice(i + 1, 1);
                }
                if (i > 0) {
                    arrOne.splice(i - 1, 1);
                    i--;
                }
            }
        }
        if (arrOne[i] == bomb) {
            arrOne.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < arrOne.length; i++) {
        sum += arrOne[i]
    }
    console.log(sum);
}
BombNumbers([1, 1, 2, 1, 1, 1, 2, 1, 1, 1],
    [2, 1]
)
BombNumbers([1, 4, 4, 2, 8, 9, 1],
    [9, 3]
)

BombNumbers([1, 2, 2, 4, 2, 2, 2, 9],
    [4, 2]
)
BombNumbers([1, 7, 7, 1, 2, 3],
    [7, 1]
)