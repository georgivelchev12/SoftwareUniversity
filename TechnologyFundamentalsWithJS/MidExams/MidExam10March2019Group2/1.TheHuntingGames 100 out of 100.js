function solve(input) {
    let days = input.shift();
    let players = input.shift();
    let energyGroup = input.shift();
    let water = days * players * input.shift();
    let food = days * players * input.shift();


    for (let i = 0; i < input.length; i++) {
        energyGroup -= input[i];
        if (energyGroup <= 0) {
            console.log(`You will run out of energy. You will be left with ${food.toFixed(2)} food and ${water.toFixed(2)} water.`);
            

            return;
        }
        if ((i + 1) % 2 == 0) {
            energyGroup = energyGroup + (energyGroup * 0.05);
            water = water - (water * 0.30);
        }
        if ((i + 1) % 3 == 0) {
            food = food - food / players;
            energyGroup = energyGroup + (energyGroup * 0.10);
        }
    }
    if (energyGroup>0) {
        console.log(`You are ready for the quest. You will be left with - ${energyGroup.toFixed(2)} energy!`);
        
    }
}
// solve([10,
//     7,
//     5035.5,
//     11.3,
//     7.2,
//     942.3,
//     500.57,
//     520.68,
//     540.87,
//     505.99,
//     630.3,
//     784.20,
//     321.21,
//     456.8,
//     330])

    solve([12,
        6,
        4430,
        9.8,
        5.5,
        620.3,
        840.2,
        960.1,
        220,
        340,
        674,
        365,
        345.5,
        212,
        412.12,
        258,
        496]
        )