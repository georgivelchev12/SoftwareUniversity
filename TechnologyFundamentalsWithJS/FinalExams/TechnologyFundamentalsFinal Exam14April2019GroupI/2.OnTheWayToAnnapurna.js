// function solve(input) {
//     let obj = {};
//     let result = [];
//     for (let i = 0; i < input.length; i++) {
//         let arg = input[i].split('->')
//         let command = arg[0];
//         let storeName = arg[1];
//         let items = [arg[2]]
//         switch (command) {
//             case 'Add':
//                 if (!obj.hasOwnProperty(storeName)) {

//                     if (!items[0].includes(',')) {
//                         obj[storeName] = items
//                     }
//                     else {
//                         obj[storeName] = items[0].split(',');
//                     }
//                 }
//                 else {
//                     if (!items[0].includes(',')) {
//                         obj[storeName].push(items.toString());
//                     }
//                     else {
//                         items[0] = items[0].split(',')
//                         for (const item of items[0]) {
//                              obj[storeName].push(item)
//                         }
//                     }
//                 }
//                 break;
//             case 'Remove':
//                 if (Object.keys(obj).includes(storeName)) {
//                     delete(obj[storeName]);
//                 }
//                 break;
//             default:
                
//                 for (const item in obj) {
//                     result.push([item,obj[item]])
//                 }
//                 result.sort((a,b) => {
//                     if (a[1].length > b[1].length) {
//                         return -1;
//                     } else if (a[1].length < b[1].length) {
//                         return 1;
//                     } else {
//                         if (a[0] > b[0]) {
//                             return -1;
//                         } else if (a[0] < b[0]) {
//                             return 1
//                         }
//                     }
//                 })

//                 console.log('Stores list:');
//                 for (const key of result) {
//                     console.log(key[0]);
//                     for (const value of key[1]) {
//                         console.log(`<<${value}>>`);
//                     }
//                 }
//                 break;
//         }
//     }
// }


function solve(input) {
    let output = {};
    let curCommand = input.shift();
 
    while (curCommand !== 'END') {
        let [command, store, items] = curCommand.split('->');
        if (command === 'Add') {
            if (!Object.keys(output).includes(store)) {
                output[store] = []
            }
            items.split(',').forEach(element => {
                output[store].push(element);
            });
        } else if (command === 'Remove') {
            if (Object.keys(output).includes(store)) {
                delete(output[store]);
            }
        }
        curCommand = input.shift();
    }
    output = Object.entries(output);
    output.sort((a, b) => {
        if (a[1].length > b[1].length) {
            return -1;
        } else if (a[1].length < b[1].length) {
            return 1;
        } else {
            if (a[0] > b[0]) {
                return -1;
            } else if (a[0] < b[0]) {
                return 1
            }
        }
    });
    console.log('Stores list:');
    output.forEach(element => {
        console.log(element[0]);
        element[1].forEach(element1 => {
            console.log(`<<${element1}>>`);
 
        });
    });
}
solve(['Add->PeakSports->Map,Navigation,Compass',
    'Add->Paragon->Sunscreen',
    'Add->Groceries->Dried-fruit,Nuts',
    'Add->Groceries->Nuts',
    'Add->Paragon->Tent',
    'Remove->Paragon',
    'Add->Pharmacy->Pain-killers',
    'END']);


    // solve(['Add->Peak->Waterproof,Umbrella',
    //     'Add->Groceries->Water,Juice,Food',
    //    'Add->Peak->Tent',
    //     'Add->Peak->Sleeping-Bag',
    //     'Add->Peak->Jacket',
    //     'Add->Groceries->Lighter',
    //     'Remove->Groceries',
    //     'Remove->Store',
    //     'END']
    //     )