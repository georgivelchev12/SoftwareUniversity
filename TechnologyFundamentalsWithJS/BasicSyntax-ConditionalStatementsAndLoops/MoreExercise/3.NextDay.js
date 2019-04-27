function solve(year,month,day) {
    let dayChange = day;
    if(dayChange == 30){
        dayChange = 0;
        month+=1;
    }
    if(year<1900){
        year = 1900;
        year+=1;
    }
    dayChange+=1;
    console.log(`${year}-${month}-${dayChange}`);
}