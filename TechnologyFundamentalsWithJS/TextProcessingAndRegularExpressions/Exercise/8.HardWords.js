function solve(arr) {
    let words = arr.pop();
    let text = arr[0].split(' ');
    let pattern = /\_+./g;

    while ((unknownWords = pattern.exec(text))!== null) {
        for (let i = 0; i < words.length; i++) {
            if (unknownWords[0].length == words[i].length+1) {
                let indexOfWord = text.indexOf(unknownWords[0].substring(0, unknownWords[0].length - 1))
                if (indexOfWord == -1) {
                    let lastSymbol = unknownWords[0].substring(unknownWords[0].length-1)
                    indexOfWord = text.indexOf(unknownWords[0])
                    words[i]+=lastSymbol;
                    text.splice(indexOfWord,1,words[i])
                }
                else{
                    text.splice(indexOfWord, 1, words[i])
                }
                
            }
        }
    }
    console.log(text.join(' '));
}
solve(['Hi, grandma! I\'m so ____ to write to you. ______ the winter vacation, so _______ things happened. My dad bought me a sled. Mom started a new job as a __________. My brother\'s ankle is ________, and now it bothers me even more. Every night Mom cooks ___ on your recipe because it is the most delicious. I hope this year Santa will _____ me a robot.',
['pie', 'bring', 'glad', 'During', 'amazing', 'pharmacist', 'sprained']]
)