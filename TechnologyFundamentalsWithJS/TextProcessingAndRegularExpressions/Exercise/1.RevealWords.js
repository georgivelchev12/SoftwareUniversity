function solve(words, inputSentence) {
    let pattern = /\*+/g;
    words = words.split(', ');
    let finalSentence = inputSentence.split(' ')
    while ((foundWord = pattern.exec(inputSentence)) !== null) {
        for (let i = 0; i < words.length; i++) {
            if (foundWord[0].length == words[i].length) {
                let indexOfWord = finalSentence.indexOf(foundWord[0])
                finalSentence.splice(indexOfWord, 1, words[i])
            }
        }
    }
    console.log(finalSentence.join(' '));
}
solve('great, learning',
    'softuni is ***** place for ******** new programming languages'
)