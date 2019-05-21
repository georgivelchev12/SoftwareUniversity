function solve(arr) {
    let quantity = +arr[0]
    let days = +arr[1]
    let ornametSet = 2;
    let treeSkirt = 5;
    let treeGarlands = 3;
    let treeLights = 15;

    let boughtItems = 0;
    let spirit = 0;
    for (let i = 1; i <= days; i++) {
        if (i%11==0) {
            quantity+=2;
        }
        if (i%2==0) {
            boughtItems += ornametSet*quantity;
            spirit +=5;
        }
        if (i%3==0) {
            boughtItems += treeSkirt*quantity + treeGarlands*quantity
            spirit+=13
        }
        if (i%5==0) {
            boughtItems += treeLights*quantity;
            spirit+=17
            if (i%3==0) {
                spirit+=30
            }
        }
        if (i%10==0) {
            spirit-=20;
            boughtItems+=treeSkirt+treeGarlands+treeLights;
            if(i == 10 && days%10==0) {
                spirit-=30;
            }
        }
       
    }
    console.log(`Total cost: ${boughtItems}`);
    console.log(`Total spirit: ${spirit}`);
    
}

solve(['3','20'])