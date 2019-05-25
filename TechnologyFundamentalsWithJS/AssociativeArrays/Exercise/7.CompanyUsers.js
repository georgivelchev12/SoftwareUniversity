function solve(input) {
    let map = new Map();
    for (const line of input) {
        let [companyName,employeeId] = line.split(' -> ')
        
        if (!map.has(companyName)) {
            map.set(companyName,[]);
            map.get(companyName).push(employeeId);
        }
        else {
            map.get(companyName).push(employeeId);
        }
    }
    let mapEntries = [...map.entries()]
    .sort((a,b) => a[0].localeCompare(b[0]));

    for (const [company,id] of mapEntries) {
        
        let filteredId = id.filter((v,i,arr) => i == arr.indexOf(v));
        console.log(company);
        for (const currId of filteredId) {
            console.log(`-- ${currId}`);
            
        }
    }
}

solve(['SoftUni -> AA12345',
'SoftUni -> BB12345',
'Microsoft -> CC12345',
'HP -> BB12345'])


// solve(['SoftUni -> AA12345',
// 'SoftUni -> CC12344',
// 'Lenovo -> XX23456',
// 'SoftUni -> AA12345',
// 'Movement -> DD11111'
// ]
// )