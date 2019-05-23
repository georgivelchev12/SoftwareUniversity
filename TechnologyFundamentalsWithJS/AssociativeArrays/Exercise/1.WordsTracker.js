// function solve(input) {
//     let givenWords = input.shift().split(' ');
//     let obj = {};
//     let counter= 0;
//     for (let i = 0; i < givenWords.length; i++) {
//         let currentWord = givenWords[i];

//         for (let j = 0; j < input.length; j++) {
//             if (input[j] == currentWord) {
//                  counter++;
//                  obj[currentWord] = counter;
//             }
//         }
//         counter = 0;
//     }

//     for (const line in obj) {
//         console.log(`${line} - ${obj[line]}`);

//     }

// }


function solve(input) {
    let wordsToSearch = input.shift().split(' ');
    let map = new Map();

    for (const word of wordsToSearch) {
        map.set(word, 0)
    }
    for (const item of input) {
        if (map.has(item)) {
            let value = map.get(item) + 1;
            map.set(item, value);
        }
    }
    let mapEntries = [...map.entries()];

    mapEntries.sort((a, b) => b[1] - a[1]);
    for (const key of mapEntries) {
        console.log(`${key[0]} - ${key[1]}`);
    }
}


solve(['this sentence', 'In', 'this', 'sentence', 'you', 'have', 'to', 'count', 'the', 'occurances', 'of', 'the'
    , 'words', 'this', 'and', 'sentence', 'because', 'this', 'is', 'your', 'task']
)