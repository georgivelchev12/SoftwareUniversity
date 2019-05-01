function solve(type,volumeOrPower,age) {
    let baseTax = 0;
    let vehicleCoefficient = calculateCoefficient(age);
    if (type == 'motorcycle') {
        baseTax = calculateMotorcycleBaseTax(volumeOrPower)
    }
    else{
        baseTax = calculateCarBaseTax(volumeOrPower)
        let totalSum = baseTax * vehicleCoefficient;
        console.log(totalSum.toFixed(2) + ' lv.');    
    }
  
    




    function calculateCarBaseTax(power) {
        let tax = 0;
        if (power <= 37) {
            tax = power * 0.43;
        }
        else if (power >= 37.01 && power <= 55) {
            tax = power * 0.50;
        }
        else if (power >= 55.01 && power <= 74) {
            tax = power * 0.68;
        }
        else if (power >= 74.01 && power <= 110) {
            tax = power * 1.38;
        }
        else if (power > 110) {
            tax = power * 1.54;
        }
        return tax.toFixed(2);
    }
    function calculateCoefficient(age) {
        let coefficient = 0;
        if (age < 5) {
            coefficient = 2.8;
        } else if (5 <= age && age < 14) {
            coefficient = 1.50;
        }
        else {
            coefficient = 1;
        }
        return coefficient;
    }

    function calculateMotorcycleBaseTax(volume) {
        let taxPrice = 0.00;
        if (volume>750) {
            taxPrice = 125;
        }
        else if (volume > 490) {
            taxPrice =94;
        }
        else if (volume > 350) {
            taxPrice = 63;
        }
        else if (volume > 250) {
            taxPrice = 44;
        }
        else if (volume > 125) {
            taxPrice = 31;
        }
        else{
            taxPrice = 15;
        }
        taxPrice = taxPrice.toFixed(2);
        console.log(taxPrice + ' lv.');
        
    }
}
