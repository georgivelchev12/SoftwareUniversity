function solve(distance,passengers,pricePerLiter) {
    let neededFuel = (distance/100) * 7;
    neededFuel += passengers * 0.100;
    let money = neededFuel * pricePerLiter;
    console.log(`Needed money for that trip is ${money}lv.`);
}