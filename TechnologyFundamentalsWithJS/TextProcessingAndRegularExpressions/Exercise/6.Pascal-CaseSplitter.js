function solve(input) {
    console.log(input.split(/(?=[A-Z])/).join(', '));  
}
solve('SplitMeIfYouCanHaHaYouCantOrYouCan')