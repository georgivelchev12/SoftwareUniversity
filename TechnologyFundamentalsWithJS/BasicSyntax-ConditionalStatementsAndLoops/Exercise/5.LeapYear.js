function solve(number) {
    if (number % 400 == 0 || (number % 100 != 0 && number % 4 == 0)) {
        console.log("yes");
    }
    else {
        console.log("no")
    }
}