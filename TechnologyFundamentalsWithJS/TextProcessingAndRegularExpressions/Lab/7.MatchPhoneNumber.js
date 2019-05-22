function solve(str) {
    let foundNumbers = [];
    let pattern = /(?<=\s|)\+359([ -])2\1\d{3}\1\d{4}\b/g;
    let foundNum;
    while (((foundNum = pattern.exec(str))) !== null) {
        foundNumbers.push(foundNum[0]);
    }
    console.log(foundNumbers.join(', '));
    
}



solve("+359 2 222 2222,359-2-222-2222, +359/2/222/2222, +359-2 222 2222 +359 2-222-2222, +359-2-222-222, +359-2-222-22222 +359-2-222-2222")