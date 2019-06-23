solve = (arr) => {
    let result = new Map();
    arr.forEach(elem => {
        if(!result.has(elem[0])){
            result.set(elem[0],[]);
        }
        result.get(elem[0]).push(elem);
    });
    let sortedResult = [...result.keys()]
    .sort((a,b) => a.localeCompare(b))

    for (let key of sortedResult) {
        console.log(key);

        Array.from(result.get(key))
        .sort((a,b) => a.localeCompare(b))
        .forEach(elem => {
            elem = elem.split(' : ').join(': ');
            console.log(`  ${elem}`);
        });
    }
}
solve([ 'Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10' ]);