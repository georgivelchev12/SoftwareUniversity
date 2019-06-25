solve = (arr) => {
    let dishesPattern = /[<][a-z0-9]+[>]/g;
    let cleaningPattern = /[\[][A-Z0-9]+[\]]/g
    let laundryPattern = /[{].+[}]/g;

    let dishesNumber = 0;
    let cleaningNumber = 0;
    let laundryNumber = 0;
    for (const item of arr) {
        if (item == 'wife is happy') {
            break;
        }
        else {
            dishes = item.match(dishesPattern);
            cleaning = item.match(cleaningPattern);
            laundry = item.match(laundryPattern);

            if (dishes) {
                dishesNumber += sumOfTime(dishes)
            }
            else if (cleaning) {
                cleaningNumber += sumOfTime(cleaning)
            }
            else if (laundry) {
                laundryNumber += sumOfTime(laundry)
            }
        }
    } 
    console.log(`Doing the dishes - ${dishesNumber} min.`);
    console.log(`Cleaning the house - ${cleaningNumber} min.`);
    console.log(`Doing the laundry - ${laundryNumber} min.`);
    console.log(`Total - ${dishesNumber + cleaningNumber + laundryNumber} min.`)
    
    function sumOfTime(matchedRegex) {
        let sum = 0;
        for (let i = 0; i < matchedRegex[0].length; i++) {
            if (!isNaN(+matchedRegex[0][i])) {
                sum += +matchedRegex[0][i]
            }
        }
        return sum;
    }
}
solve(['Vo.|1zps {lo2a}zgVGk{1)N+',
    'Asdad123zxc{3]',
    'R[A [F67G9C]6e3C@',
    'MVo.|1zpshM<9) <d85ifkh59votu>@',
    '<dm0g2y34mw1kpds2>iD|"p',
    'wife is happy']);