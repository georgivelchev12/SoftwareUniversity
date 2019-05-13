function solve(arr) {
    let collectionOfItems = arr[0].split('|');
    let budget = arr[1]
    let maxPriceClothes = 50;
    let maxPriceShoes = 35;
    let maxPriceAccessories = 20.50;
    let curr = [];
    let indcreased = [];
    let profit = 0;
    
    for (let i = 0; i < collectionOfItems.length; i++) {
        let splited = collectionOfItems[i].split(/->/);

        let currentItem = splited.shift();
        let currentPrice = Number(splited.shift());
        if (currentPrice > budget) {
            continue;
        }
        if (currentItem == 'Clothes' && !(currentPrice > maxPriceClothes)) {
            budget -= currentPrice;
            curr.push(currentPrice);
        }
        else if (currentItem == 'Shoes' && !(currentPrice > maxPriceShoes)) {
            budget -= currentPrice;
            curr.push(currentPrice);
        }
        else if (currentItem == 'Accessories' && !(currentPrice > maxPriceAccessories)) {
            budget -= currentPrice;
            curr.push(currentPrice);
        }
        if (isNaN(currentPrice)) {
            break;
        }

    }
    let total = 0;
    for (const element of curr) {
        let increasedPrice = Number(element + (element * 0.4)).toFixed(2);
        indcreased.push(increasedPrice);
        profit += Number(increasedPrice) - element;
        total += +increasedPrice;
    }
    total += budget;

    console.log(indcreased.join(' '));
    console.log(`Profit: ${profit.toFixed(2)}`);
    if (total >= 150) {
        console.log('Hello, France!');

    }
    else {
        console.log('Time to go.');

    }
}