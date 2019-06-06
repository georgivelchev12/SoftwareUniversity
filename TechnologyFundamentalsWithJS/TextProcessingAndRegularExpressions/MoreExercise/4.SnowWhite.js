function solve(textInput, wordsToAdd) {
    let pattern = new RegExp(/dwarf\b/,'g');
    let textToArr = textInput.split(' ');
    while ((word = pattern.exec(textInput)) !== null) {
            word[0]+= ' '+ wordsToAdd[0];
            
        if (word[0] != 'dwarf' && !word[0].includes('undefined')) {
            let indexOfWord = textToArr.indexOf('dwarf');
            textToArr.splice(indexOfWord,1,word[0])
        }
        else {
            let indexOfdwarf = textToArr.indexOf('dwarf');
            textToArr.splice(indexOfdwarf,1);
        }
        wordsToAdd.splice(0,1);
    }
    console.log(textToArr.join(' '));
}
solve("Yet another dwarf fairytale tragedy! There are dwarf so many dwarfs, is it dwarf possible to help dwarf Show white?",
    ["Doc", "Dopey", "Sleepy"])