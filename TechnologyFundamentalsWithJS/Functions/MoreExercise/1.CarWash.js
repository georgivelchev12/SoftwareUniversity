function CarWash(arr) {
    
    let finalValue = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 'soap') {
            finalValue += 10;
        }
        else if (arr[i] == 'water') {
            finalValue = finalValue + (finalValue * 0.20);
        }
        else if (arr[i] == 'vacuum cleaner') {
            finalValue = finalValue + (finalValue * 0.25);
        }
        else if (arr[i] == 'mud') {
            finalValue = finalValue - (finalValue * 0.10);
        }
    }    
    console.log(`The car is ${finalValue.toFixed(2)}% clean.`);
    
}

CarWash(['soap', 'soap', 'vacuum cleaner', 'mud', 'soap', 'water']);