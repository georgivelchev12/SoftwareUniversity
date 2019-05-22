function solve(str,searchedWord) {
    let words = str.split(' ');
    let counterWord = 0;

    for (const word of words) {
        if (word == searchedWord) {
            counterWord++;
        }
    }
    console.log(counterWord);
    
}
solve("This is a word and it also is a sentence",
"is");