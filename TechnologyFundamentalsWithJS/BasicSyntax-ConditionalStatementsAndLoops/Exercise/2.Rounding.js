function roundingDigits(numbers,number2){
    let num = numbers;
    let rounding = number2;

    if (rounding > 15){
        rounding = 15;
    }

    let roundingNumber = Number(num.toFixed(rounding));
    console.log(roundingNumber);

}