function solve(input) {
    let splited = input.split('');
    let firstHalf = splited.splice(0,splited.length/2).reverse();
    let secondHalf   = splited.reverse();

    console.log(firstHalf.join(''));
    console.log(secondHalf.join(''));
    
}
solve('sihToDtnaCuoYteBIboJsihTtAdooGoSmI')