function solve(input) {
    let map = new Map();
    for (let i = 0; i < input.length; i++) {
        if (i%2==0) {
            if (!map.has(input[i])) {
                map.set(input[i], +input[i+1])
            }
            else{
                map.set(input[i], map.get(input[i]) + +input[i+1])
            }
        }
    }
    let mapEntries = [...map.entries()];
    for (const [resource,quantity] of mapEntries) {
        console.log(`${resource} -> ${quantity}`);
        
    }
}


// solve(['Gold',
//     '155',
//     'Silver',
//     '10',
//     'Copper',
//     '17']);

    solve(['gold',
    '155',
    'silver',
    '10',
    'copper',
    '17',
    'gold',
    '15'
    ]
    )