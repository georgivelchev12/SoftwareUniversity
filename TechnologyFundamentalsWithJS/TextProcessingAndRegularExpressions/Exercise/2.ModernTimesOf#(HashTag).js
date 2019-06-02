function solve(input) {
    let pattern = /\#[A-Za-z]+/g;
    let wordsMatching = input.match(pattern);
    for (let i = 0; i < wordsMatching.length; i++) {
        console.log(wordsMatching[i].substr(1,wordsMatching[i].length));
    }
}
solve('Nowadays everyone uses # to tag a #special word in #socialMedia')