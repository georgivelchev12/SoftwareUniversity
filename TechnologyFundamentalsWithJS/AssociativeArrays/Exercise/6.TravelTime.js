function solve(input) {
    let countries = new Map();

    for (let line of input) {
        let [country,town,price] = line.split(' > ');
        
        if (!countries.has(country)) {
            let townsToPriceMap = new Map();
            townsToPriceMap.set(town,price);
            countries.set(country,townsToPriceMap);
        }
        else {
            let existingTown = countries.get(country);
            if (existingTown.has(town)) {
                let existingPrice = existingTown.get(town);
                if (price < existingPrice) {
                    existingTown.set(town,price);
                }
            }
            else {
                existingTown.set(town,price)
            }
        } 
    }

    let countriesEntries = [...countries.entries()]
    .sort((a,b) => a[0].localeCompare(b[0]));

    for (const [country,townsMap] of countriesEntries) {
        let townEntries = [...townsMap]
        .sort((a,b)=> a[1] - b[1])
        .map(element => `${element[0]} -> ${element[1]}`)
        console.log(`${country} -> ${townEntries.join(' ')}`);
    }
}


solve(["Bulgaria > Sofia > 500",
"Bulgaria > Sopot > 800",
"France > Paris > 2000",
"Albania > Tirana > 1000",
"Bulgaria > Sofia > 200" ]);