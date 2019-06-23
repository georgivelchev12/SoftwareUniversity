solve = (arr) => {
    let obj = {};
    let parsedArr = arr.map(e => JSON.parse(e));
    parsedArr.forEach(elem => {
        let keys = Object.keys(elem)
        let values = Object.values(elem).toString()
        obj[keys] = values
    });
    Object.entries(obj)
    .sort((a,b) => a[0].localeCompare(b[0]))
    .map(e => {
        console.log(`Term: ${e[0]} => Definition: ${e[1]}`);
    });
}
solve([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}'
])