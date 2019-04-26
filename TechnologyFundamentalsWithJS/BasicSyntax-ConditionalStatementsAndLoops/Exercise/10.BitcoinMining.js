function Bitcoin(arrayNumbers) {
    let gold = 67.51;
    let bitcoin = 11949.16;
    let money = 0;
    let counter = 0;
    let dayCounter = 0;
    let firstPurchasedBitcoin = 0;
    let totalMoney = 0;
    for (let i = 0; i < arrayNumbers.length; i++) {
        dayCounter++;
        if (dayCounter%3==0) {
            arrayNumbers[i] = arrayNumbers[i] - (arrayNumbers[i] * 0.30);
        }
        gold *= arrayNumbers[i];
        money += gold;

        while (money >= bitcoin) {
            counter++;

            money -= bitcoin;
            gold = 67.51;
            if (counter == 1) {
                firstPurchasedBitcoin = dayCounter;
            }
        }
        gold = 67.51;
    }
    console.log(`Bought bitcoins: ${counter}`);
    if (counter > 0) {
        console.log(`Day of the first purchased bitcoin: ${firstPurchasedBitcoin}`);
    }
    console.log(`Left money: ${money.toFixed(2)} lv.`);
}