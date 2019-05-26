function solve(input) {
    let garageMap = new Map();
    for (const line of input) {
        let [numberOfGarage, carValue] = line.split(' - ');

        if (!garageMap.has(numberOfGarage)) {
            garageMap.set(numberOfGarage, []);
            garageMap.get(numberOfGarage).push(carValue);
        }
        else {
            garageMap.get(numberOfGarage).push(carValue);
        }
    }
    let garageMapEntries = [...garageMap.entries()];

    for (const [numberOfGarage,carValue] of garageMapEntries) {
        console.log(`Garage № ${numberOfGarage}`);
        carValue.forEach(e => {
            console.log(`--- ${e.split(':').join(' -')}`);
            
        });
    }
}

solve(['1 - color: blue, fuel type: diesel',
    '1 - color: red, manufacture: Audi',
    '2 - fuel type: petrol',
    '4 - color: dark blue, fuel type: diesel, manufacture: Fiat'])
