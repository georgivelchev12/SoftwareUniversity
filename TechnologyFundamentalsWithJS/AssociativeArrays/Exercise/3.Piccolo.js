function solve(input) {
    let map = new Map();

    for (const line of input) {
        let [command,number] = line.split(', ');
        if (command == 'IN') {
            map.set(number,1);
        }
        else if(command =='OUT') {
            map.delete(number)
        }
    }
    let mapEntries = [...map.entries()];

    mapEntries.sort((a,b) => a[0].localeCompare(b[0]));

    if (mapEntries.length == 0) {
        console.log('Parking Lot is Empty');
        return;
        
    }
    for (const [number,value] of mapEntries) {
        console.log(number);
    }
}

// solve(['IN, CA2844AA',
// 'IN, CA1234TA',
// 'OUT, CA2844AA',
// 'IN, CA9999TT',
// 'IN, CA2866HI',
// 'OUT, CA1234TA',
// 'IN, CA2844AA',
// 'OUT, CA2866HI',
// 'IN, CA9876HH',
// 'IN, CA2822UU'])

solve(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'OUT, CA1234TA']
)