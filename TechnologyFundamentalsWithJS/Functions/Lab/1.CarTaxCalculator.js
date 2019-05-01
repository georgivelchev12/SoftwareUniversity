function solve(kW) {
    let power = Number(kW);
    calculate(power);

    function calculate(power) {
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
        console.log(`${tax.toFixed(2)} lv.`);
    }
}
