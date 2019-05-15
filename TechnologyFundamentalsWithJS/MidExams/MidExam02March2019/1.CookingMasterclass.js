function solve(arr) {
    let budget= arr[0];
    let students = arr[1];
    let flourPrice = arr[2];
    let eggPrice = arr[3];
    let apronPrice = arr[4];
    let freePackages = Math.floor(students/5);
    let neededItems = apronPrice * Math.ceil(students * 1.2) + eggPrice * 10 * (students) + flourPrice * (students - freePackages);
    if (neededItems <= budget) {
        console.log(`Items purchased for ${neededItems.toFixed(2)}$.`);
        
    }
    else {
        let neededMoney = neededItems-budget;
        console.log(`${neededMoney.toFixed(2)}$ more needed.`);
        
    }
}
solve([50,
    2,
    1.0,
    0.10,
    10.0
    ])

    solve([100,
        25,
        4.0,
        1.0,
        6.0
        ])