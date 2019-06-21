function solve(arr) {
    let obj = {};
    for (const line of arr) {
        obj[line] = line.length;


    }
    Object.entries(obj).map(x => console.log(`Name: ${x[0]} -- Personal Number: ${x[1]}`))
    
}
solve([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
    ])