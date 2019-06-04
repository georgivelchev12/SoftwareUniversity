function solve(substrToDelete,text) {
    substrToDelete = substrToDelete.toLowerCase();
    let textToArr = text.split(' ');
    let clonedArr = textToArr.slice()
    for (const word of clonedArr) {
        if (word.toLowerCase().includes(substrToDelete.toLowerCase())) {
            let indexOfWord = textToArr.indexOf(word);
            textToArr.splice(indexOfWord,1);
        }
    }
    textToArr.forEach((e,i) => console.log(`idx[${i}] -> ${e}`));
}
solve('wel','Welcome to the Software University!')