function solve(arr) {
    let days = arr.shift();
    let budget = arr.shift();
    let groupPeople = arr.shift();
    let fuel = arr.shift();
    let food = arr.shift();
    let priceForRoom = arr.shift();
    let travelledDistance;
    // let strtoarr = travelledDistance.split(' ');
    let recievedMoney = 0;
    let consumedFuel = 0;

    if (groupPeople > 10) {
        priceForRoom *= 0.75;
    }
    let foodExpenses = food * groupPeople * days;
    let priceHotelAllNights = priceForRoom * groupPeople * days;
    let currentExpenses = foodExpenses + priceHotelAllNights;
    for (let i = 0; i < days; i++) {
        travelledDistance = arr[i];
        consumedFuel = travelledDistance * fuel;
        currentExpenses += consumedFuel;
        if ((i + 1) % 3 == 0) {
            currentExpenses = currentExpenses + (currentExpenses * 0.4);
        }
        if ((i + 1) % 5 == 0) {
            currentExpenses = currentExpenses + (currentExpenses * 0.4);
        }
        if ((i + 1) % 7 == 0) {
            recievedMoney = currentExpenses / groupPeople;
            currentExpenses -= recievedMoney;
        }
    }
    if (budget > currentExpenses) {
        let money = budget - currentExpenses;
        console.log(`You have reached the destination. You have ${money.toFixed(2)}$ budget left.`);
    }
    else {
        let money = currentExpenses - budget;
        console.log(`Not enough money to continue the trip. You need ${money.toFixed(2)}$ more.`);
    }
}

solve([7,
    12000,
    5,
    1.5,
    10,
    20,
    512,
    318,
    202,
    154,
    222,
    108,
    123
])