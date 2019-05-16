function solve(input) {
    let towns = [];
    let removeZeroElement = input.shift();
    for (const key of input) {
        let tokens = key.split(/\s*\|\s*/);
        let townObj = {
            Town: tokens[1],
            Latitude: JSON.parse(Number(tokens[2]).toFixed(2)),
            Longitude: JSON.parse(Number(tokens[3]).toFixed(2))
        };
        towns.push(townObj);
    }
    console.log(JSON.stringify(towns));
}


solve(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |'])