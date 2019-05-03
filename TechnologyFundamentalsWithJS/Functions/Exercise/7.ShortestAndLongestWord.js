function longestWord(str) {
    let arrFromSplited = str.split(/[ .,?! ]/);
    
    for (let i = 0; i < arrFromSplited.length; i++) {
        if (arrFromSplited[i] == '') {
            arrFromSplited.splice(i,1)
        }
    }

    let longest = arrFromSplited[0];
    let shortest = arrFromSplited[0];

    for (let i = 0; i < arrFromSplited.length; i++) {
        if (longest.length < arrFromSplited[i].length) {
            longest = arrFromSplited[i];
        }
        if (shortest.length > arrFromSplited[i].length) {
            shortest = arrFromSplited[i];
        }
    }

    console.log(`Longest -> ${longest}`);
    console.log(`Shortest -> ${shortest}`);
}