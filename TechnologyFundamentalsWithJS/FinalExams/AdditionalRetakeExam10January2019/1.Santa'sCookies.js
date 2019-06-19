function solve(arr) {
    let batches = +arr.shift();
    let box = 0;
    for (let i = 0; i < batches; i++) {
        let flour = +arr.shift();
        let sugar = +arr.shift();
        let cocoa = +arr.shift();
        //parse int !1!
        let flourCups = parseInt(flour / 140);
        let sugarSpoons = parseInt(sugar / 20);
        let cocoaSpoons = parseInt(cocoa / 10);

        if (flourCups <= 0
            || sugarSpoons <= 0
            || cocoaSpoons <= 0) {
            console.log("Ingredients are not enough for a box of cookies.");
            continue;
        }
        let totalCookiesPerBake = (140 + 10 + 20)
            * (Math.min(flourCups, Math.min(sugarSpoons, cocoaSpoons))) / 25;
        let numberOfBoxes = parseInt(totalCookiesPerBake / 5);

        box+=numberOfBoxes;
        console.log(`Boxes of cookies: ${numberOfBoxes}`);
    }
    console.log(`Total boxes: ${box}`);
}

solve(['1', '1400', '200', '100']);