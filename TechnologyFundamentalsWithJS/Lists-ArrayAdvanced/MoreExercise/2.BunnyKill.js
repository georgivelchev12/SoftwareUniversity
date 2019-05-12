function solve(arr) {
    let matrix = [];
    let matrixRow = arr.length - 1;
    let matrixCol = arr[0].split(/\s+/).length;
    let coor = arr[arr.length - 1]
        .split(' ');

    let killedBunnies = 0;
    let snowBallDemage = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        matrix.push(arr[i].split(' ').map(Number))
    }

    for (let i = 0; i < coor.length; i++) {
        let coorArr = coor[i].split(/[,]/).map(Number);
        let bombRow = +coorArr[0];
        let bombCol = +coorArr[1];
        let bombValue = matrix[bombRow][bombCol];
        if (bombValue > 0) {
            for (let row = bombRow - 1; row <= bombRow + 1; row++) {
                for (let col = bombCol - 1; col <= bombCol + 1; col++) {
                    if ((row >= 0) && (col >= 0)
                        && (row < matrixRow) && (col < matrixCol)) {
                        matrix[row][col] -= bombValue;
                    }
                }
            }
            killedBunnies++;
            snowBallDemage += bombValue;
        }
    }
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] > 0) {
                snowBallDemage+=matrix[row][col];
                killedBunnies++;
            }
        }
    }
    console.log(snowBallDemage);
    console.log(killedBunnies);
    
}

solve(['5 10 15 20',
    '10 10 10 10',
    '10 15 10 10',
    '10 10 10 10',
    '2,2 0,1'])