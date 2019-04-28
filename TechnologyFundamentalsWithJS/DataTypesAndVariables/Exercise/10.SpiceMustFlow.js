function solve(startYield) {
    let counterDays = 0;
    let yieldd = 0;

    while (startYield >= 100) {
        counterDays++;
        yieldd+=startYield-26;
        startYield-=10;
        
    }
    if (yieldd >= 26) {
        yieldd-=26;
    }
    console.log(counterDays);  
    console.log(yieldd);
    
}