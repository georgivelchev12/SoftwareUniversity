solve = (arr) => {
    let pattern = /(?<= {1}):[a-z]{4,}:[ ,.!?]{1}/g;
    let matchedEmojies = arr[0].match(pattern);
    let sum = 0;
    if (arr[0].match(pattern)) {
        console.log('Emojis found: ' + matchedEmojies.map(x => x.slice(0, x.length - 1)).join(', '));

        matchedEmojies.map(x => x.slice(1, x.length - 2)).forEach(elem => {
            for (let symbol of elem) {
                sum += symbol.charCodeAt(0);
            }
        });
        matchedEmojies = matchedEmojies.map(x => x.slice(1, x.length - 2));

        let decoded = arr[1].split(':').map(Number).map(x => String.fromCharCode(x)).join('');
        if (matchedEmojies.find(x => x === decoded)) {
            sum *= 2;
        }
        console.log(`Total Emoji Power: ${sum}`)
    }
    else {
        console.log(`Total Emoji Power: 0`);
    }
}
solve(['Hello I am Mark from :England: and I am :one: :seven: years old, I have a :hamster: as pet.',
    '115:101:118:101:110'])