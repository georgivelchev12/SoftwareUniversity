function solve(kW, age) {
    let power = calculateBaseTax(kW);
    let carCoefficient = calculateBaseAge(age);
    let totalSum = power * carCoefficient;

    console.log(totalSum.toFixed(2) + " lv.");
    function calculateBaseTax(power) {
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
    
    function calculateBaseAge(age){
        let coefficient = 0;
        if (age < 5) {
            coefficient = 2.8;
        }else if (5<=age&&age<14) {
            coefficient = 1.50;
        }
        else{
            coefficient = 1;
        }
        return coefficient;
    }

 
}

