function solve(input) {
    let firstStr = input[0];
    let secondStr = input[1];
    let keyWord = input[2].toUpperCase();

    let totalPass = firstStr+secondStr;
    
    let keyLetterIndex = 0;
    for (let i = 0; i < totalPass.length; i++) {
        let letter = totalPass[i];

        if (letter === 'a' || letter === 'e' ||
        letter === 'i' ||letter === 'o' ||letter === 'u') {
            if (keyLetterIndex > keyWord.length-1) {
                keyLetterIndex = 0;
            }
            let keyLetter = keyWord[keyLetterIndex++];
            totalPass=totalPass.replace(letter,keyLetter);
        }
    }
    let reversedPass = totalPass.split('').reverse().join('');
    console.log(`Your generated password is ${reversedPass}`);
}
solve(['ilovepizza', 'ihatevegetables', 'orange'])