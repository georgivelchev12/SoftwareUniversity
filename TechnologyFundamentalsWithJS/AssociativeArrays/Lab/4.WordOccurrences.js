function solve(input) {
    let map = new Map();

    for (const word of input) {
        if (map.has(word)) {
            map.set(word,map.get(word) + 1)
        }
        else{
        map.set(word,1);
        }
    }

    let mapEntries = [...map.entries()];
    mapEntries.sort((a,b) => b[1] - a[1])
    
    for (const line of mapEntries) {
        console.log(`${line[0]} -> ${line[1]} times`); 
    }
}
solve(["Here", "is", "the", "first", "sentence", "Here", "is", "another", "sentence", "And", "finally", "the", "third", "sentence"])