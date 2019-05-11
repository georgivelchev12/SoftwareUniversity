function partyProfit(input) {
    let partySize = +input[0];
    let days = +input[1];
    let coins = 0;
    for (let i = 1; i <= days; i++) {
        if (i%10===0) {
            partySize-=2
        }
        if (i%15===0) {
            partySize+=5;
        }
        coins+=50;
        coins-=2*partySize;


        if (i%3===0) {
            coins-=3*partySize;
        }
        if (i%5===0) {
            coins+=20*partySize;
            if (i%3 === 0) {
                coins-=2*partySize;
            }
        }
     
    }
    coins/=partySize;
    console.log(`${partySize} companions received ${Math.floor(coins)} coins each.`);
    
}
partyProfit([3,5]);