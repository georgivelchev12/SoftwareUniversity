race = (arr) => {
    let namePattern = /[A-Za-z]/g;
    let numbersPattern = /[0-9]/g;
    let result = {};
    let listOfNames = arr.shift().split(', ');
    arr.forEach(elem => {
        if (elem !== 'end of race') {
            let currName = elem.match(namePattern).join('')
            if (listOfNames.includes(currName)) {
                let currNumbers = elem.match(numbersPattern)
                    .map(Number)
                    .reduce((a, b) => a + b);
                if (!(currName in result)) {
                    result[currName] = currNumbers;
                } else {
                    result[currName] += currNumbers;
                }
            }
        }
    });
    let winners = Object.entries(result)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(e => e[0]);

    console.log(`1st place: ${winners[0]}`)
    console.log(`2nd place: ${winners[1]}`)
    console.log(`3rd place: ${winners[2]}`)
}
race(['George, Peter, Bill, Tom',
    'G4e@55or%6g6!68e!!@',
    'R1@!3a$y4456@',
    'B5@i@#123ll',
    'G@e54o$r6ge#',
    '7P%et^#e5346r',
    'T$o553m&6',
    'end of race']);