function solve(arr) {
    let firstElement = arr.shift();
    let lastElement = arr.pop();
   
    return Number(firstElement) + Number(lastElement);
}