function solve(input) {
    let wordsWithDescriptions = input[0].split(' | ');
    let wordsFound = input[1].split(' | ');
    let command = input[2];
 
    let dictionary = {};
 
    for (let value of wordsWithDescriptions) {
        let arguments = value.split(': ');
        let word = arguments[0];
        let discription = arguments[1];
 
        if (!dictionary.hasOwnProperty(word)) {
            dictionary[word] = discription;
        } else {
            let oldValue = dictionary[word];
            let newValue = oldValue.concat(`- ${discription}`);
            dictionary[word] = newValue;
        }
    }
 
    for (let value of wordsFound) {
        if (dictionary.hasOwnProperty(value)) {
            let discriptions = dictionary[value].split('- ');
 
            console.log(value);
 
            for (let discription of discriptions.sort(function ( a, b ) { return b.length - a.length; })) {
                console.log(` -${discription}`);
            }
        }
    }
 
    if (command === 'List') {
        let keys = Object.keys(dictionary);
 
        keys.sort((a,b) => a.localeCompare(b))
 
        console.log(keys.join(' '));
    }
}

// solve(['programmer: an animal, which turns coffee into code | developer: a magician',
//     'Pesho | Gosho',
//     'List']
// )


solve(['tackle: the equipment required for a task or sport | code: write code for a computer program | bit: a small piece, part, or quantity of something | tackle: make determined efforts to deal with a problem | bit: a short time or distance',
'bit | code | tackle',
'End'])