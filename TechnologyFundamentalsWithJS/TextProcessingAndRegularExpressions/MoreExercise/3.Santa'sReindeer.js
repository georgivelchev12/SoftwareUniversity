function solve(input) {
    // let pattern = /\*[A-Za-z]+\*/g
    // let words = input.match(pattern);
    let text = input.split(' ');
    let words = [];
    for (let i = 0; i < text.length; i++) {
        if (text[i].startsWith('*') && text[i].endsWith('*')) {
            words.push(text[i]);
            text.splice(i,1);
            i--;
        }
    }
    console.log(words.join(', '));
    console.log('********************');
    console.log(text.join(' '));
}


// function solve(text) {
//     let reindeerRegEx = /\*[A-Za-z]+\*/g
//     let reindeers = text.match(reindeerRegEx)
//     text = text.split(' ').filter(x => x !== '')

//     text.map(x => {
//         reindeers.map(y => {
//             if (x === y) {  
//                 text = text.filter(z => z !== x)
//             }
//         })
//     })

//     console.log(reindeers.join(', '))
//     console.log('********************')
//     console.log(text.join(' '))
// }
solve("Oh my *Rudolf* dwarfs! This *Dasher* year's christmas *Prancer is about to be Comet* ruined because Santa has lost his deer and.")