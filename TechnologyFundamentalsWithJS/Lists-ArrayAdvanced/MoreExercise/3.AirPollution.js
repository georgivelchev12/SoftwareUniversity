function solve(arrOne, arrTwo) {
    let changedArr = [];
    for (let i = 0; i < arrOne.length; i++) {
        changedArr.push(arrOne[i].split(' ').map(Number))
    }
    
    let pollutedArea;
    for (let i = 0; i < arrTwo.length; i++) {
        let arrTwoSplited = arrTwo[i].split(' ');
        let command = arrTwoSplited[0];
        
        switch (command) {
            case 'breeze':
                let indexBreeze = Number(arrTwoSplited[1]);
                for (let j = 0; j < changedArr[indexBreeze].length; j++) {
                    changedArr[indexBreeze][j] -= 15;
                    if (changedArr[indexBreeze][j] < 0) {
                        changedArr[indexBreeze][j] = 0;
                    }
                }
                break;
            case 'gale':
                let indexGale = Number(arrTwoSplited[1]);
                for (let j = 0; j < changedArr[indexGale].length; j++) {
                    changedArr[j][indexGale] -= 20;
                    if (changedArr[j][indexGale] < 0) {
                        changedArr[j][indexGale] = 0;
                    }
                }
                break;
            case 'smog':
                for (let j = 0; j < changedArr.length; j++) {
                    for (let k = 0; k < changedArr[j].length; k++) {
                        let smogNumber = arrTwoSplited[1];
                        changedArr[j][k] += Number(smogNumber);
                    }
                }
                break;
        }
    }
    let block = [];
    let output = ''
    for (let j = 0; j < changedArr.length; j++) {
        for (let k = 0; k < changedArr.length; k++) {
            pollutedArea = changedArr[j][k]
            if (pollutedArea >= 50) {
                let colIndex = changedArr[j].indexOf(changedArr[j][k]);
                output = `[${j}-${colIndex}]`;
                block.push(output);
            }
        }
    }

    if (block.length > 0) {

        console.log(`Polluted areas: ${block.join(', ')}`);


    }
    else {
        console.log(`No polluted areas`);

    }
}
solve(["5 7 2 14 4",
    "21 14 2 5 3",
    "3 16 7 42 12",
    "2 20 8 39 14",
    "7 34 1 10 24"],
    ["breeze 1", "gale 2", "smog 35"]
);




// function printAirPollutedZones(stringMatrixValues, commands) {
//     let matrix = [];
//     for (let i = 0; i < stringMatrixValues.length; i++) {
//         matrix[i] = stringMatrixValues[i].split(' ').map(Number);
//     }

//     for (const line of commands) {
//         let lineTokens = line.split(' ');
//         let cmd = lineTokens[0];
//         let value = Number(lineTokens[1]);

//         if (cmd.toLowerCase() === 'breeze' && value >= 0 && value < matrix.length) {
//             for (let j = 0; j < matrix[value].length; j++) {
//                 matrix[value][j] -= 15;
//                 if (matrix[value][j] < 0) {
//                     matrix[value][j] = 0;
//                 }
//             }
//         } else if (cmd.toLowerCase() === 'gale') {
//             for (let i = 0; i < matrix.length; i++) {
//                 if (value >= 0 && value < matrix[i].length) {
//                     matrix[i][value] -= 20;
//                     if (matrix[i][value] < 0) {
//                         matrix[i][value] = 0;
//                     }
//                 }
//             }
//         } else if (cmd.toLowerCase() === 'smog') {
//             for (let i = 0; i < matrix.length; i++) {
//                 for (let j = 0; j < matrix[i].length; j++) {
//                     matrix[i][j] += value;
//                 }
//             }
//         }
//     }

//     let polutedAreas = [];
//     for (let i = 0; i < matrix.length; i++) {
//         for (let j = 0; j < matrix[i].length; j++) {
//             if (matrix[i][j] >= 50) {
//                 polutedAreas.push(`[${i}-${j}]`);
//             }
//         }
//     }

//     if (polutedAreas.length > 0) {
//         console.log('Polluted areas: ' + polutedAreas.join(', '));
//     } else {
//         console.log('No polluted areas');        
//     }
// }
