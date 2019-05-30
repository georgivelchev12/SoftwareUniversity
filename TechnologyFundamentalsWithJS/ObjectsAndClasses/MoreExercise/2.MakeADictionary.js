function solve(arr) {
    let obj = {};

    for (const line of arr) {
        let currObj = JSON.parse(line)
        let currObjEntries = Object.entries(currObj)
        obj[currObjEntries[0][0]] = currObjEntries[0][1]
    }

    let objEntries = Object.entries(obj)
    .sort((a,b) => a[0].localeCompare(b[0]))

    for (const key of objEntries) {
        console.log(`Term: ${key[0]} => Definition: ${key[1]}`);
    }
}
solve([`{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}`,
`{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}`,
`{"Boiler":"A fuel-burning apparatus or container for heating water."}`,
`{"Tape":"A narrow strip of material, typically used to hold or fasten something."}`,
`{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}`])