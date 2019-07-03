solve = (arr) =>{
    let sizeOfASide = +arr[0];
    let sheets = +arr[1];
    let area  = +arr[2];
    let giftBoxArea = sizeOfASide*sizeOfASide*6;

    let coveredArea = 0;
    let percentage;
    for (let i = 1; i <= sheets; i++) {
        if(i%3===0){
            coveredArea += Math.abs(area*0.25);
        }
        else{
            coveredArea += Math.abs(area);
        }
    }
    percentage = coveredArea/giftBoxArea*100;
    console.log(`You can cover ${percentage.toFixed(2)}% of the box.`);
};
solve([ '5', '30', '4' ]);