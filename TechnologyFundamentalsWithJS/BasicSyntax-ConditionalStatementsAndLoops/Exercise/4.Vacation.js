
function Vacation(number, students, days) {
    let studentsprice = 0;
    let businessprice = 0;
    let regularprice = 0;
    let sum = 0;
    let totalprice = 0;
    if (days == "Friday" && students == "Students") {
        sum = number * 8.45;
    }
    else if (days == "Friday" && students == "Business") {
        sum = number * 10.90;
    }
    else if (days == "Friday" && students == "Regular") {
        sum = number * 15;
    }
    else if (days == "Saturday" && students == "Students") {
        sum = number * 9.80;
    }
    else if (days == "Saturday" && students == "Business") {
        sum = number * 15.60;
    }
    else if (days == "Saturday" && students == "Regular") {
        sum = number * 20;
    }
    else if (days == "Sunday" && students == "Students") {
        sum = number * 10.46;
    }
    else if (days == "Sunday" && students == "Business") {
        sum = number * 16;
    }
    else if (days == "Sunday" && students == "Regular") {
        sum = number * 22.50;
    }
    if (number >= 30 && students == "Students") {
        sum = sum - (0.15 * sum);
    }
    else if (number >= 100 && students == "Business") {
        sum = sum - (0.10 * sum);
    }
    else if (number >= 10 && number <= 20 && students == "Regular") {
        sum = sum - (0.05 * sum);
    }
    console.log(`Total price: ${sum.toFixed(2)}`);
}
Vacation(30,
    "Students",
    "Sunday" );