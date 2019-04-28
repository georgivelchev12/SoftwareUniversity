function solve(lostFights, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    let counter = 0;
    let helmetCounter = 0;
    let swordCounter = 0;
    let armorCounter = 0
    let price = 0;
    let counterShieldBreaks = 0;
    for (let i = 1; i <= lostFights; i++) {
        counter++;
        if (counter % 2 == 0) {
            helmetCounter++;
        }
        if (counter % 3 == 0) {
            swordCounter++;
        }
        if (counter % 2 == 0 && counter % 3 == 0) {
            counterShieldBreaks++;
        }
        if (counterShieldBreaks%2==0 && counter % 2 == 0 && counter % 3 == 0) {
            
            armorCounter++;
            
        }
    }
    price = (helmetCounter * helmetPrice)
        + (swordCounter * swordPrice)
        + (counterShieldBreaks * shieldPrice)
        + (armorCounter * armorPrice);

    console.log(`Gladiator expenses: ${price.toFixed(2)} aureus`);

}