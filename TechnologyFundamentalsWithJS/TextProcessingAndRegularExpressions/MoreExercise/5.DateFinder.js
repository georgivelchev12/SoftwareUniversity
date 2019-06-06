function solve(input) {
    let pattern = /\b\d{2}-\w{3}-\d{4}\b/g;
    let datesArr= [];
    for (const text of input) {
        if (text != null) {
          datesArr.push(text.match(pattern))  

        }
    }
    for (const date of datesArr) {
        if (date!=null) {
            console.log(date[0].split('-').join(' '));
            
        }
    }
}
solve(['I am born on 28-Feb-1994.',
    'This is not date: 512-Jan-1996.',
    'My father is born on the 29-Jul-1955.'])